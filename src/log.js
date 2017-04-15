const fs = require('fs-plus')
const path = require('path')
const {app} = require('electron')

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

const writeToFile = (recordPath, recordData) => {
    const recordFilePath = path.join(recordPath, 'output.log')
    try {
        fs.writeFileSync(recordFilePath, 'recordData', { flag: 'w+' })
        fs.unlinkSync(recordFilePath)
        console.log('Write successfully.')
        return true 
    } catch (err) {
        console.log('Write unsuccessfully.')
        return false
    }
}

module.exports = {
    outputToFile(recordData) {
        const recordPath = path.join(app.getPath('userData'), '.record')

        if (hasWriteAccess(recordPath)) {
            writeToFile(recordPath, recordData)
        } else {
            console.log('Insufficient permission to set app home path."${recordPath}"')
        }
    }
}