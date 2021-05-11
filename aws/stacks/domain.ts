import * as CloudFront from '@aws-cdk/aws-cloudfront'
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53'
import * as S3 from '@aws-cdk/aws-s3'
import * as SSM from '@aws-cdk/aws-ssm'
import * as CDK from '@aws-cdk/core'
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets'

import { getParam } from '../lib/helpers'

export interface DomainProps extends CDK.StackProps {
  name: string
}

export class DomainStack extends CDK.Stack {
  constructor(app: CDK.App, id: string, props: DomainProps) {
    super(app, id, props)

    const apiID = getParam(this, `/${props.name}/APIGateway/ApiId`)
    const apiDomainName = `${apiID}.execute-api.${this.region}.amazonaws.com`

    const assetsBucket = S3.Bucket.fromBucketAttributes(this, 'AssetsBucket', {
      bucketName: getParam(this, `/${props.name}/S3/Assets/Name`),
      bucketDomainName: getParam(this, `/${props.name}/S3/Assets/DomainName`),
    })

    const distribution = new CloudFront.CloudFrontWebDistribution(this, 'CDN', {
      httpVersion: CloudFront.HttpVersion.HTTP2,
      priceClass: CloudFront.PriceClass.PRICE_CLASS_100,
      viewerProtocolPolicy: CloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      defaultRootObject: '/',
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: assetsBucket,
          },
          behaviors: [
            {
              allowedMethods: CloudFront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              compress: true,
              pathPattern: '/*.*',
              forwardedValues: {
                queryString: false,
                cookies: { forward: 'none' },
              },
            },
          ],
        },
        {
          originPath: '/prod',
          customOriginSource: {
            domainName: apiDomainName,
            originProtocolPolicy: CloudFront.OriginProtocolPolicy.HTTPS_ONLY,
          },
          behaviors: [
            {
              allowedMethods: CloudFront.CloudFrontAllowedMethods.ALL,
              compress: true,
              isDefaultBehavior: true,
              forwardedValues: {
                queryString: true,
                cookies: { forward: 'all' },
              },
            },
          ],
        },
      ],
    })

    const domain = 'you54f.co.uk'
    const hostedZone = HostedZone.fromLookup(this, 'Zone', {
      domainName: domain,
    })

    const cloudfrontTarget = RecordTarget.fromAlias(new CloudFrontTarget(distribution))

    new ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: `${domain}`,
      target: cloudfrontTarget,
    })

    new ARecord(this, 'WildCardARecord', {
      zone: hostedZone,
      recordName: `*.${domain}`,
      target: cloudfrontTarget,
    })

    new SSM.StringParameter(this, 'SSMCloudFrontDomainName', {
      description: 'CloudFront DomainName',
      parameterName: `/${props.name}/CloudFront/DomainName`,
      stringValue: distribution.distributionDomainName,
    })

    new SSM.StringParameter(this, 'SSMCloudFrontDistributionID', {
      description: 'CloudFront DistributionID',
      parameterName: `/${props.name}/CloudFront/DistributionID`,
      stringValue: distribution.distributionId,
    })
  }
}

// const certificate = new DnsValidatedCertificate(this, 'Certificate', {
//   region: 'us-east-1',
//   hostedZone: hostedZone,
//   domainName: domain,
//   subjectAlternativeNames: [`*.${domain}`],
//   validationDomains: {
//     [domain]: domain,
//     [`*.${domain}`]: domain,
//   },
//   validationMethod: ValidationMethod.DNS,
// })
