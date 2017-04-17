const {BrowserWindow, app, dialog, ipcMain} = require('electron')
const fs = require('fs-plus')
const path = require('path')
const {EventEmitter} = require('events')

module.exports = class ApplicationWindow {
    // iconPath = path.resolve(__dirname, '..', '..', 'resources', 'icon.png')
    // browserWindow = null

    constructor(application, settings = {}) { 
        this.application = application
        this.settings = settings
        this.browserWindow = null
        // const {appHomePath, pathToOpen} = settings

        const options = {
            show: true,
            title: 'Morning',
            backgroundColor: "#fff",
            width: 800,
            height: 600
        }

        this.browserWindow = new BrowserWindow(options)
        this.browserWindow.loadURL('https://www.google.com.hk')

        // this.application.addWindow(this)

        this.handleEvents()

        // loadSettings.appHome = process.env.MORNING_HOME
        
        
        // this.browserWindow.on('window:loaded' , function () {

        // })
    }

    handleEvents() {
        this.browserWindow.on('close', function (event) {

        })

        this.browserWindow.on('closed', function () {

        })
        
        this.setupContextMenu()
    }

    setupContextMenu() {
        ContextMenu = require('./context-menu')

        this.browserWindow.on('context-menu', function (menuTemplate) {
            new ContextMenu(menuTemplate, this)
        })
    }

    getDimensions() {
        [x, y] = this.browserWindow.getPositions()
        [width, height] = this.browserWindow.getSize()
        return {x, y, width, height}
    }

    SetupContextMenu() {
        ContextMenu = require('./context-menu')

        this.browserWindow.on('context-menu', function (menuTemplate) {
            new ContextMenu(menuTemplat, this)
        })
    }

    close() { this.browserWindow.close() }

    focus() { this.browserWindow.focus() }

    minimize() { this.browserWindow.minimize() }

    maximize() { this.browserWindow.maximize() }

    isFocused() { this.browserWindow.isFocused() }

    isMaximized() { this.browserWindow.isMaximized() }

    isMinimized() { this.browserWindow.isMinimized() }

    openDevTools() { this.browserWindow.openDevTools() }

    closeDevTools() { this.browserWindow.closeDevTools() }


}