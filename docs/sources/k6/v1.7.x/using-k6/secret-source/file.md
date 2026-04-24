---
title: 'File secret source'
menuTitle: 'File'
description: 'The file secret source loads secrets from a plain text file with key=value pairs'
weight: 01
---

# File secret source

The file secret source loads secrets from a plain text file.

Each line in the file contains one secret in `key=value` format:

{{< code >}}

```text
secret=very secret
someotherkey=another secret
```

{{< /code >}}

To use the file secret source, specify the file path with the `--secret-source` flag:

{{< code >}}

```bash
k6 run --secret-source=file=secrets.file script.js
```

```docker
docker run -it --rm \
  -v <SCRIPT_DIR>:/scripts \
  grafana/k6 run --secret-source=file=/scripts/secrets.file /scripts/script.js
```

{{< /code >}}

In the Docker example, replace `<SCRIPT_DIR>` with the absolute path to the directory that contains your script and secrets file.
