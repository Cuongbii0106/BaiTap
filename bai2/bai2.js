const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask(){
    if(inputBox.value===''){
        alert("You must write something!");
    }else{
        let li=document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML ="\u00d7";
        li.appendChild(span);
    }
    inputBox.value ="";
    savaData();
}
listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        savaData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        savaData();
    }
},false);
function savaData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
function filterTasks(filterType) {
    const tasks = listContainer.getElementsByTagName("li");
    for (let task of tasks) {
        switch (filterType) {
            case "all":
                task.style.display = "list-item"; 
                break;
            case "completed":
                task.style.display = task.classList.contains("checked") 
                    ? "list-item" : "none";
                break;
            case "uncompleted":
                task.style.display = !task.classList.contains("checked") 
                    ? "list-item" : "none";
                break;
        }
    }
}
