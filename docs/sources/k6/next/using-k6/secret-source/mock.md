---
title: 'Mock'
description: 'Secret source using cli arguments - not recommended for real world usage'
weight: 02
---

# Mock

You can use this secret source to test your tests quick and easy.

{{< code >}}

```bash
$ k6 run --secret-source=cli=mysecret=value script.js
```

```docker
$ docker run -it --rm \
    -v <scriptdir>:/scripts \
    grafana/k6 run --secret-source=mock=mysecret=value /scripts/script.js

```

{{< /code >}}

You can even use multiple ones and have some of them named or set as default.

{{< code >}}

````bash
$ k6 run --secret-source=mock=default,cool="cool secret" --secret-source=mock=name=another,cool="not cool secret" multi-source.test.js```
{{< /code >}}


{{< code >}}
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
````

{{< /code >}}
