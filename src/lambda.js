const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({ region: 'eu-west-1' })

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports.updateLambdaCode = (functionName, key) => {
    if (!functionName) throw new Error('please provide a valid fuction name')
    if (!key) throw new Error('please provide a valid key for the function')
    console.log('\x1b[32m%s\x1b[0m', `updating: ${key}`)
    const params = {
        FunctionName: functionName,
        Publish: true,
        S3Bucket: BUCKET_NAME,
        S3Key: key
    }
    return lambda.updateFunctionCode(params).promise()
}
