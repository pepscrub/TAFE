// var app = chrome.runtime.getBackgroundPage();
function style_this_site(){
    chrome.tabs.executeScript({
        file: 'stylingscript.js'
    });
}

document.getElementById('button').addEventListener('click', style_this_site)