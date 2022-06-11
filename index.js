//initially hiding the parameters box until user selects custom
let pBox = document.getElementById("parameterBox");
let jBox = document.getElementById("jsonBox");

//altering the input sections on the basis ofcontent type
pBox.style.display = "none"
function showparam(){
    pBox.style.display = "block";
    jBox.style.display = "none";
}

function hideparam(){
    pBox.style.display = "none";
    jBox.style.display = "block";  
}


//function to get element from string
function getElement(string)
{
    let element = document.createElement('div');
    element.innerHTML = string;
    return element;
}

//adding parameters by clicking on + button
var parameterCount = 1;
function addParameter(){
    parameterCount++;   
    let str = `<div class="row mb-3" id="parameter${parameterCount}">
                    <label class="col-sm-2 col-form-label col-form-label-sm">Parameters</label>
                    <button class="butn deleteBtn" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    <span class="col ting">
                        <input type="text" class="txtbox" placeholder="  Parameter key" id="parameterkey${parameterCount}">
                        <input type="text" class="txtbox " placeholder="  Parameter value" id="parametervalue${parameterCount}">
                    </span>
                    
                    
                </div>`
    
    let element = getElement(str);
    document.getElementById("parameterBox").appendChild(element);
    let delParameter = document.getElementsByClassName('deleteBtn');
    for(i of delParameter){
        i.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.remove();
            parameterCount--;
        })
    }  

}


function submit(){
    
    document.getElementById("responseBox").setAttribute('placeholder'," please wait fetching...");

    //getting the values of the imput elements
    let url = document.getElementById("url").value;
    let reqType = document.querySelector("input[name='Requestype']:checked").value;
    let contType = document.querySelector("input[name='contentType']:checked").value;
    console.log(contType);
    //if the user chooses custom parameters
    if(contType == "custom"){
        data = {};
        for(i = 0; i< parameterCount;i++)
        {
            if(document.getElementById("parameterkey"+(i+1)) != undefined)
            {
                let key = document.getElementById("parameterkey"+(i+1)).value;
                let value = document.getElementById("parametervalue"+(i+1)).value;   
                data[key] = value;  
                   
            }
        }
        data = JSON.stringify(data);
 
    }
    else{
        data = document.getElementById("reqJsonTxt").value;
    }


    //for request types
    if(reqType == 'get'){
        fetch(url,{
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responseBox').value = text;
        });
    }
    else
    {
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responseBox').value = text;
        });       
    }

}

