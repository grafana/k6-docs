---
title: 'Mock secret source'
menuTitle: 'Mock'
description: 'The mock secret source loads secrets from CLI arguments'
weight: 02
---

# Mock secret source

The mock secret source provides a quick way to test scripts with secrets.

{{< admonition type="note" >}}

Don't use the mock secret source in production. This source is designed for testing purposes only.

{{< /admonition >}}

To use the mock secret source, provide secrets directly in the command line:

{{< code >}}

```bash
k6 run --secret-source=mock=mysecret=value script.js
```

```docker
docker run -it --rm \
  -v <SCRIPT_DIR>:/scripts \
  grafana/k6 run --secret-source=mock=mysecret=value /scripts/script.js
```

{{< /code >}}

In the Docker example, replace `<SCRIPT_DIR>` with the absolute path to the directory that contains your script.

## Use multiple mock sources

Configure multiple mock sources and assign them names. You can also set one as the default source.

The following example configures two mock sources: one default source and one named `another`:

```bash
k6 run --secret-source=mock=default,cool="cool secret" --secret-source=mock=name=another,cool="not cool secret" multi-source.test.js
```

The following script demonstrates how to retrieve secrets from different sources:

<!-- md-k6:skip -->

```javascript
import secrets from "k6/secrets";

export default async () => {
  const my_secret = await secrets.get("cool");
  console.log(my_secret == "cool secret");
  const anothersource = await secrets.source("another")
  console.log(await anothersource.get("cool") == "cool secret");
  console.log(await anothersource.get("cool") == "not cool secret");
}
```
