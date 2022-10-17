---
title: 'Get started'
excerpt: 'Introduction to Cloud REST API'
draft: 'true'
---

Welcome to the k6 Cloud REST API docs!

The k6 Cloud API gives you programmatic access to the same set of features used to power the service at [app.k6.io](https://app.k6.io). 
The things you can do with the Cloud API include:
- View data about organizations
- Start tests
- Retrieve data about tests and test runs

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

## Request paths

All requests go to the base URL, `https://api.k6.io/`.

Some endpoints start at the `/v2/` path.
Others start at the `/v3` path.

k6 plans to introduce new versions while keeping old ones functional (for a long time).
