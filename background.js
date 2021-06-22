let badges = {
    yes: {text: "1", color: "#ff0000"},
    no: {text: "", color: "#ffffff"}
}

async function add_note_badge(tabid, settings){
    await chrome.action.setBadgeText({text: settings.text, tabId: tabid});
    await chrome.action.setBadgeBackgroundColor({color:settings.color, tabId: tabid});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    add_note_badge(sender.tab.id, badges[message]);
});