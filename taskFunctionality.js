/** Replaces date with today's date */
window.onload = function() {
    //today
    var today = new Date();

    //format the date as MM/DD/YYYY
    var formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

    //update the content of the div with id headerDate
    document.getElementById('headerDate').innerText = formattedDate;

    customElements.define("task-elem",TaskElement);

    if(localStorage.getItem("tasks") == null){
        localStorage.setItem("tasks","{}");
    }   

    for(var id in JSON.parse(localStorage.getItem("tasks"))){
        addTaskElement(id);
    }

    document.getElementsByTagName("html")[0].style.visibility = "visible";
};

function addTaskElement(id) {
    let el = document.createElement("task-elem");
    el.setAttribute("id",id);
    document.getElementById('task-container').append(el);
}

function addTask(){
    const title = document.getElementById('create-title').value;
    const desc = document.getElementById('create-desc').value;
    //console.log("adding " + title + " " + desc)
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let data = {};
    data["title"] = title;
    data["content"] = desc;
    data["started"] = false;
    data["checkbox"] = false;
    let id = Date.now().toString();
    tasks[id] = data;
    localStorage.setItem("tasks",JSON.stringify(tasks));

    addTaskElement(id);
}
class TaskElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let id = this.getAttribute("id");
        let data = JSON.parse(localStorage.getItem("tasks"))[id];
        //console.log(data);
        //console.log("at " + id);
        this.innerHTML = `
        <div class="task">
    
          <div class="container">
            <div class="title-container">
              <!-- TASK TITLE -->

              <span class="task-title">${data["title"]}</span> 
              <br>
              <label>
                  <input type="checkbox" class="task-checkbox-wip" onclick="checkboxSwitch(this)"/>
                  <span class="arrow">&rarr;</span>
                  <input type="checkbox" class="task-checkbox-done" onclick="checkboxSwitch(this)"/>
                    <span class="go-left checkTitle">START</span>
    
                    <span class="go-right checkTitle">DONE</span>
              </label>
            </div>

            <!-- OPEN DESCRIPTION BUTTON -->
            <button type="click" class="task-open" onclick="viewTask(this)">
                View Task Description
            </button>

            <!-- HIDDEN CONTENT (SHOW THIS ON BUTTON CLICK)-->
            <p class="task-description">
            ${data["content"]}
            </p> 
          </div>
        </div>`;
        this.querySelector(".task-checkbox-wip").checked = data["started"];
        this.querySelector(".task-checkbox-done").checked = data["checkbox"];
    }
}

function checkboxSwitch(checkBox) {
    //console.log(checkBox.parentElement);
    // initially checks if the calling element is the start checkbox
    if(checkBox.getAttribute('class') == "task-checkbox-wip") {
        var finishCheck = checkBox.parentElement.querySelector(".task-checkbox-done");
        var checkStatus = finishCheck.checked;

        if(checkBox.checked && checkStatus) {
            finishCheck.checked = false;
        }
    } else {
        var startCheck = checkBox.parentElement.querySelector(".task-checkbox-wip");
        var checkStatus = startCheck.checked;
        
        if(checkBox.checked && checkStatus) {
            startCheck.checked = false;
        }
    }

    // directly update bools from new state
    // the above logic can be simplified though
    let id = checkBox.closest("task-elem").getAttribute("id");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    //console.log("bruh ", tasks, id);
    let data = tasks[id];
    data["started"] = checkBox.parentElement.querySelector(".task-checkbox-wip").checked;
    data["checkbox"] = checkBox.parentElement.querySelector(".task-checkbox-done").checked;
    tasks[id] = data;
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

/** Function that open/close task description */
function viewTask(button) {
    let description = button.parentElement.querySelector(".task-description");
    if (button.innerText == "View Task Description") {
        description.style.display = "block";
        button.innerText = "Close Task Description";
    } else {
        button.innerText = "View Task Description";
        description.style.display = "none";
    }
}

/** Reads from JSON file and populate task container */
function readTextFile(file) {
    let json_input = new XMLHttpRequest();
    json_input.overrideMimeType("application/json");
    json_input.open("GET", file, true);
    json_input.onreadystatechange = function() {
        if (json_input.readyState === 4 && json_input.status == "200") {
            var data = JSON.parse(json_input.responseText);
            data = data.tasks;
            
            const task_container = document.getElementById('task-container');
            //task_container.innerHTML = ``;

            for (let i=0; i < data.length; i++) {
               
                let tasks = JSON.parse(localStorage.getItem("tasks"));
                let taskdata = {};
                taskdata["title"] = data[i].title;
                taskdata["content"] = data[i].content;
                taskdata["started"] = data[i].started;
                taskdata["checkbox"] = data[i].checkbox;
                let id = Date.now().toString() + i;
                tasks[id] = taskdata;
                localStorage.setItem("tasks",JSON.stringify(tasks));

                let el = document.createElement("task-elem");
                el.setAttribute("id",id);
                document.getElementById('task-container').append(el);
            }
        }
    }
    json_input.send(null);
}
