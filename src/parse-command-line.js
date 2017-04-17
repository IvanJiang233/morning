const yargs = require('yargs')
const {app} = require('electron')

module.exports = function parseCommandLine (processArgv) {
    const options = yargs(processArgv).wrap(yargs.terminalWidth())
    options.usage(`
        ToolName:Morning    version:${app.getVersion()}

        Usage: electron app-path [options] [path ...]

        Description: A test tools of mine.

        Options:
            -t, --test              Simple based test.
            -d, --dev-mode          Open Chromium development tool.
            -h, --help              Print this usage message.
            -v, --version           Print the version.
            -l, --log-file          Log all output to file.
            -p, --paths-to-open     Set paths to open.
            -u, --urls-to-open      Set urls to open.
            -ah, --apphome-path     Set apphome path.
            -ud, --userdata-path    Set userdata path.
        `
    )

    options.alias('t', 'test-mode').boolean('t').describe('t', 'Simple based Test')
    options.alias('d', 'dev-mode').boolean('d').describe('d', 'Open Chromium development tool')
    options.alias('h', 'help').boolean('h').describe('h', 'Print this Usage message.')
    options.alias('v', 'version').boolean('v').describe('v', 'Print the version.')
    options.alias('l', 'log-file').string('l').describe('l', 'Log all output to file.')
    options.alias('p','paths-to-open').string('p').describe('p', 'Set paths to open.')
    options.alias('u','urls-to-open').string('u').describe('u', 'Set urls to open.')
    options.alias('ah', 'apphome-path').string('ah').describe('ah', 'Set apphome path.')
    options.alias('ud', 'userdata-path').string('ud').describe('ud', 'Set userdata path.')

    const args = options.argv

    const testMode = args['test-mode']
    const devMode = args['dev-mode']
    const version = app.getVersion()
    const appHomePath = args['apphome-path']
    const pathsToOpen = args['paths-to-open']
    const logFile = args['log-file']
    const userDataPath = args['userdata-path']
    const urlsToOpen = args['urls-to-open']

    if (args.help) {
        process.stdout.write(options.help())
        process.exit(0)
    }
    
    if (args.version) {
        process.stdout.write(`
            Morning:    ${app.getVersion()}\n
        `)
    }

    return {
        testMode,
        devMode,
        appHomePath,
        pathsToOpen,
        logFile,
        userDataPath,
        urlsToOpen,
        version,
        env:process.env
    }
}