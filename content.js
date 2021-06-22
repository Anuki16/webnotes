
let typing_timer, input;
let save_interval = 3000;
let url_re = /:\/\/(www.)?([^#]+)/;

let url = window.location.hostname + window.location.pathname;
console.log(url);

fetch(chrome.runtime.getURL("editor.html"))
    .then(res => {
        return res.text();
    }).then(text => {
        document.body.insertAdjacentHTML("beforeend", text);
    }).then(() => {

        input = document.getElementById("nts_notes");
        input.addEventListener("keyup", () => {
            clearTimeout(typing_timer);
            if (input.value) {
                typing_timer = setTimeout(save_text, save_interval);
            }
        });

        document.getElementById("nts_close").addEventListener("click", () => {
            document.getElementsByClassName("nts_editor")[0].style.display = "none";
        });

        chrome.storage.sync.get(url, (obj) => {
            let note = Object.values(obj)[0];
            if (note) {
                input.value = note;
                chrome.runtime.sendMessage('yes');
            }else{
                chrome.runtime.sendMessage('no');
            }
        });
        
    })


function save_text(){
    if (input.value){
        console.log(input.value);
        chrome.storage.sync.set({[url]: input.value.trim()});
    }
}

