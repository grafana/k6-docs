---
title: "aws"
excerpt: "aws is a library implementing APIs for accessing a selection of AWS services"
description: "aws is a library implementing APIs for accessing a selection of AWS servicese"
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/aws/
---

The `aws` module is a JavaScript library that wraps around some Amazon AWS services API.

The library exposes a couple of configuration and client classes allowing to interact with a subset of AWS services in the context of k6 load test scripts:
- [EventBridge](/javascript-api/jslib/aws/eventbridgeclient): a class to send custom events to Amazon EventBridge.
- [KMSClient](/javascript-api/jslib/aws/kmsclient): a class to list and generate keys from the AWS Key Management Service.
- [S3Client](/javascript-api/jslib/aws/s3client): a class to list S3 buckets and the objects they contain, as well as uploading, downloading and deleting objects from them.
- [SecretsManagerClient](/javascript-api/jslib/aws/secretsmanagerclient): a class to list, get, create, update, and delete secrets from the AWS secrets manager service.
- [SQSClient](/javascript-api/jslib/aws/sqsclient): a class to list and send messages to SQS queues.
- [SystemsManagerClient](/javascript-api/jslib/aws/systemsmanagerclient): a class to fetch parameters from the AWS Systems Manager Service.
- [SignatureV4](/javascript-api/jslib/aws/signaturev4): a class to sign and pre-sign requests to AWS services using the [Signature V4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) algorithm.
- [AWSConfig](/javascript-api/jslib/aws/awsconfig/): a class is used by each client classes to provide them access to AWS credentials as well as configuration.

> ⭐️ Source code available on [GitHub](https://github.com/grafana/k6-jslib-aws).
> Please request features and report bugs through [GitHub issues](https://github.com/grafana/k6-jslib-aws/issues).


<Blockquote mod='info'>

#### This library is in active development

This library is stable enough to be useful, but pay attention to the new versions released on [jslib.k6.io](https://jslib.k6.io) and [k6-jslib-aws/releases](https://github.com/grafana/k6-jslib-aws/releases).

This documentation is for the last version only. If you discover that some code below does not work, it most likely means that you are using an older version.

</Blockquote>

### Classes

| Library                                                                | Description                                                          |
| :--------------------------------------------------------------------- | :------------------------------------------------------------------- |
| [AWSConfig](/javascript-api/jslib/aws/awsconfig)                       | Class to configure AWS client classes.                               |
| [EventBridge](/javascript-api/jslib/aws/eventbridgeclient) | Client class to interact with AWS EventBridge service. |
| [KMSClient](/javascript-api/jslib/aws/kmsclient)                       | Client class to interact with AWS Key Management Service.            |
| [S3Client](/javascript-api/jslib/aws/s3client)                         | Client class to interact with AWS S3 buckets and objects.            |
| [SecretsManager](/javascript-api/jslib/aws/secretsmanagerclient)       | Client class to interact with AWS secrets stored in Secrets Manager. |
| [SignatureV4](/javascript-api/jslib/aws/signaturev4) | Class to sign and pre-sign requests to AWS services. |
| [SQSClient](/javascript-api/jslib/aws/sqsclient)                       | Client class to interact with AWS Simple Queue Service.              |
| [SystemsManagerClient](/javascript-api/jslib/aws/systemsmanagerclient) | Client class to interact with AWS Systems Manager Service.           |