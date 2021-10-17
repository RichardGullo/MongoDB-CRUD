let todos;
let table = document.getElementById("table-body");
let addButton = document.getElementById("add-button");
let addTextField = document.getElementById("add-inputField");
let confirmButton = document.getElementById("modal-confirmButton");
let currentIndex = 0;
let currentId = 0;
let currrentRow = null;

function populateArray(){
    fetch('populate.php')
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
                <td>${todo.todo}</td>
                <td class="crud-buttons">
                    <i class="fas fa-edit fa-lg" data-action="edit"></i>
                    <i class="fas fa-trash fa-lg" data-action="delete"></i>
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
            console.log("Delete");
            let rowIndex = evt.target.closest("tr").rowIndex;
            deleteEntry(rowIndex, evt.target.closest("tr"));    
        }
        else if(action == "edit"){
            console.log("Edit was clicked");
            let rowIndex = evt.target.closest("tr").rowIndex;
            currentRow = evt.target.closest("tr");
            editButton(rowIndex);
           
        }

    }
}

function editButton(index){
    currentId = todos[index].id
    currentIndex = index;
    let nameField = document.getElementById("modal-nameField");
    nameField.value = todos[index].todo;
    $('#myModal').modal('show');


}

function deleteEntry(index, currentRow){
    let id = todos[index].id;
    todos = todos.filter((todo) => todo.id != id);
    let formData = new FormData();
    formData.append('delete-id', id);
    
    fetch("delete.php",{
        method:"POST",
        body:formData
    }).then(function(res){
        return res.text();
    }).then(function(data){
        console.log(data);
        currentRow.remove();
    })
    
}



confirmButton.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData = new FormData();
    let nameField = document.getElementById("modal-nameField");
    formData.append('update-name', nameField.value);
    formData.append('update-id', currentId);

    fetch("update.php", {
        method:"POST",
        body:formData
    }).then(function(res){
        return res.text();
    }).then(function(data){
        console.log(data);
        let tr = currentRow;
        tr.innerHTML = `<tr>
                            <td>${nameField.value}</td>
                            <td class="crud-buttons">
                                <i class="fas fa-edit fa-lg" data-action="edit"></i>
                                <i class="fas fa-trash fa-lg" data-action="delete"></i>
                            </td>
                        </tr>`;
        nameField.value = "";
    });
})



addButton.addEventListener("click",(e)=>{
    
    e.preventDefault();
    let formData = new FormData();
    formData.append('test',addTextField.value);

    fetch('insert.php',{
        method:"POST",
        body:formData
    }).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data);
        todos.push({todo:data.todo, id:data.id});
        let output = `
                        <td>${data.todo}</td>
                        <td class="crud-buttons">
                            <i class="fas fa-edit fa-lg" data-action="edit"></i>
                            <i class="fas fa-trash fa-lg" data-action="delete"></i>
                        </td>
                    `;
        let tr = document.createElement("tr");
        tr.innerHTML = output;
        table.appendChild(tr);
        let inputField = document.getElementById("add-inputField");
        inputField.value = "";

    })
})



document.addEventListener("click", handleClick)

populateArray();