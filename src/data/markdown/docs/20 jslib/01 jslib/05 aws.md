---
title: "aws"
excerpt: "aws is a library implementing APIs for accessing a selection of AWS services"
description: "aws is a library implementing APIs for accessing a selection of AWS servicese"
---

The `aws` module is a JavaScript library that wraps around some Amazon AWS service APIs. 

The library exposes a couple of configuration and client classes allowing to interact with a subset of AWS services in the context of k6 load test scripts:
- The [S3Client](/javascript-api/jslib/aws/s3client) to list S3 buckets and the objects they contain, as well as uploading, downloading and deleting objects from them.
- The [SecretsManagerClient](/javascript-api/jslib/aws/secretsmanagerclient) class allows listing, getting, creating, updating, and deleting secrets from the AWS secrets manager service.
- The [AWSConfig](/javascript-api/jslib/aws/awsconfig/) class is used by each client classes to provide them access to AWS credentials as well as configuration.

> ⭐️ Source code available on [GitHub](https://github.com/grafana/k6-jslib-aws). 
> Please request features and report bugs through [GitHub issues](https://github.com/grafana/k6-jslib-aws/issues).


<Blockquote mod='info'>

#### This library is in active development

This library is stable enough to be useful, but pay attention to the new versions released on [jslib.k6.io](https://jslib.k6.io) and [k6-jslib-aws/releases](https://github.com/grafana/k6-jslib-aws/releases).   

This documentation is for the last version only. If you discover that some code below does not work, it most likely means that you are using an older version.

</Blockquote>

### Classes

| Library                                                          | Description                                                                   |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| [S3Client](/javascript-api/jslib/aws/s3client)                   | Client class allowing to interact with AWS S3 buckets and objects.            |
| [SecretsManager](/javascript-api/jslib/aws/secretsmanagerclient) | Client class allowing to interact with AWS secrets stored in Secrets Manager. |
| [AWSConfig](/javascript-api/jslib/aws/awsconfig)                 | Class allowing to configure AWS client classes                                |


