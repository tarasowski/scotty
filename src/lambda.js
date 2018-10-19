const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({ region: 'eu-west-1' })

module.exports.updateLambdaCode = (functionName, key) => {
    console.log('\x1b[32m%s\x1b[0m', `updating: ${key}`)
    const params = {
        FunctionName: functionName,
        Publish: true,
        S3Bucket: 'cli-update-function-test',
        S3Key: key
    }
    return lambda.updateFunctionCode(params).promise()
}