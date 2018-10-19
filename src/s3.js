const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'eu-west-1' })
const fs = require('fs')
const path = require('path')

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports.uploadToS3 = (extendedLambdaName) => {
    if (!BUCKET_NAME) throw new Error('Please define a valid bucket name')
    console.log('\x1b[33m%s\x1b[0m', `uploading: ${extendedLambdaName}`)
    const key = extendedLambdaName
    const outputDirectory = path.join(__dirname, '../tmp')
    const stream = fs.readFileSync(`${outputDirectory}/${extendedLambdaName}.zip`)

    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: stream
    }
    return s3.upload(params).promise()
}