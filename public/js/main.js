let todos;
let table = document.getElementById("table-body");
let addButton = document.getElementById("add-button");
let addTextField = document.getElementById("add-inputField");
let confirmButton = document.getElementById("modal-confirmButton");
let currentIndex = 0;
let currentId = 0;
let currrentRow = null;

function populateArray(){
    
    fetch('/populate-item')
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
    
        todos = data;
        let output = ``;
        for(let todo of todos)
        {
            output += `
            <tr>
                <td>${todo.text}</td>
                <td class="crud-buttons">
                    <i data-id="${todo._id}"class="fas fa-edit fa-lg" data-action="edit"></i>
                    <i data-id="${todo._id}" class="fas fa-trash fa-lg" data-action="delete"></i>
                </td>
            </tr>`;
            
        }

        table.innerHTML = output;

    })
}

function handleClick(evt){
    let {action} = evt.target.dataset;

    if(action){
        if(action == "delete"){
            deleteEntry(evt);    
        }
        else if(action == "edit"){
            console.log("Edit was clicked");
            currentIndex = evt.target.closest("tr").rowIndex;
            currentRow = evt.target.closest("tr");
            currentId = evt.target.getAttribute("data-id");
            editButton();
           
        }

    }
}

function editButton(){

    let nameField = document.getElementById("modal-nameField");
    nameField.value = todos[currentIndex].text;
    $('#myModal').modal('show');


}

function deleteEntry(e){

    let id = e.target.getAttribute("data-id");
    console.log(id);
    axios.post('/delete-item', {id: e.target.getAttribute("data-id") }).then(function () {
        e.target.parentElement.parentElement.remove();
    }).catch(function () {
        console.log("Please try again later.");
    })
    
}



confirmButton.addEventListener("click", (e)=>{
    e.preventDefault();
    let nameField = document.getElementById("modal-nameField");

    axios.post('/update-item', { text: nameField.value, id: currentId }).then(function () {
       
        let tr = currentRow;
        tr.innerHTML = `<tr>
                            <td>${nameField.value}</td>
                            <td class="crud-buttons">
                                <i data-id="${currentId}" class="fas fa-edit fa-lg" data-action="edit"></i>
                                <i data-id="${currentId}" class="fas fa-trash fa-lg" data-action="delete"></i>
                            </td>
                        </tr>`;
        
        todos[currentIndex] = {_id: currentId, text: nameField.value};
        nameField.value = "";

    }).catch(function () {
        console.log("Please try again later.");
    })


})



addButton.addEventListener("click",(e)=>{
    
    e.preventDefault();
    
    axios.post('/create-item', {text:addTextField.value})
    .then(function(res){
        todos.push({text:res.data.text, _id:res.data._id});
        let output = `
                        <td>${res.data.text}</td>
                        <td class="crud-buttons">
                            <i data-id="${res.data._id}" class="fas fa-edit fa-lg" data-action="edit"></i>
                            <i data-id="${res.data._id}" class="fas fa-trash fa-lg" data-action="delete"></i>
                        </td>
                    `;
        let tr = document.createElement("tr");
        tr.innerHTML = output;
        table.appendChild(tr);
        let inputField = document.getElementById("add-inputField");
        inputField.value = "";

    });

})



document.addEventListener("click", handleClick)

populateArray();