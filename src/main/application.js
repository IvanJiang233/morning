const {app} = require('electron')
const ApplicationWindow = require('./application-window')
const ApplicationMenu = require('./application-menu')
const {CompositeDisposable} = require('event-kit')
const fs = require('fs-plus')
const path = require('path')
const Config = require('../config')
const {EventEmitter} = require('events')
const url = require('url')
const _ = require('underscore-plus')

module.exports = class Application {
    // Applicaion Entry Point
    static open(options) {
        Object.assign(this.prototype, EventEmitter.prototype)

        if (process.platform == 'win32') {
            new Application(options).initialize(options)
            return 
        }
    }

    constructor(options) {
        const {appHomePath, pathsToOpen, logFile, userDataPath, urlsToOpen, version} = options
        this.pidsToOpenWindows = {}
        this.applicationWindows = []
        this.applicationMenu = null

        // new config
        // this.config = new Config({configPath: process.env.MORNING_HOME, appHomePath, enablePersistence: true})
        // this.config.setSchema(null, {type: 'object', properties: _.clone(require('../config-schema'))})
        // this.config.load()
        //this.fileRecoveryService = new FileRecoveryService(path.join(process.env.MORNING_HOME, 'recovery))
        //this.storageFolder = new StorageFolder(process.env.MORNING_HOME)

        this.compositeDisposable = new CompositeDisposable()
        this.handleEvents()
    }

    exit(status) {
        app.exit(status)
    }

    initialize(options) {
        global.application = this

        // this.config.onDidChange('core.userCustomTitleBar', this.promptForRestart.bind(this))
        
        this.applicationMenu = new ApplicationMenu()
        
        this.launch(options)
    }

    destory() {

    }

    launch(options) {
        if (!options.testMode){
            this.openWithOptions(options)
        }
    }

    openWithOptions(options) {
        // const {appHomePath, pathsToOpen, logPath, userDataPath, urlsToOpen, env} = options

        app.focus()

        if ( options.pathsToOpen == undefined ) {
            options.pathsToOpen = path.resolve(__dirname, '..', '..', 'static', 'index.html') 
        }
        this.openPaths(options)

        if ( options.urlsToOpen == undefined ) {
            options.urlsToOpen = url.format({
                protocol: 'https',
                pathname: 'www.baidu.com'
            })
        }
        this.openUrls(options)
    }

    openPaths(options) {
        // existingWindow = this.windowForPaths(options.pathsToOpen, options.devMode)
        var existingWindow = false

        if (existingWindow) {
            var openedWindow = existingWindow
            if (openedWindow.isMinimized()) {
                openedWindow.restore()
            } else {
                openedWindow.focus()
            }
            openedWindow.replaceEnvironment(env)
        } else {
            var openedWindow = new ApplicationWindow(this, this.fileRecoveryService, options)
            openedWindow.focus()
        }
    }

    openUrls() {

    }

    addWindow(window) {
        this.applicationWindows.push(window)
        if (this.applicationMenu != null) {
            this.applicationMenu.addWindow(window.browserWindow)
        }

    }

    removeWindow(window) {
        this.applicationWindows.slipce(this.applicationWindows.indexOf(window),1)
        if (this.window.length == 0) {
            // Show special page
            if (process.platform in ['win32', 'linux']) {
                app.quit()
                return 
            }
        }
    }

    handleEvents() {
        this.on('application:quit', function () { app.quit() })
        this.on('application:new-window', function () { })
        this.on('application:new-file', function () { })

        this.on('application:minimize', function () {
            if (this.focusedWindow() != null) {
                this.focusedWindow().minimize()
            }
        })
        this.on('application:maximize', function () {
            if (this.focusedWindow() != null) {
                this.focusedWindow().maximize()
            }
        })

        this.compositeDisposable.add(ipcHelper.on(app, 'open-file', function (event, pathsToOpen) {
            event.preventDefault()
            this.openPaths({pathsToOpen})
        }))

        // this.openPathOnEvent('applicaiton:show-settings', 'morning://config')
        // this.openPathOnEvent('application:open-your-config', 'morning://')
        // this.openPathOnEvent('application:open-your-keymap', 'morning://')
        // this.openPathOnEvent('application:open-your-stylesheet', 'morning://stylesheet')
    }

}