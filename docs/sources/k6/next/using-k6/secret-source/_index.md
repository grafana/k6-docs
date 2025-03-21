---
title: Secret Source
description: 'Secret source are used so k6 can get and use secrets in a secure way'
weight: 14
---

# Secret source

Secret sources are a way for k6 to acquire secrets to be used with k6.

The secrets are made available through the [`k6/secrets`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-secrets) JS API and will be redacted from any logs.

## Configure secret sources

Currently the only way to configured secret sources is through the `--secret-source` cli flag. Multiple secret sources are configurable at the same time.

## Secret sources

Current built-in secret sources are limited and are mostly meant for local testing:

- [`file`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/file) reads secrets from a key=value file.
- [`mock`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/secret-source/mock) reads secrets from the cli flag.

## Secret source extensions

You can implement a secret source as an [extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) for k6.

## Example script

{{< code >}}

<!-- md-k6:skip -->

```javascript
import secrets from 'k6/secrets';

export default async () => {
  const my_secret = await secrets.get('cool'); // get secret from a source with the provided identifier
  console.log(my_secret);
  await secrets.get('else'); // get secret from a source with the provided identifier
  console.log(my_secret);
};
```

{{< /code >}}
if ran with the following file:

```
cool=some
else=source
```

You will notice how the secrets are redacted while the script still can use them, for example in protocol requests.

{{< code >}}

```bash
$ k6 run --secret-source=file=file.secret secrets.test.js
...
INFO[0000] ***SECRET_REDACTED***                         source=console
INFO[0000] ***SECRET_REDACTED***                         ***SECRET_REDACTED***=console
```

{{</ code >}}
