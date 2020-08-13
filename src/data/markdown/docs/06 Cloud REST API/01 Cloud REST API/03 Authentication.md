---
title: 'Authentication'
excerpt: ''
draft: 'true'
---

Authentication is based on a custom token scheme. 

Your Auth Token is what enables this and allows you to interact with the k6 Cloud using the k6 CLI or through the REST API. To get your Auth Token, please visit [this page](https://app.k6.io/account/token).


Using cURL, your requests must contain the following header:


```shell
curl -H "Authorization: token <YOUR_API_TOKEN_HERE>"  #replace with your token
```

## bearerAuth

| Property                  | Value  |
| ------------------------- | ------ |
| Security scheme type      | HTTP   |
| HTTP Authorization Scheme | bearer |
| Bearer format             | "JWT"  |
