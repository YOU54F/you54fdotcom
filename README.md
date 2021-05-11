# YOU54F.com

![React SPA with serverless pre-rendering](./aws/overview.png)

## Architecture

- **TypeScript**
- Basic **un-ejected** [create-react-app][cra] stored `./src`
- **SSR** using `react-dom/server` and [koa][koa] in `./server`
- **Infrastructure as Code** using [AWS Cloud Development Kit][cdk] in `./aws`
- [AWS Lambda][lambda] for server-side (pre-)rendering of **React SPA**
- [Amazon CloudFront][cloudfront] to **cache pre-rendered HTML** and serve assets from S3
- [AWS CodePipeline][pipeline] and [AWS CodeBuild][codebuild] for **Continious Deployments**

## Usage

Develop and build SPA with the usual flow.

```bash
# Build your static SPA
$ > yarn build

# Start your local environment
$ > yarn start
```

Run a local HTTP server with [koa][koa] to test-drive your server-side rendering.

```bash
# Start local server-side rendering service
$ > yarn run:local

# Build Node.js service for server-side rendering
$ > yarn build:server
```

## Deployments and Configuration

AWS CodePipeline and AWS CodeBuild using the [AWS Cloud Development Kit][cdk]

1. Create a [personal GitHub Access Token][token]
2. Store the token in [AWS Systems Manager][sm]:

```bash
$ > aws secretsmanager create-secret \
    --name GitHubToken \
    --secret-string abcdefg1234abcdefg56789abcdefg \
    --region eu-west-2

{
  "ARN": "arn:aws:secretsmanager:eu-west-2:123456789001:secret:GitHubToken-uNBxTr",
  "Name": "GitHubToken",
  "VersionId": "4acda3d1-877f-4032-b38e-17bc50239883"
}
```

3. Bootstrap the app in the required region

```bash
$ > yarn cdk bootstrap --region eu-west-2

⏳  Bootstrapping environment aws://123456789001/eu-west-2...

0/2 | 5:06:49 PM | CREATE_IN_PROGRESS   | AWS::S3::Bucket | StagingBucket
0/2 | 5:06:50 PM | CREATE_IN_PROGRESS   | AWS::S3::Bucket | StagingBucket Resource creation Initiated
1/2 | 5:07:11 PM | CREATE_COMPLETE      | AWS::S3::Bucket | StagingBucket

✅  Environment aws://123456789001/eu-west-2 bootstrapped.
```

4. Update the `./config.ts` file in the root folder and update the following

```typescript
export const config = {
  name: 'you54fdotcom',
  github: {
    owner: 'you54f',
    repository: 'you54fdotcom',
  },
  env: { region: 'eu-west-2' },
}
```

After changing the GitHub repository information, just deploy the CloudFormation stack for the included [AWS CodePipeline][pipeline] and all resources will be created for you.

```bash
$ > yarn cdk deploy you54fdotcom-pipeline

Pipeline: deploying...
Pipeline: creating CloudFormation changeset...

✅  Pipeline
```

Head over to the [AWS Management Console][console] and watch the beauty of a deploy pipeline and CloudFormation stacks. All resources will be created for you, and after a while a [CloudFront Distribution][cloudfront] is available for the included example application.
