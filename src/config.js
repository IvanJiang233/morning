const _ = require('underscore-plus')
const fs = require('fs-plus')
const path = require('path')

module.exports = class Config {
    // configPath = null
    // appHomePath = null
    // notificationManager = null
    // enablePersistence = null

    constructor({configPath, appHomePath, notificationManager, enablePersistence}) {
        this.configPath = configPath
        this.appHomePath = appHomePath
        this.notificationManager = notificationManager
        this.enablePersistence = enablePersistence

        if (enablePersistence) {
            this.configFilePath = fs.resolve(this.configPath, 'config', ['json'])
            if (this.configFilePath == null) {
                this.configFilePath = path.join(this.configFilePath, 'config.json')
            }
        }

        clear()
    }

    clear() {
        this.emitter = new emitter
        this.schema = {
            type: 'object',
            properties: {}
        }
        this.defaultSetting = {}
        this.settings = {}
        this.configFileHasErrors = false
        
    }

    shouldNotAccessFileSystem() {
        return !this.enablePersistence
    }
}