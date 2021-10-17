document.addEventListener("click", (e) => {

    // Update Feature
    if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);

        console.log(userInput);

        if (userInput) {
            console.log(e.target.getAttribute("data-id"));
            axios.post('/update-item', { text: userInput, id: e.target.getAttribute("data-id") }).then(function () {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
            }).catch(function () {
                console.log("Please try again later.");
            })
        }
    }

    // Delete Feature
    if(e.target.classList.contains("delete-me")){
        if(confirm("Do you really want to delete this item permanately?")){
            axios.post('/delete-item', {id: e.target.getAttribute("data-id") }).then(function () {
                e.target.parentElement.parentElement.remove();
            }).catch(function () {
                console.log("Please try again later.");
            })
        }
    }
});

