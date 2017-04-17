const {Menu} = require('electron')

module.exports = class ContextMenu {
    constructor(template, appWindow) {
        this.appWindow = appWindow
        template = this.createClickHandlers(template)
        menu = Menu.buildFromTemplate(template)
        menu.popup(this.appWindow.browserWindow)
    }

    createClickHandlers(template) {
        for (var item of template ) {
            if (item.command) {
                item.commandDetail
            }
            return item
        }
    }
}