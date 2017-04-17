const {app} = require('electron')
const AppWindow = require('./application-window')
const AppMenu = require('./application-menu')
const fs = require('fs-plus')
const path = require('path')
const Config = require('../config')

module.exports = class Application {
    // Applicaion Entry Point
    static open(options) {
        if (process.platform == 'win32') {
            new Application(options).initialize(options)
            return 
        }
    }

    constructor(options) {
        const {appHomePath, pathsToOpen, logFile, userDataPath, urlsToOpen, version} = options
        this.pidsToOpenWindows = {}
        this.windows = []

        // new config
        this.config = new Config({configPath: process.env.MORNING_HOME, appHomePath, enablePersistence: true})
        this.config.setSchema(null, {type: 'object', properties: _.clone(require('../config-schema'))})
        this.config.load()
        //this.fileRecoveryService = new FileRecoveryService(path.join(process.env.MORNING_HOME, 'recovery))
        //this.storageFolder = new StorageFolder(process.env.MORNING_HOME)

        this.handleEvents()
    }

    exit(status) {
        app.exit(status)
    }

    initialize(options) {
        global.application = this

        this.config.onDidChange('core.userCustomTitleBar', this.promptForRestart.bind(this))
        
        this.appMenu = new AppMenu()
        
        this.launch(options)
    }

    destory() {

    }

    launch(options) {
        if (options.pathsToOpen != null) {
            this.openWithOptins(options)
        } else {
            this.loadState(options) || this.openPaths(options)
        }
    }

    openWithOptions(options) {
        // const {appHomePath, pathsToOpen, logPath, userDataPath, urlsToOpen, env} = options

        app.focus()

        if (testMode) {
            this.openPaths
        }

        if (options.pathsToOpen.length > 0) {
            this.openPaths({

            })
        } else if (options.urlsToOpen.length > 0) {
            this.openUrls({

            })
        } else {
            this.openPath({

            })
        }

        this.openPaths({
            appHomePath,
            pathsToOpen,
            logPath,
            userDataPath,
            urlsToOpen,
            env
        })
    }

    openPaths(options) {
        if (pathsToOpen == undefined || pathsToOpen == null || pathsToOpen.length == 0) {

            return 
        }

        existingWindow = this.windowForPaths(options.pathsToOpen, options.devMode)

        if (existingWindow !== undefined) {
            openedWindow = existingWindow
            if (openedWindow.isMinimized()) {
                openedWindow.restore()
            } else {
                openedWindow.focus()
            }
            openedWindow.replaceEnvironment(env)
        } else {
            openedWindow = new AppWindow(this, this.fileRecoveryService, {})
            openedWindow.focus()
        }
    }

    openUrls() {

    }

    addWindow(window) {
        this.windows.push(window)
        if (this.appMenu != null) {
            this.appMenu.addWindow(window.browserWindow)
        }

    }

    removeWindow(window) {
        this.windows.slipce(this.windows.indexOf(window),1)
        if (this.window.length == 0) {
            // Show special page
            if (process.platform in ['win32', 'linux']) {
                app.quit()
                return 
            }
        }
    }

    handleEvent() {
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

        this.openPathOnEvent('applicaiton:show-settings', 'morning://config')
        this.openPathOnEvent('application:open-your-config', 'morning://')
        this.openPathOnEvent('application:open-your-keymap', 'morning://')
        this.openPathOnEvent('application:open-your-stylesheet', 'morning://stylesheet')
    }
}