---
title: Secret source
description: 'Secret sources let k6 retrieve and use secrets securely'
weight: 1600
---

# Secret source

Secret sources provide a secure way for k6 to retrieve and use secrets. Unlike values from environment variables or files, values from secret sources are automatically redacted from k6 logs before propagation through the system.

Access secrets through the [`k6/secrets`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-secrets) JavaScript API. All secrets are redacted from logs.

## Configure secret sources

Configure secret sources using the `--secret-source` CLI flag. You can configure multiple secret sources simultaneously.

## Built-in secret sources

The following built-in secret sources are available for local testing:

- [`file`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/file): Reads secrets from a `key=value` file.
- [`mock`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/mock): Reads secrets from CLI arguments.

## Secret source extensions

You can implement a secret source as an [extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) for k6.

## Example script

<!-- md-k6:skip -->

```javascript
import http from 'k6/http';
import secrets from 'k6/secrets';

export default async () => {
  const my_secret = await secrets.get('cool'); // Retrieves secret by identifier
  console.log(my_secret);
  const response = await http.asyncRequest('GET', 'https://httpbin.org/get', null, {
    headers: {
      'Custom-Authentication': `Bearer ${await secrets.get('else')}`,
    },
  });
  console.log(response.body);
};
```

Run the script with the following secrets file:

```text
cool=some
else=source
```

The following output shows how secrets are redacted in logs, shown as `***SECRET_REDACTED***`, while remaining accessible to the script.

```bash
$ k6 run --secret-source=file=file.secret secrets.test.js
...
INFO[0000] ***SECRET_REDACTED***                         source=console
INFO[0001] {
  "args": {},
  "headers": {
    "Custom-Authentication": "Bearer ***SECRET_REDACTED***",
    "Host": "httpbin.org",
    "User-Agent": "k6/0.57.0 (https://k6.io/)",
    "X-Amzn-Trace-Id": "Root=1-67dd638b-4243896a2fa1b1b45bc63eaa"
  },
  "origin": "<my actual IP>",
  "url": "https://httpbin.org/get"
}  ***SECRET_REDACTED***=console
```
