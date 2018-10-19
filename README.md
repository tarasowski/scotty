# Accelerate your Lambda Code Updates

## This is just a preview! It's not event an Alpha version. But it works!
## Important: It doesn't work with a short form `!Sub` syntax, use Syntax for the full function name! [An Example Here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)

1. `cd` into your serverless project main directory (where the template.yaml is located)
2. `git clone` this repository
3. `cd scotty`and run `npm install`
4. add to your main package.json under scripts `"scotty": "BUCKET_NAME=<bucket name> node ./scotty/src/index.js"`
5. run `npm run scotty`
6. have fun
