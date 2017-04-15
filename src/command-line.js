const dedent = require('dedent')
const yargs = require('yargs')

module.exports = function parseCommandLine (processArgs) {
    const options = yargs(processArgs).wrap(yargs.terminalWidth)
    options.usage(
        dedent`
        Usage: name [options] [path ...]
        `
    )

    options.alias('pTO','pathToOpen')
    options.alias('uTO','urlToOpen')
    options.alias('aP', 'appHomePath')
    options.alias('uDP', 'userDataPath')
}