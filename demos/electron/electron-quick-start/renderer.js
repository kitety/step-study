// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require("fs");

document.getElementById("button").onclick = function getProcessInfo() {
  console.log(1111, process);
};
document.getElementById("file").addEventListener("drop", e => {
  console.log(e);
  e.preventDefault();
  e.stopPropagation();

  for (const f of e.dataTransfer.files) {
    console.log("File(s) you dragged here: ", f.path);
    const data = fs.readFileSync(f.path);
    console.log(data.toString());
  }
});
document.getElementById("file").addEventListener("dragover", e => {
  e.preventDefault();
  e.stopPropagation();
});

// webview
const webview = document.querySelector("webview");
const indicator = document.getElementById("loading");

const loadstart = () => {
  indicator.innerText = "loading...";
};

const loadstop = () => {
  indicator.innerText = "";
  webview.insertCSS(`
    #su{
      background:red;
    }
  `);
  webview.executeJavaScript(`document.getElementById('su').value='搜索文字'`)
  webview.openDevTools()
};

webview.addEventListener("did-start-loading", loadstart);
webview.addEventListener("did-stop-loading", loadstop);
