# Accelerate Your Serverless Development with AWS SAM & Scotty

Scotty is a simple tool that uploads your Lambda code without redeployment of the whole stack. Scotty parses your `template.yaml` file, gets all the serverless functions, zips the folders of these functions, uploads them to s3 and calls AWS API `lambda.updateFunctionCode`. Scotty helps you to accelerate your development! Instant development and deployment of your functions.

#### This is just a preview! It's not event an Alpha version. But it works!
#### Note: It doesn't work with a short form `!Sub` syntax, use Syntax for the full function name! [see here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)

1. `cd` into your serverless project main directory (where the template.yaml is located)
2. `git clone` this repository
3. `cd scotty`and run `npm install`
4. add to your main package.json under scripts `"scotty": "BUCKET_NAME=<bucket name> REGION=<region> node ./scotty/src/index.js",`
5. run `npm run scotty`
6. have fun


#### This is how YAML should look like:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: An example for a template that works with scotty!

Globals:
    Function:
        Timeout: 3


Resources:

    HelloWorldFunction:
        Type: AWS::Serverless::Function 
        Properties:
            FunctionName: HelloWorldFunction # FunctionName needs to be explicitly passed here!!!
            CodeUri: hello_world/
            Handler: app.lambdaHandler
            Runtime: nodejs8.10
            Environment: 
                Variables:
                    PARAM1: VALUE
            Events:
                HelloWorld:
                    Type: Api 
                    Properties:
                        Path: /hello
                        Method: get


```
