const fs = require('fs-plus')
const path = require('path')

const recordChangeTime = () => {
    const recordFilePath = path.join(process.env.MORNING_HOME, '.morning-data', '.record', 'path-change-time.log')
    if (hasWriteAccess(recordFilePath)) {
        fs.appendFileSync(recordFilePath, new Data.now().toISOString, options = {})
    } else {
        console.log('Insufficient permission to record."${recordFilePath}"')
    }
}

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
        const testPath = dir
        if (fs.existsSync(testPath)) {
            if (hasWriteAccess(testPath)) {
                process.env.MORNING_HOME = testPath
                recordChangeTime()
            } else {
                console.log('Insufficient permission to set app home path."${testPath}"')
            }
        }

        if (process.env.MORNING_HOME !== undefined) {
            return 
        }
        process.env.MORNING_HOME = path.join(dir, '.morning-home')
        recordChangeTime()
    },

    setUserDataPath: (app) => {
        const testPath = path.join(process.env.MORNING_HOME, ".morning-data")
        if (fs.existsSync(testPath)) {
            if (hasWriteAccess(testPath)) {
                app.setPath('UserData', testPath)
                recordChangeTime()
            } else {
                console.log('Insufficient permission to set app home path."${testPath}"')
            }
        }
    }
}

