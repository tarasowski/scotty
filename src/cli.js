const { parseYaml } = require('./parse')
const { updateCode } = require('./application')
const { uploadToS3 } = require('./s3')
const { updateLambdaCode } = require('./lambda')

module.exports = async () => {
    const template = parseYaml()
    try {
        const response = await updateCode(template, uploadToS3, updateLambdaCode)
        return response
    } catch (err) {
        console.log(err)
        throw err
    }
}