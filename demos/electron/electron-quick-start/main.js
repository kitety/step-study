// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  BrowserView,
  globalShortcut,
  ipcMain,
  Menu
} = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  console.log(2222222);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // 无操作栏
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // require process
      nodeIntegration: true,
      webviewTag: true
    }
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  console.log(1);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  var childWin = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    x: 0,
    y: 0
  });
  let view = new BrowserView();
  // mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
  view.webContents.loadURL("https://www.google.com/");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // 创建window
  createWindow();
  // 注册一个 'CommandOrControl+X' 的全局快捷键
  const ret = globalShortcut.register("CommandOrControl+D", () => {
    console.log("CommandOrControl+D is pressed");
  });

  if (!ret) {
    console.log("registration failed");
  }

  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered("CommandOrControl+P"));
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
app.on("will-quit", () => {
  // 注销快捷键
  globalShortcut.unregister("CommandOrControl+P");

  // 注销所有快捷键
  globalShortcut.unregisterAll();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// 与render进程通信
ipcMain.on("msg-main", (event, arg) => {
  console.log("主进程接收到的消息", arg); // prints "ping"
  event.reply("msg-render", "来自主进程的问候");
});

setTimeout(() => {
  mainWindow.webContents.send("msg-render", "主进程主动说的话");
}, 2000);

// 尝试从主进程渲染菜单
// setTimeout(() => {
//   const templates = [
//     { label: "111" },
//     { label: "111" },
//     { label: "111" },
//     { label: "111" },
//     { label: "111" },
//     { label: "111" }
//   ];
//   const menu = Menu.buildFromTemplate(templates);
//   menu.popup();
// }, 1000);
