let arrayAll = [];
let arrayFiltered = [];
let searchedItem = document.getElementById("search-text");


function addInput() {
    let inputEl = document.getElementById("input-text");
    if (inputEl.value.trim().length > 0 ) {
        const task = {
            taskName: inputEl.value.trim(),
            taskComplete: false,
        }
        arrayAll.push(task);
        updateList("All");
        console.log(arrayAll);
        inputEl.value = "";
    } else {
        alert("you must write something");
    } 
}

document.getElementById("add").addEventListener("click", addInput);
document.getElementById("input-text").addEventListener("keypress", event => {
    if (event.key ==="Enter") {
        addInput();
    }
})

searchedItem.addEventListener("keyup", search);


function updateList(taskCompleted) {
    
    const container = document.querySelector(".all");
    container.style.display = "block";
    const searched = document.querySelector(".searched");
    searched.style.display = "none";
    searchedItem.value = "";
    container.innerHTML = "";
    if (taskCompleted === "Completed") {
         arrayFiltered = arrayAll.filter(el=>el.taskComplete === true)
    } else if (taskCompleted === "NotCompleted") {
        arrayFiltered = arrayAll.filter(el=>el.taskComplete === false)
    } else  {
        arrayFiltered = arrayAll;
    }
    arrayFiltered.forEach((element,index) => {
        container.innerHTML += `<li><input type="checkbox"
            ${element.taskComplete && "checked"}
            class="taskCheckbox" 
            id="task-${index}">
            <button class="btn" id="${index}"><i id="${index}"class="fas fa-trash-alt"></i></button>
            ${element.taskName}
            </li>`
            if (element.taskComplete) {
                document.querySelector(`#task-${index}`).parentElement.style.textDecoration = "line-through";
            } else {
                document.querySelector(`#task-${index}`).parentElement.style.textDecoration = "none"; 
            }
            console.log(index);
            document.body.addEventListener("click", taskComplete);         
            document.body.addEventListener("click", removeItems)
    });
 } 





function taskComplete(event) {
    if (event.target.tagName === "INPUT" && event.target.id !== "input-text" && event.target.id !== "search-text"){
        const index = event.target.id.slice(5);
        arrayFiltered[+index].taskComplete = event.target.checked; 
        if (arrayFiltered[+index].taskComplete) {
            event.target.parentElement.style.textDecoration = "line-through";
        } else {
            event.target.parentElement.style.textDecoration = "none"; 
        }
        
    } 
    return; 

}

document.getElementById("completed").addEventListener("click", showCompleted);
document.getElementById("not-completed").addEventListener("click", showNotCompleted);
document.getElementById("all").addEventListener("click", showAll);

function showCompleted() {
   updateList("Completed")
}

function showNotCompleted() {
    updateList("NotCompleted");
}

function showAll() {
    updateList("All");
}

function removeItems(event) {    
    if (event.target.tagName === "I" || event.target.className === "btn") {
        const index = +event.target.id;
        const container = document.querySelector(".all");
        container.innerHTML = "";
        let removed = arrayFiltered.splice(index,1);
        let i = arrayAll.indexOf(removed[0]);
        if (i !== -1) {
            arrayAll.splice(i, 1);
        }
        arrayFiltered.forEach((element,index) => {
            container.innerHTML += `<li><input type="checkbox"
                ${element.taskComplete && "checked"}
                class="taskCheckbox" 
                id="task-${index}">
                ${element.taskName}
                <button class="btn" id="but"><i id="${index}"class="fas fa-trash-alt"></i></button>
                </li>`
        });
     
    }
}

function search() {
    const container = document.querySelector(".searched");
    container.innerHTML = "";
    container.style.display = "block";
    document.querySelector(".all").style.display  = "none";
    arrayFiltered.forEach((element, index) => {
        if (element.taskName.toLowerCase().includes(this.value.toLowerCase())) {
            container.innerHTML += `<li><input type="checkbox"
            ${element.taskComplete && "checked"}
            class="taskCheckbox" 
            id="task-${index}">
            ${element.taskName}
            <button class="btn" id="but"><i id="${index}"class="fas fa-trash-alt"></i></button>
            </li>`
            if (element.taskComplete) {
                document.querySelector(`#task-${index}`).parentElement.style.textDecoration = "line-through";
            } else {
                document.querySelector(`#task-${index}`).parentElement.style.textDecoration = "none"; 
            }
        }
    })   
}     

