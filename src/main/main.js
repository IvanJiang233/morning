const startTime = Date.now()

const path = require('path')
const setPath = require('../set-path')
// const Config = require('./default-config')
const yargs = require('yargs')
const {app} = require('electron')

const args = yargs(process.argv)
    .alias('pTO','pathToOpen')
    .alias('uTO','urlToOpen')
    .alias('aP', 'appHomePath')
    .alias('uDP', 'userDataPath')
    .argv

let appHomePath

console.log(process.argv)
console.log(yargs(process.argv).wrap(yargs.terminalWidth()))
console.log(yargs(process.argv.slice(1)).wrap(yargs.terminalWidth()))

args.appHomePath !== undefined ? appHomePath = args.appHomePath : appHomePath = app.getPath('home')

setPath.setAppHomePath(appHomePath)
setPath.setUserDataPath(app)

const start = require(path.join(process.argv[1], 'src', 'main', 'start.js'))
start(appHomePath, startTime)
