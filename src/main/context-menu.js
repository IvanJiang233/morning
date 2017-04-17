const {Menu} = require('electron')

module.exports = class ContextMenu {
    constructor(template, applicationWindow) {
        this.applicationWindow = applicationWindow
        template = this.createClickHandlers(template)
        menu = Menu.buildFromTemplate(template)
        menu.popup(this.applicationWindow.browserWindow)
    }

    createClickHandlers(template) {
        for (var item of template ) {
            if (item.command) {
                if (item.commandDetail) {
                    item.commandDetail = {}
                }
                item.commandDetail.contextCommand = true
                item.commandDetail
            }
            return item
        }
    }
}