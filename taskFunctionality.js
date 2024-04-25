function checkboxSwitch(checkBox) {

    // initially checks if the calling element is the start checkbox
    if(checkBox.getAttribute('id') == "startTask") {
        var finishCheck = document.getElementById("finishTask");
        var checkStatus = finishCheck.checked;

        console.log("hello");

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