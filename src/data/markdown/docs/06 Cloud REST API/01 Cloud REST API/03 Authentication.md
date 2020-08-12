---
title: 'Authentication'
excerpt: ''
draft: 'true'
---

Authentication is based on a custom token scheme. To locate your API token go to [app->k6 project->Integrations->User token](https://app.loadimpact.com/account/token).

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
