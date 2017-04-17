const {app, Menu} = require('electron')
const _ = require('underscore-plus')

module.exports = class ApplicationMenu {
    constructor(autoUpdateManager) {
        // setActiveTemplate
        this.windowTemplates = new WeakMap()
        this.setActiveTemplate(this.getDefaultTemplate())
    }

    update(window, template) {
        this.translateTemplate()
        this.windowTemplates.set(window, template)
        if (window == this.lastFocusedWindow)
            this.setActiveTemplate(template)
    }

    setActiveTemplate(template) {
        if (!_.isEqual(template, this.activeTemplate)) {
            this.activeTemplate = template
            this.menu = Menu.buildFromTemplate(_.deepClone(template))
            Menu.setApplicationMenu(this.menu)
        }
    }

    addWindow(window) {
        if (this.lastFocusedWindow == null) {
            this.lastFocusedWindow = window
        }

        focusHandler = () => {
            this.lastFocusedWindow = window
            if (template = this.windowTemplate.get(window)) {
                this.setActiveTemplate(template)
            }
        }

        window.on('focus', focusHandler())
        window.once('closed', () => {
            if (window == this.lastFocusedWindow) {
                this.lastFocusedWindow = null 
            }
            this.windowTemplate.delete(window)
            window.removeListener('focus', focusHandler)
        })
    }

    getDefaultTemplate() {
        return [
            {
                label: "Morning",
                submenu: [
                    {label: 'Quit', accelerator: 'Command + Q', click: function() { app.quit() }}
                ]
            }
        ]
    }

    focusedWindow() {
        return _.find(global.application.windows, function (appWindow) { appWindow.isFocused() })
    }
}