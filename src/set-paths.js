const fs = require('fs-plus')
const path = require('path')
const {app} = require('electron')
const log = require('./log')

const hasWriteAccess = (dir) => {
    const testFilePath = path.join(dir, 'write.test')
    try {
        fs.writeFileSync(testFilePath, new Date().toISOString(), { flag: 'w+' })
        fs.unlinkSync(testFilePath)
        return true 
    } catch (err) {
        return false
    }
}

module.exports = {
    setAppHomePath: (dir) => {
        if (fs.existsSync(dir)) {
            if (hasWriteAccess(dir)) {
                process.env.MORNING_HOME = dir
                // recordChangeTime()
            } else {
                console.log('Insufficient permission to set app home path."${testPath}"')
            }
        }

        if (process.env.MORNING_HOME !== undefined) {
            return 
        }
        process.env.MORNING_HOME = path.join(app.getPath('home'), '.morning-home')
        // recordChangeTime()
    },

    setUserDataPath: (dir) => {
        const testPath = path.join(dir, ".morning-data")
        if (hasWriteAccess(testPath)) {
            app.setPath('userData', testPath)
            // recordChangeTime()
        } else {
            console.log('Insufficient permission to set app home path."${testPath}"')
        }
    }
}

