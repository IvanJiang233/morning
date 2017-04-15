const {app} = require('electron')
const path = require('path')
const parseCommandLine = require('../parse-command-line')
const setPaths = require('../set-paths')
const log = require('../log')

module.exports = start = function (args, startTime) {
    if (args.appHomePath != undefined) {
        setPaths.setAppHomePath(args.appHomePath)
    } else {
        setPaths.setAppHomePath(path.dirname(path.dirname(__dirname)))
    }

    if (args.userDataPath != undefined) {
        setPaths.setUserDataPath(args.userDataPath)
    } else {
        setPaths.setUserDataPath(path.dirname(path.dirname(__dirname)))
    }
    
    args.appHomePath = process.env.MORNING_HOME
    args.userDataPath = app.getPath('userData')

    // log.outputToFile({time: Date.now(), type: 'message', context: 'Set apphome path successfully'})
    app.on('ready', function () {
        const Application = require(path.join(process.env.MORNING_HOME, 'src', 'main', 'application'))
        Application.open(args)
    })
}