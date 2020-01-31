// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require("fs");
const { dialog, globalShortcut, Menu, net } = require("electron").remote;
const { ipcRenderer } = require("electron");

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
  webview.executeJavaScript(`document.getElementById('su').value='搜索文字'`);
  // webview.openDevTools()
};

webview.addEventListener("did-start-loading", loadstart);
webview.addEventListener("did-stop-loading", loadstop);

let subWin = null;
// 弹出子窗口
document.getElementById("open-window").onclick = () => {
  subWin = window.open("page2.html", "page2");
};
// 关闭子窗口
document.getElementById("close-window").onclick = () => {
  subWin.close();
};

// 监听消息
window.addEventListener("message", e => {
  console.log(e);
});

// dialog
document.getElementById("open-dialog").onclick = () => {
  const path = dialog.showOpenDialogSync({
    title: "请选择文件",
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif"] },
      { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
      { name: "Custom File Type", extensions: ["as"] },
      { name: "All Files", extensions: ["*"] }
    ]
  });
  console.log(path);
};

// 注册一个 'CommandOrControl+X' 的全局快捷键
const ret = globalShortcut.register("CommandOrControl+I", () => {
  console.log("CommandOrControl+I is pressed");
});
console.log(globalShortcut.isRegistered("CommandOrControl+I"));

// 与主进程通信

ipcRenderer.on("msg-render", (event, arg) => {
  console.log("render收到的消息", arg); // prints "pong"
});
ipcRenderer.send("msg-main", "render的消息");

// 弹出菜单
document.getElementById("open-menu").onclick = () => {
  const templates = [
    { label: "111" },
    { label: "111" },
    { label: "111" },
    { label: "111" },
    { label: "111" },
    {
      label: "111",
      click: () => {
        console.log("最后一个点击了");
      }
    }
  ];
  const menu = Menu.buildFromTemplate(templates);
  // Menu.setApplicationMenu(menu);
  menu.popup();
};

// net
document.getElementById("accessBaidu").onclick = () => {
  const request = net.request("https://www.baidu.com");
  console.log(request);
  request.on("response", response => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on("data", chunk => {
      console.log(`BODY: ${chunk}`);
    });
    response.on("end", () => {
      console.log("No more data in response.");
    });
  });
  request.end();
};
