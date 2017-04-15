const dedent = require('dedent')
const yargs = require('yargs')
const {app} = require('electron')

    options.usage(
        dedent`
        ToolName:Morning    version:${app.getVersion()}

        Usage: electron app-path [options] [path ...]

        Description: A test tools of mine.

        Options:
            -h, --help              Print this usage message.
            -v, --version           Print the version.
            -l, --log-file          Log all output to file.
            -p, --paths-to-open     Set paths to open.
            -u, --urls-to-open      Set urls to open.
            -ah, --apphome-path     Set apphome path.
            -ud, --userdata-path    Set userdata path.
        `
    )

    options.alias('h', 'help').boolean('h').describe('h', 'Print this Usage message.')
    options.alias('v', 'version').boolean('v').describe('v', 'Print the version.')
    options.alias('l', 'log-file').string('l').describe('l', 'Log all output to file.')
    options.alias('p','paths-to-open').string('p').describe('p', 'Set paths to open.')
    options.alias('u','urls-to-open').string('u').describe('u', 'Set urls to open.')
    options.alias('ah', 'apphome-path').string('ah').describe('ah', 'Set apphome path.')
    options.alias('ud', 'userdata-path').string('ud').describe('ud', 'Set userdata path.')

    const args = options.argv

    const version = app.getVersion()
    const appHomePath = args['apphome-path']
    const pathsToOpen = args['paths-to-open']
    const logFile = args['log-file']
    const userDataPath = args['userdata-path']
    const urlsToOpen = args['urls-to-open']

    return {
        appHomePath,
        pathsToOpen,
        logFile,
        userDataPath,
        urlsToOpen,
        version,
        env:process.env
    }
}
