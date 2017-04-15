const {app} = require('electron')
const AppWindow = require('./application-window')
const AppMenu = require('./application-menu')
const fs = require('fs-plus')
const path = require('path')
const Config = require('config')

module.exports = class Application {
    windows = null
    applicationWindow = null

    open(options) {
        if (process.platform == 'win32') {
            new AppWindow(options).initialize(options)
            return 
        }
    }

    constructor(options) {
        var {appHomePath, pathsToOpen, logFile, userDataPath, urlsToOpen, version} = options
        this.pidsToOpenWindows = {}
        this.window = []

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
        global.app = this


    }
}