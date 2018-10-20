# Accelerate Your Serverless Development with AWS SAM & Scotty

Scotty is a simple tool that uploads your Lambda code without redeployment of the whole stack. Scotty parses your `template.yaml` file, gets all the serverless functions, zips the folders of these functions, uploads them to s3 and calls AWS API `lambda.updateFunctionCode`. Scotty helps you to accelerate your development! Instant development and deployment of your functions. No more waiting for the redeployment of the whole stack.

### Step 2

Run `npm i serverless-scotty` inside the folder where your `template.yaml` is located.

### Step 2

Add a command (see below) to your package.json file. *Don't forget to update `BUCKET_NAME`and the `REGION`*

```json
"scripts": {
    
    "scotty": "BUCKET_NAME=cli-update-function-test REGION=eu-west-1 node ./node_modules/.bin/scotty"
  },
```

#### Step 3

**Important** 
1) Make sure your `template.yaml` doesn't contain short form cloudformation functions such as `!Sub`,`!GetAtt`instead use full function names such as `Fn::Sub:`, `Fn:GetAtt`. 

2) Each function needs to have an explicit `FunctionName`. 

**Here is an example that you can use**
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

