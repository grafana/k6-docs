---
title: 'File'
description: 'Secret source using a plaintext file with key=value pairs'
weight: 01
---

# File

You can use this secret source to load secrets from a key=value pair file as in:

{{< code >}}

```
secret=very secret
someotherkey=another secret
```

{{</code >}}

{{< code >}}

```bash
$ k6 run --secret-source=file=secrets.file script.js
```

```docker
$ docker run -it --rm \
    -v <scriptdir>:/scripts \
    grafana/k6 run --secret-source=file=/scripts/secrets.file /scripts/script.js

```

{{< /code >}}
