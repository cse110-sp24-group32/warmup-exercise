function checkboxSwitch(checkBox, start_id, finish_id) {

    // initially checks if the calling element is the start checkbox
    if(checkBox.getAttribute('id') == start_id) {
        var finishCheck = document.getElementById(finish_id);
        var checkStatus = finishCheck.checked;

        if(checkBox.checked && checkStatus) {
            finishCheck.checked = false;
        }
    } else {
        var startCheck = document.getElementById(start_id);
        var checkStatus = startCheck.checked;
        
        if(checkBox.checked && checkStatus) {
            startCheck.checked = false;
        }
    }
}

/** Function that open/close task description */
function viewTask(button, description_id) {
    let description = document.querySelector("." + description_id);
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
            task_container.innerHTML = ``;

            for (let i=0; i < data.length; i++) {
                const task = document.createElement('task-component');
                task.setAttribute('title', data[i].title);
                task.setAttribute('content', data[i].content);
                task.setAttribute('start_id', "startTask" + i);
                task.setAttribute('finish_id', "finishTask" + i);
                task.setAttribute('description_id', "task-description" + i);

                task_container.appendChild(task);
                console.log(data[i]);

                // hide description on default
                let description = document.querySelector("." + "task-description" + i);
                description.style.display = "none";

                if (data[i].started) {
                    let startCheck = document.getElementById("startTask" + i);
                    startCheck.checked = true;
                } else if (data[i].checkbox) {
                    let finishCheck = document.getElementById("finishTask" + i);
                    finishCheck.checked = true;
                }
            }
        }
    }
    json_input.send(null);
}