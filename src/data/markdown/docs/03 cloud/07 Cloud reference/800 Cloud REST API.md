---
title: 'Cloud REST API'
excerpt: 'Introduction to Cloud REST API'
---

Welcome to the k6 Cloud REST API docs!

The things you can do with the Cloud API include:
- View data about organizations
- Start tests
- Retrieve data about tests and test runs

## APIs

| APIs                  |   |
|---------------------------|--------|
| [Organizations](/cloud/cloud-reference/cloud-rest-api/organizations/)      | List, Read, and List projects   |
| [Test](/cloud/cloud-reference/cloud-rest-api/tests/)      | List, Read, Update, Delete, and Start a test run   |
| [Test Runs](/cloud/cloud-reference/cloud-rest-api/test-runs/)      | List and Read    |
| [Test Runs Metrics](/cloud/cloud-reference/cloud-rest-api/organizations/)      | List, Read, and Export metric data   |
| [Error reference](/cloud/cloud-reference/cloud-rest-api/organizations/)      | Error message format    |

## Authentication

Authentication is based on a custom token scheme.

The Auth Token lets you to interact with the k6 Cloud through the k6 CLI and REST API.
If you have adequate permissions, you can get the token in your account settings in the k6 Cloud app.
The k6 Cloud [Token docs](https://k6.io/docs/cloud/integrations/token) describe the different access levels a token can have and the procedure to generate a token.

Requests to the cloud API MUST contain an authorization header with the value of your token.
Using cURL, a request looks like this:

```bash
curl -H "Authorization: token <YOUR_API_TOKEN_HERE>"  #replace with your token
```

### Authentication reference

| Property                  | Value  |
|---------------------------|--------|
| Security scheme type      | HTTP   |
| HTTP Authorization Scheme | bearer |
| Bearer format             | "JWT"  |
