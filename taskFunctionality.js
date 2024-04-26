/** Replaces date with today's date */
window.onload = function() {
    //today
    var today = new Date();

    //format the date as MM/DD/YYYY
    var formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

    //update the content of the div with id headerDate
    document.getElementById('headerDate').innerText = formattedDate;
};

function checkboxSwitch(checkBox) {

    // initially checks if the calling element is the start checkbox
    if(checkBox.getAttribute('id') == "startTask") {
        var finishCheck = document.getElementById("finishTask");
        var checkStatus = finishCheck.checked;

        if(checkBox.checked && checkStatus) {
            finishCheck.checked = false;
        }
    } else {
        var startCheck = document.getElementById("startTask");
        var checkStatus = startCheck.checked;
        
        if(checkBox.checked && checkStatus) {
            startCheck.checked = false;
        }
    }
}

/** Function that open/close task description */
function viewTask(button) {
    let description = document.querySelector(".task-description");
    if (button.innerText == "View Task Description") {
        description.style.display = "block";
        button.innerText = "Close Task Description";
    } else {
        button.innerText = "View Task Description";
        description.style.display = "none";
    }
}
