const startTime = Date.now()

const path = require('path')
const parseCommandLine = require('../parse-command-line')

const args = parseCommandLine(process.argv)

console.log(args)
const start = require(path.join(__dirname, 'start'))
start(args, startTime) 
