

function expand_note(){
    document.getElementsByClassName("nts_editor")[0].style.display = "block";
}

let add_note_btn = document.getElementById("addnote");

add_note_btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: expand_note
    });
    add_note_btn.innerHTML = "Close note";
});