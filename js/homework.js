console.log("hello world");

// Global
let homeworkData = [
    {name:"homework01",extension:"c", state:false},
    {name:"homework02", extension:"py",state:false}
];

let checkboxIds = 0;

// Table
let table = document.getElementById("homework-table");
createTable(homeworkData);

// Subcontainers
let emptyFolder = document.getElementById("no-items-container");

if(homeworkData.length == 0)
    emptyFolder.classList.add("show-window");

// Creates the table on initial page load
function createTable(items) {
    let output = "";

    for (const item of items) {
        let image = "";
        let fileName = "";
        

        if (item.extension == "c"){
            image = `<img style="height:20px; width:20px;" src="images/c.svg" />`;
            fileName = item.name+"."+"c";
        }
        else if (item.extension == "java"){
            image = `<img style="height:20px; width:20px;" src="images/java.svg" />`;
            fileName = item.name+"."+"java"
        }
        else if (item.extension == "c++"){
            image = `<img style="height:20px; width:20px;" src="images/c-plus.svg" />`;
            fileName = item.name+"."+"c++";
        }
        else{
            image = `<img style="height:20px; width:20px;" src="images/python.svg" />`;
            fileName = item.name+"."+"py";
        }

        output += `<tr>
                    
                        <td data-action="row">
                            <input data-action="check" class="check_box" type="checkbox" id="checkbox${checkboxIds}" />
                            <label for="checkbox${checkboxIds++}"></label>
                            ${image}${fileName}
                        </td>
                    </tr>
                `;
    }
    
    table.innerHTML = output;
}


function handleClick(evt) {
    var { action } = evt.target.dataset;
    // console.log(action);
    
    if (action) {
    
        if (action == "check") {
            let rowIndex = evt.target.closest("tr").rowIndex;
            homeworkData[rowIndex].state = !homeworkData[rowIndex].state;

            // alert(`Edit user with ID of ${rowIndex}`);
            // console.log(testcases);
        } 
    }
}

document.addEventListener("click", handleClick);