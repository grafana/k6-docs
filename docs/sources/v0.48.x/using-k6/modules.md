---
title: 'Modules'
description: 'While writing test scripts, it is common to import different modules, or part of modules, for
usage throughout the script. In k6, it is possible to import three different kinds of modules.'
weight: 07
---

# Modules

## Importing modules

It's common to import modules, or parts of modules, to use in your test scripts.
In k6, you can import different kinds of modules:

- [Built-in modules](#built-in-modules)
- [Local filesystem modules](#local-filesystem-modules)
- [Remote HTTP(S) modules](#remote-https-modules)
- [Extension modules](#extension-modules)

### Built-in modules

k6 provides many built-in modules for core functionalities.
For example, the `http` client make requests against the
system under test.
For the full list of built-in modules, refer to the [API documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api).

```javascript
import http from 'k6/http';
```

### Local modules

These modules are stored on the local filesystem, and accessed either through relative or absolute filesystem paths.

k6 adopts a **browser-like module resolution** and doesn't support [Node.js module resolution](https://nodejs.org/api/modules.html#modules_all_together). File names for `imports` must be fully specified, such as `./helpers.js`.

```javascript
//my-test.js
import { someHelper } from './helpers.js';

export default function () {
  someHelper();
}
```

```javascript
//helpers.js
export function someHelper() {
  // ...
}
```

### Remote modules

These modules are accessed over HTTP(S), from a public source like GitHub, any CDN, or
from any publicly accessible web server. The imported modules are downloaded and executed at
runtime, making it extremely important to **make sure you trust the code before including
it in a test script**.

For example, [jslib](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib) is a set of k6 JavaScript libraries available as remote HTTPS modules. They can be downloaded and imported as local modules or directly imported as remote modules.

```javascript
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  randomItem();
}
```

You can also build your custom Javascript libraries and distribute them via a public web hosting. For reference, [k6-jslib-aws](https://github.com/grafana/k6-jslib-aws) and [k6-rollup-example](https://github.com/grafana/k6-rollup-example) host their modules as GitHub release assets.

### Extension modules

Like the [k6 APIs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api), you can build custom modules in Go code and expose them as JavaScript modules. These custom Go-to-JS modules are known as [k6 extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions).

Below is an example that imports the `k6/x/kubernetes` module from the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension.

```javascript
import { Kubernetes } from 'k6/x/kubernetes';

const podSpec = {
  apiVersion: 'v1',
  kind: 'Pod',
  metadata: { name: 'busybox', namespace: 'testns' },
  spec: {
    containers: [
      {
        name: 'busybox',
        image: 'busybox',
        command: ['sh', '-c', 'sleep 30'],
      },
    ],
  },
};
export default function () {
  const kubernetes = new Kubernetes();
  kubernetes.create(podSpec);
  const pods = kubernetes.list('Pod', 'testns');
  pods.map(function (pod) {
    console.log(pod.metadata.name);
  });
}
```

How do k6 extensions (Go-to-JS modules) work? For enhanced performance, the k6 engine is written in Go and embeds a JavaScript VM ([goja](https://github.com/dop251/goja)) to execute JavaScript test code. That allows you to build your modules in Go code and import them as JavaScript as usual.

To learn more about using or creating k6 extensions, refer to the [Extension documentation](https://grafana.com/docs/k6/<K6_VERSION>/extensions).

## Sharing JavaScript modules

As mentioned previously, users can import custom JavaScript libraries by loading either local or remote modules. Because of that, we have two options to import JavaScript modules, along with various methods to distribute them.

{{< admonition type="note" >}}

The following options for distributing and sharing JavaScript libraries are available for both custom and other public libraries.

{{< /admonition >}}

**As remote modules**

You can host your modules in a public webserver like GitHub and any CDN and be imported remotely.

```javascript
// As GitHub release assets
import {
  WorkloadConfig,
  sayHello,
} from 'https://github.com/grafana/k6-rollup-example/releases/download/v0.0.2/index.js';

// or hosted in a CDN
import { randomIntBetween, randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
```

When the library consists of multiple files and modules, you may want to bundle these modules to create public releases. Here are some examples for reference:

- Using Webpack: [k6-jslib-utils](https://github.com/grafana/k6-jslib-utils) and [k6-jslib-aws](https://github.com/grafana/k6-jslib-aws).
- Using Rollup: [test-commons](https://github.com/grafana/k6-rollup-example/).

Be aware that k6 automatically executes remote modules, making it crucial to trust the source code of these remote modules. There is a **risk of altering the remote modules with certain hosting mechanisms**. To mitigate this security risk, some users prefer to download and import the modules locally to ensure full control of the source code.

**As local modules**

In this example, the previous remote modules have been downloaded to the `lib` folder of the testing project and imported as follows:

```javascript
import { WorkloadConfig, sayHello } from './libs/test-commons.js';

import { randomIntBetween, randomItem } from './libs/k6-utils.js';
```

Another option to distribute libraries is to use a package manager tool like npm, which enables version locking and the linking of local libraries. The latter can be useful during development.

Although k6 does not resolve node modules, you can utilize a Bundler to load npm dependencies, as shown in the [k6-rollup-example](https://github.com/grafana/k6-rollup-example).

## Using TypeScript

k6 does not natively support TypeScript. If you wish to write k6 tests in Typescript, you will need a bundler, as demonstrated in the previous examples:

- Using Webpack: Refer to [k6-template-typescript](https://github.com/grafana/k6-template-typescript) and [k6-jslib-aws](https://github.com/grafana/k6-jslib-aws).
- Using Rollup: Apply the [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript) to the [k6-rollup-example](https://github.com/grafana/k6-rollup-example).

## Using modules with Docker

Built-in and remote modules work out of the box when running k6 in a Docker container like the [Grafana k6 Docker image](https://hub.docker.com/r/grafana/k6).

### Local modules

To run k6 with Docker and import a local module, you must make sure to mount the necessary folders from the host into the container, using [Docker volumes](https://docs.docker.com/engine/admin/volumes/volumes/). Thus, k6 can see all the JS modules it needs to import.

For example, say you have the following structure on your host machine:

- `/home/k6/example/src/index.js`
- `/home/k6/example/src/modules/module.js`

{{< code >}}

```javascript
import { hello_world } from './modules/module.js';

export default function () {
  hello_world();
}
```

{{< /code >}}

{{< code >}}

```javascript
export function hello_world() {
  console.log('Hello world');
}
```

{{< /code >}}

To run index.js and make the modules available for import we execute the following Docker command with the `/home/k6/example/src` host folder mounted at `/src` in the container:

{{< code >}}

```bash
$ docker run --rm -v /home/k6/example/src:/src -i grafana/k6 run /src/index.js
```

{{< /code >}}

Note that on Windows, you also need to make sure that your drive in question, say `C:\`,
has been marked for sharing in the Docker Desktop settings.

### Extension modules

The official [Grafana k6 Docker image](https://hub.docker.com/r/grafana/k6) includes the k6 release binary but lacks additional k6 extensions. Therefore, using the official Docker container to run a k6 test that requires an extension will fail.

To run k6 with extensions in Docker, create a Docker image that includes the k6 binary with any extension you may want to use. Define a `Dockerfile` with the necessary [xk6 build](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-go#breaking-down-the-xk6-command) instructions as follows:

```bash
FROM grafana/xk6:latest

RUN GCO_ENABLED=0 xk6 build \
    --with github.com/grafana/xk6-kubernetes@latest

ENTRYPOINT ["./k6"]
```

After building your custom k6 Docker image, you can [run k6 with Docker](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6/) as usual.

Alternatively, you can implement a multistage Dockerfile build such as shown on this [Dockerfile example](https://github.com/grafana/xk6-output-prometheus-remote/blob/main/Dockerfile).

## Read more

- [JSLib](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib): A collection of k6 JavaScript libraries maintained by Grafana Labs and available as remote modules.
- [Extensions directory](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore): A collection of k6 extensions maintained by Grafana Labs and the community.
- [k6-rollup-example](https://github.com/grafana/k6-rollup-example): Example using Rollup and Babel to bundle a common library and testing suite.
- [k6-template-es6](https://github.com/grafana/k6-template-es6): Template using Webpack and Babel to bundle k6 tests into CommonJS modules and polyfill ES+ features.
- [k6-template-typescript](https://github.com/grafana/k6-template-typescript): Template using Webpack and Babel to use TypeScript in your k6 scripts.
- [JavaScript Compatibility Mode](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-compatibility-mode): An option to change the ECMAScript version supported by k6.
