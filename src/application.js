const fs = require('fs')
const archiver = require('archiver-promise')
const path = require('path')
const { deleteCreateFolder } = require('./create-temp')



const zipFiles = (pathToLambdaCode, outputDirectory, extendedLambdaName) => {
    const archive = archiver('zip', {})
    const output = fs.createWriteStream(`${outputDirectory}/${extendedLambdaName}.zip`)
    archive.pipe(output)
    archive.directory(`./${pathToLambdaCode}/`, false)
    return archive.finalize()


}

module.exports.updateCode = async (template, uploadToS3, updateLambdaCode) => {
    const outputDirectory = path.join(__dirname, '../tmp')
    deleteCreateFolder(outputDirectory)
    const resources = template.Resources
    const zipPromises = []

    for (const lambda in resources) {
        if (resources[lambda].Type === 'AWS::Serverless::Function') {
            const functionName = resources[lambda].Properties.FunctionName
            const extendedLambdaName = Math.random().toString(36).substring(3) + '-' + lambda
            const pathToLambdaCode = resources[lambda].Properties.CodeUri
            const promise = zipFiles(pathToLambdaCode, outputDirectory, extendedLambdaName)
            promise
                .then(() => {
                    return uploadToS3(extendedLambdaName)
                })
                .then(() => {
                    return updateLambdaCode(functionName, extendedLambdaName)
                })
                .catch(err => console.log(err))
            zipPromises.push(promise)

        }
    }
    try {
        await Promise.all(zipPromises)
        return 'All functions were successfully updated'
    } catch (err) {
        console.log(err)
        throw err
    }

}
