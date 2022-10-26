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
| [Load Tests](/cloud/cloud-reference/cloud-rest-api/tests/)      | List, Read, Update and Delete a Load Test |
| [Load Test Runs](/cloud/cloud-reference/cloud-rest-api/test-runs/)      | Start, Stop, List and Read a Load Test Run   |
| [Load Test Run Metrics](/cloud/cloud-reference/cloud-rest-api/test-run-metrics/)      | List, Read, and Export metric test data   |
| [Error reference](/cloud/cloud-reference/cloud-rest-api/error-reference/)      | Error message format    |

## Authentication

Authentication is based on a custom token scheme.

The Auth Token lets you to interact with the k6 Cloud through the k6 CLI and REST API.
If you have adequate permissions, you can get the token in your account settings in the k6 Cloud app.
The k6 Cloud [Token docs](https://k6.io/docs/cloud/integrations/token) describe the different access levels a token can have and the procedure to generate a token.

Requests to the cloud API MUST contain an authorization header with the value of your token.
Using [curl](https://curl.se/), a request looks like this:

```bash
curl -H "Authorization: token <YOUR_API_TOKEN_HERE>"  #replace with your token
```

### Authentication reference

| Property                  | Value  |
|---------------------------|--------|
| Security scheme type      | HTTP   |
| HTTP Authorization Scheme | bearer |
| Bearer format             | "JWT"  |
