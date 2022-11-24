import { app, shell, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { spawn, exec } from 'child_process'

function createWindow(): void {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux'
            ? {
                  icon: path.join(__dirname, '../../build/icon.png')
              }
            : {}),
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
            sandbox: false,
            nodeIntegration: true
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    ipcMain.handle('try-activate', function () {
        console.log(__dirname)
        console.log('running of the main.js')
        // let son = spawn('node', ['--version'])
        // let daughter = spawn('echo', ['The \\$HOME variable is $HOME'])
        // let son = spawn('ifconfig', { shell: true })
        let son = spawn('cd /Users/erickhartawan; pwd ; node sample.js', { shell: true })
        let daughter = spawn('echo', [`The \\$HOME variable is $HOME`])
        son.stdout.on('data', (data) => {
            console.log(data.toString())
        })
        daughter.stdout.on('data', (data) => {
            console.log(data.toString())
        })
        console.log('running of the main.js after exec')
    })
    ipcMain.handle('export-light', function (event, lightObj) {
        // const data = JSON.stringify(lightObj)
        const data = lightObj
        const fs = require('fs')
        console.log(data) // data contain the require jsonb
        // console.log(JSON.parse(data))
        // try {
        //     fs.writeFileSync('/Users/erickhartawan/lightsamplelatest.json', data, 'utf-8')
        // } catch (err) {
        //     console.log(err + ' error has occured')
        // }
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
