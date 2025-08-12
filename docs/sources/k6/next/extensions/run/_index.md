---
title: 'Run a test with extensions'
menuTitle: 'Run a test with extensions'
description: 'Learn how to run a k6 test with extensions.'
weight: 03
---

# Run a test with extensions

As explained in the [Explore extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore) page, there are extensions that can be used directly in your test script, and others that require building a custom k6 binary.

## Using automatic extension resolution

It is as easy as importing them. Example with [xk6-faker](https://github.com/grafana/xk6-faker):

```javascript
import faker from 'k6/x/faker';

export default function () {
  console.log(faker.person.firstName());
}
```

Then, you can run your script as usual, and k6 will automatically detect the extension and load it:

```sh
k6 run script.js
```

{{< admonition type="note" >}}

To use community extensions you must have `K6_ENABLE_COMMUNITY_EXTENSIONS` set to `true`.

```sh
K6_ENABLE_COMMUNITY_EXTENSIONS=true k6 run test.js
```

{{< /admonition >}}

### Limitations

- Only works with Official and Community extensions.
- Output extensions are not supported.
- Running scripts from stdin is not supported.
- Only files with extensions `.js`, `.ts` or `.tar` can be used.

### How to disable this feature

You can disable this feature by setting the environment variable `K6_AUTO_EXTENSION_RESOLUTION` to `false`. If provided, the previous example
fails because k6 can't load the extension dynamically.

```bash
K6_AUTO_EXTENSION_RESOLUTION=false k6 run test.js
```

## Using extensions that require building a custom k6 binary

To run other extensions (including ones you create), you need to build a custom k6 binary with [xk6](https://github.com/grafana/xk6/).

You can do this locally with [Go](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/build-k6-binary-using-go/) or use the [xk6 Docker image](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/build-k6-binary-using-docker/).

{{< code >}}

```go-and-xk6
xk6 build \
  --with github.com/grafana/xk6-sql@v0.0.1 \
  --with github.com/grafana/xk6-output-influxdb
```

```docker-in-linux
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build \
  --with github.com/grafana/xk6-sql@v0.0.1 \
```

{{< /code >}}

<br/>
