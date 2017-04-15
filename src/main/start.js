const {app} = require('electron')
const yargs = require('yargs')

module.exports = start = function (appHomePath, startTime) {
    const Application = require(path.join(process.env.MORNING_HOME, 'src', 'main', 'application'))
    Application.open(args)
}