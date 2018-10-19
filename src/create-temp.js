const fs = require('fs')

const createTempDirectory = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

const deleteFolderRecursive = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = path + '/' + file
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

module.exports.deleteCreateFolder = (path) => {
    if (fs.existsSync(path)) {
        deleteFolderRecursive(path)
        createTempDirectory(path)
    } else {
        createTempDirectory(path)
    }
}