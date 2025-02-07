---
title: 'Modules'
description: 'While writing test scripts, it is common to import different modules, or part of modules, for
usage throughout the script. In k6, it is possible to import three different kinds of modules.'
weight: 07
---

# Modules

## Import modules

It's common to import modules, or parts of modules, to use in your test scripts.
In k6, you can import different kinds of modules:

- [Built-in modules](#built-in-modules)
- [Local modules](#local-modules)
- [Remote modules](#remote-modules)
- [Extension modules](#extension-modules)

### Built-in modules

k6 provides many built-in modules for core functionalities.
For example, the `http` client make requests against the
system under test.
For the full list of built-in modules, refer to the [API documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api).

<!--md-k6:skip-->

```javascript
import http from 'k6/http';
```

### Local modules

These modules are stored on the local filesystem, and accessed either through relative or absolute filesystem paths.

k6 adopts a **browser-like module resolution** and doesn't support [Node.js module resolution](https://nodejs.org/api/modules.html#modules_all_together). File names for `imports` must be fully specified, such as `./helpers.js`.

<!--md-k6:skip-->

```javascript
//my-test.js
import { someHelper } from './helpers.js';

export default function () {
  someHelper();
}
```

<!--md-k6:skip-->

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
  randomItem([1, 2, 3]);
}
```

You can also build your custom Javascript libraries and distribute them via a public web hosting. For reference, [k6-jslib-aws](https://github.com/grafana/k6-jslib-aws) and [k6-rollup-example](https://github.com/grafana/k6-rollup-example) host their modules as GitHub release assets.

### Extension modules

Like the [k6 APIs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api), you can build custom modules in Go code and expose them as JavaScript modules. These custom Go-to-JS modules are known as [k6 extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions).

Below is an example that imports the `k6/x/kubernetes` module from the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension.

<!--md-k6:skip-->

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

How do k6 extensions (Go-to-JS modules) work? For enhanced performance, the k6 engine is written in Go and embeds a JavaScript VM ([sobek](https://github.com/grafana/sobek)) to execute JavaScript test code. That allows you to build your modules in Go code and import them as JavaScript as usual.

To learn more about using or creating k6 extensions, refer to the [Extension documentation](https://grafana.com/docs/k6/<K6_VERSION>/extensions).

## Share JavaScript modules

As mentioned previously, users can import custom JavaScript libraries by loading either local or remote modules. Because of that, we have two options to import JavaScript modules, along with various methods to distribute them.

{{< admonition type="note" >}}

The following options for distributing and sharing JavaScript libraries are available for both custom and other public libraries.

{{< /admonition >}}

### Remote modules

You can host your modules in a public webserver like GitHub and any CDN and be imported remotely.

<!--md-k6:skip-->

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

### Local modules

In this example, the previous remote modules have been downloaded to the `lib` folder of the testing project and imported as follows:

<!--md-k6:skip-->

```javascript
import { WorkloadConfig, sayHello } from './libs/test-commons.js';

import { randomIntBetween, randomItem } from './libs/k6-utils.js';
```

Another option to distribute libraries is to use a package manager tool like npm, which enables version locking and the linking of local libraries. The latter can be useful during development.

Although k6 does not resolve node modules, you can utilize a Bundler to load npm dependencies, as shown in the [k6-rollup-example](https://github.com/grafana/k6-rollup-example).

## Use Node.js modules

{{< admonition type="caution" >}}

k6 isn't Node.js or a browser. Packages that rely on APIs provided by Node.js, for instance the `os` and `fs` modules, won't work in k6. The same goes for browser-specific APIs, such as the `window` object.

{{< /admonition >}}

In a JavaScript project running Node.js, modules are imported using either `import` or `require()`, using the Node.js module resolution algorithm. This means that a user can import modules by name, without providing the full filesystem path to the module. For instance:

<!--md-k6:skip-->

```javascript
import { ClassInAModule } from 'cool-module';
```

The `import` statement would be automatically resolved by the node resolution algorithm by searching:

- The current directory
- Any `node_modules` folder in the directory
- Any `node_modules` folder in a parent directory, up to the closest `package.json` file.

As the implementation of `import` in k6 lacks support for the node module resolution algorithm, Node.js modules that resolve external dependencies need to be transformed into a self-contained, isolated, bundle.

That's done with the help of a bundling tool, such as Webpack, which analyses the test script, identifies all external dependencies, and then creates a self-contained bundle including everything necessary to run the script.

If the test script has no external dependencies, already has them vendored in a k6 compatible way, or only uses ES5.1+ features, using a bundler isn't necessary.

### Pick a bundler

You can use any bundler that supports transpilation. Popular ones include, but are not limited to, [webpack](https://github.com/webpack/webpack), [parcel](https://github.com/parcel-bundler/parcel), [rollup](https://github.com/rollup/rollup) and [browserify](https://github.com/browserify/browserify).

Due to its flexibility, ease of use, relatively low resource consumption, and known compatibility with k6, it is recommended to use [webpack](https://github.com/webpack/webpack).

You can also use these two example repositories as a starting point:

- [k6-template-es6](https://github.com/grafana/k6-template-es6): Template using Webpack and Babel to enable ES6 features in k6 tests.
- [k6-rollup-example](https://github.com/grafana/k6-rollup-example/): Example using Rollup to bundle k6 tests and release a shared library.

### Webpack setup example

Setting up a Babel and Webpack project from scratch might sound like a big undertaking, but
is usually accomplished within minutes. Start by creating a project folder and initializing
`npm`:

```bash
$ mkdir ./example-project && \
    cd "$_" && \
    npm init -y
```

#### Install packages

Then, install the packages needed:

```bash
$ npm install --save-dev \
    webpack \
    webpack-cli \
    @types/k6 \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    core-js
```

| Package                                                                                   | Usage                                                                                                                                                                                                                                                                 |
| :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [webpack](https://github.com/webpack/webpack)                                             | The bundler part of Webpack                                                                                                                                                                                                                                           |
| [webpack-cli](https://github.com/webpack/webpack-cli)                                     | The CLI part of Webpack, which allows us to use it from the terminal                                                                                                                                                                                                  |
| [@types/k6](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/k6)      | k6 Typescript definition                                                                                                                                                                                                                                              |
| [babel-loader](https://github.com/babel/babel-loader)                                     | A loader used by Webpack to leverage babel functionality while bundling                                                                                                                                                                                               |
| [@babel/core](https://github.com/babel/babel/tree/master/packages/babel-core)             | The core functionality of Babel                                                                                                                                                                                                                                       |
| [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) | A smart preset using [browserlist](https://github.com/browserslist/browserslist), [compat-table](https://github.com/kangax/compat-table) and [electron-to-chromium](https://github.com/Kilian/electron-to-chromium) to determine what code to transpile and polyfill. |
| [core-js](https://github.com/zloirock/core-js)                                            | A modular standard library for JS including polyfills                                                                                                                                                                                                                 |

#### Configure Webpack

Once these packages have been added, the next step will be to set up a `webpack.config.js` file:

<!--md-k6:skip-->

```javascript
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    login: './src/login.test.js',
    signup: './src/signup.test.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // eslint-disable-line
    libraryTarget: 'commonjs',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};
```

`Mode`

Tells Webpack to automatically use the optimizations associated with the `mode`.
Additional details available in [the webpack docs](https://webpack.js.org/configuration/mode/).

`Entry`

The files Webpack will use as its entry points while performing the bundling. From these points,
Webpack will automatically traverse all imports recursively until every possible dependency path has
been exhausted. For instance:

<!--md-k6:skip-->

```javascript
// login.test.js

import { SomeService } from './some.service.js';

const svc = new SomeService();
```

and:

<!--md-k6:skip-->

```javascript
// some.service.js

import * as lodash from 'lodash';

export class SomeService {
  constructor() {
    this._ = lodash;
  }
}
```

would result in Webpack bundling `login.test.js`, `some.service.js` and all upstream dependencies
utilized by `lodash`.

`Output`

The `path` key takes an absolute path which is where the finished bundle will be placed. In
this example, `path.resolve` is used to concatenate `__dirname` and `'dist'` into an absolute
path.

The `libraryTarget` key configures how the library will be exposed. Setting it to `commonjs`
will result in it being exported using `module.exports`. Additional details available in [the
Webpack docs](https://webpack.js.org/configuration/output/#outputlibrarytarget).

The `filename` key, as the name suggests, configures the name of the finished bundles. In this
example, the [template string](https://webpack.js.org/configuration/output/#template-strings) `[name]`
is used to add a dynamic part to the output filename.

#### Add a bundle command

Open the `package.json` file and add a new script entry, used for running the bundling process.

```diff
{
  "name": "bundling-example",
  "description": "",
  "version": "0.1.0",
  "private": true,
  "scripts": {
+    "bundle": "webpack"
  }
  ...
}
```

#### Bundle tests

Running webpack will now output two different test bundles, that may be executed independently:

```bash
$ npm run bundle
# ...
$ tree dist

dist
├── login.bundle.js
└── signup.bundle.js

0 directories, 2 files
```

#### Run tests

```bash
$ npm run bundle
# ...
$ k6 run dist/login.bundle.js
# ...
```

```bash
$ npm run bundle
# ...
$ k6 run dist/signup.bundle.js \
    --vus 10 \
    --duration 10s
# ...
```

## Use TypeScript

k6 supports partial TypeScript support. For more details, refer to [JavaScript and TypeScript compatibility mode](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-typescript-compatibility-mode/).

## Use modules with Docker

Built-in and remote modules work out of the box when running k6 in a Docker container like the [Grafana k6 Docker image](https://hub.docker.com/r/grafana/k6).

### Local modules

To run k6 with Docker and import a local module, you must make sure to mount the necessary folders from the host into the container, using [Docker volumes](https://docs.docker.com/engine/admin/volumes/volumes/). Thus, k6 can see all the JS modules it needs to import.

For example, say you have the following structure on your host machine:

- `/home/k6/example/src/index.js`
- `/home/k6/example/src/modules/module.js`

{{< code >}}

<!--md-k6:skip-->

```javascript
import { hello_world } from './modules/module.js';

export default function () {
  hello_world();
}
```

{{< /code >}}

{{< code >}}

<!--md-k6:skip-->

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

- [Guidelines for organizing your k6 performance testing suite](https://grafana.com/blog/2024/04/30/organizing-your-grafana-k6-performance-testing-suite-best-practices-to-get-started/): Recommendations for large performance testing projects.
- [JavaScript tools, shared libraries, multiple repos, and central teams](https://grafana.com/blog/2024/05/02/setting-up-your-grafana-k6-performance-testing-suite-javascript-tools-shared-libraries-and-more/): Options for structuring your performance testing projects and sharing k6 libraries with other teams.
- [JSLib](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib): A collection of k6 JavaScript libraries maintained by Grafana Labs and available as remote modules.
- [Extensions directory](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore): A collection of k6 extensions maintained by Grafana Labs and the community.
- [k6-rollup-example](https://github.com/grafana/k6-rollup-example): Example using Rollup and Babel to bundle a common library and testing suite.
- [k6-template-es6](https://github.com/grafana/k6-template-es6): Template using Webpack and Babel to bundle k6 tests into CommonJS modules and polyfill ES+ features.
- [k6-template-typescript](https://github.com/grafana/k6-template-typescript): Template using Webpack and Babel to use TypeScript in your k6 scripts.
- [JavaScript Compatibility Mode](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/javascript-compatibility-mode): An option to change the ECMAScript version supported by k6.
