const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const http = require('./http')

let mainWindow = null;
function createWindow () {
    // Create the browser window.
    // mainWindow = new BrowserWindow({ show: false })
    mainWindow = new BrowserWindow({width: 800, height: 600})
    // mainWindow = new BrowserWindow({fullscreen: true, fullscreenable: true})

    // and load the index.html of the app.
    // mainWindow.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, './client/index.html'),
    //         protocol: 'file:',
    //         slashes: true
    //     })
    // )
    mainWindow.loadURL("http://localhost:8000")

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        console.log('mainWindow close')
    mainWindow = null
})
    // 개발자 도구 오픈
    // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);
