---
title: 'Modules'
excerpt: ''
---

## Importing modules

While writing test scripts, it's common to import different modules, or part of modules, for
usage throughout the script. In k6, it is possible to import three different kinds of modules:

### Built-in modules

These modules are provided through the k6 core, and gives access to the functionality built
into k6. This could, for instance, be the `http` client used for making requests against the
system under test. For a full list of built-in modules, see `the api documentation`.

```js
import http from 'k6/http';
```

### Local filesystem modules

These modules are stored on the local filesystem, and accessed either through relative
or absolute filesystem paths. For a module residing in the local filesystem to be compatible
with k6, the module itself may only use relative or absolute filesystem imports to access it's
dependencies.

```js
import { someHelper } from './some.helper.js';
```

### Remote HTTP(S) modules

These modules are accessed over HTTP(S), from a source like [the k6 jslib](#the-jslib-repository) or
from any publicly accessible web server. The imported modules will be downloaded and executed at
runtime, making it extremely important to **make sure the code is legit and trusted before including
it in a test script**.

```js
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';
```

## Bundling node modules

> ### Using the k6-es6 starter
>
> A ready-to-use Webpack and Babel starter is available in the [examples section](/examples), or directly
> [on GitHub](https://github.com/k6io/k6-es6).

In a javascript project running NodeJS, modules are imported using either `import` or `require()`,
using the node module resolution algorithm. This means that the developer can import modules
by name, without providing the full filesystem path to the module. For instance:

```js
import { ClassInAModule } from 'cool-module';
```

would be automatically resolved by the node resolution algorithm by searching:

- The current directory
- Any `node_modules` folder in the directory
- Any `node_modules` folder in a parent directory, up to the closest `package.json` file.

As the implementation of `import` in k6 lacks support for the node module resolution algorithm,
node modules that resolve external dependencies will first needto be transformed into a self-contained,
isolated, bundle.

This is done with the help of a bundling tool, like Webpack, which analyses the test script,
identifies all external dependencies, and then continues to create a self-contained bundle including
everything necessary to run the script.

If the test script has no external dependencies, already has them vendored in a k6 compatible way,
or only uses ES5.1+ features, using a bundler will not be necessary.

### Picking a bundler

It is possible to use any bundler that supports transpilation. Popular ones include, but are not
limited to, [webpack](https://github.com/webpack/webpack),
[parcel](https://github.com/parcel-bundler/parcel), [rollup](https://github.com/rollup/rollup)
and [browserify](https://github.com/browserify/browserify).

Due to its flexibility, ease of use, relatively low resource consumption, and known compatibility
with k6, it is recommended to use [webpack](https://github.com/webpack/webpack) unless you have a
specific reason to choose something else.

### Things to consider

In general, all external modules added to a test project have a negative impact on performance, as they further increase the memory footprint and CPU usage.

Usually, this is not a big problem as each application only allocates these resources once. In k6, however, every VU has a separate javascript virtual machine, duplicating the resource usage once each.

By running code requiring additional features on top of ES5.1, we also need additional extensions to the javascript vm, further boosting the resource usage. This is the default mode of k6.

When bundling using the configuration described in this article, babel and corejs automatically adds the features needed, thus allowing us to run our script without these extensions, using `--compatibility-mode=base`. For more details on the performance benefits of running in the base compability mode, see [this article](/using-k6/javascript-compatibility-mode#performance-comparison).

## Setting up the bundler

Setting up a Babel and Webpack project from scratch might sound like a big undertaking, but
is usually accomplished within minutes. Start by creating a project folder and initializing
npm:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [false]}'>

```bash
$ mkdir ./example-project && \
    cd "$_" && \
    npm init -y
```

</div>

### Installing packages

Then, install the packages needed:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [false]}'>

```bash
$ npm install --save-dev \
    webpack \
    webpack-cli \
    k6 \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    core-js
```

</div>

| Package                                                                                   | Usage                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [webpack](https://github.com/webpack/webpack)                                             | The bundler part of Webpack                                                                                                                                                                                                                                           |
| [webpack-cli](https://github.com/webpack/webpack-cli)                                     | The CLI part of Webpack, which allows us to use it from the terminal                                                                                                                                                                                                  |
| [k6](https://github.com/loadimpact/k6)                                                    | A dummy package used to provide typeahead in VSCode and similar                                                                                                                                                                                                       |
| [babel-loader](https://github.com/babel/babel-loader)                                     | A loader used by Webpack to leverage babel functionality while bundling                                                                                                                                                                                               |
| [@babel/core](https://github.com/babel/babel/tree/master/packages/babel-core)             | The core functionality of Babel                                                                                                                                                                                                                                       |
| [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) | A smart preset using [browserlist](https://github.com/browserslist/browserslist), [compat-table](https://github.com/kangax/compat-table) and [electron-to-chromium](https://github.com/Kilian/electron-to-chromium) to determine what code to transpile and polyfill. |
| [core-js](https://github.com/zloirock/core-js)                                            | A modular standard library for JS including polyfills                                                                                                                                                                                                                 |

### Configuring Webpack

Once these packages have been added, the next step will be to set up a `webpack.config.js` file:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    login: './src/login.test.js',
    signup: './src/signup.test.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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

</div>

**Mode**

Tells Webpack to automatically use the optimizations associated with the `mode`.
Additional details available in [the webpack docs](https://webpack.js.org/configuration/mode/).

**Entry**

The files Webpack will use as its entry points while performing the bundling. From these points,
Webpack will automatically traverse all imports recursively until every possible dependency path has
been exhausted. For instance:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
// login.test.js

import { SomeService } from './some.service.js';

const svc = new SomeService();
```

</div>

and

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
// some.service.js

import * as lodash from 'lodash';

export class SomeService {
  constructor() {
    this._ = lodash;
  }
}
```

</div>

would result in Webpack bundling `login.test.js`, `some.service.js` and all upstream dependencies
utilized by `lodash`.

**Output**

The `path` key takes an absolute path which is where the finished bundle will be placed. In
this example, `path.resolve` is used to concatenate `__dirname` and `'dist'` into an absolute
path.

The `libraryTarget` key configures how the library will be exposed. Setting it to `commonjs`
will result in it being exported using `module.exports`. Additional details available in [the
Webpack docs](https://webpack.js.org/configuration/output/#outputlibrarytarget).

The `filename` key, as the name suggests, configures the name of the finished bundles. In this
example, the [template string](https://webpack.js.org/configuration/output/#template-strings) `[name]`
is used to add a dynamic part to the output filename.

### Adding a bundle command

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

## Running the bundling

Running webpack will now output two different test bundles, that may be executed independently:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [false]}'>

```bash
$ npm run bundle
# ...
$ tree dist

dist
├── login.bundle.js
└── signup.bundle.js

0 directories, 2 files
```

</div>

## Running the tests

<div class="code-group" data-props='{"labels": [], "lineNumbers": [false]}'>

```bash
$ npm run bundle
# ...
$ k6 run dist/login.bundle.js

          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

  execution: local
     output: -
     script: dist/login.bundle.js

    duration: -,  iterations: 1
         vus: 1, max: 1

    done [==========================================================] 1 / 1

    data_received........: 0 B 0 B/s
    data_sent............: 0 B 0 B/s
    iteration_duration...: avg=1s min=1s med=1s max=1s p(90)=1s p(95)=1s
    iterations...........: 1   0.999794/s
    vus..................: 1   min=1 max=1
    vus_max..............: 1   min=1 max=1

```

</div>

<div class="code-group" data-props='{"labels": [], "lineNumbers": [false]}'>

```bash
$ npm run bundle
# ...
$ k6 run dist/signup.bundle.js \
    --vus 10 \
    --duration 10s

          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

  execution: local
     output: -
     script: dist/signup.bundle.js

    duration: 10s, iterations: -
         vus: 10,  max: 10

    done [==========================================================] 10s / 10s

    data_received........: 0 B 0 B/s
    data_sent............: 0 B 0 B/s
    iteration_duration...: avg=1s min=1s med=1s max=1s p(90)=1s p(95)=1s
    iterations...........: 90  8.999886/s
    vus..................: 10  min=10 max=10
    vus_max..............: 10  min=10 max=10

```

</div>

## The JSLib repository

A repository of libraries that are known to play nicely with k6 is available at https://jslib.k6.io/.

These libraries can either be downloaded and included with the test project or loaded directly using HTTP imports as shown [here](#remote-https-modules).

## Using local modules with Docker

When running k6 in a Docker container you must make sure to mount the necessary folders from the host into the container, using [Docker volumes](https://docs.docker.com/engine/admin/volumes/volumes/), so that k6 can see all the JS modules it needs to import.

For example, say you have the following structure on your host machine:

- `/home/k6/example/src/index.js`
- `/home/k6/example/src/modules/module.js`

<div class="code-group" data-props='{"labels": ["index.js"], "lineNumbers": [true]}'>

```js
import { hello_world } from './modules/module.js';

export default function () {
  hello_world();
}
```

</div>

<div class="code-group" data-props='{"labels": ["./modules/module.js"], "lineNumbers": [true]}'>

```js
export function hello_world() {
  console.log('Hello world');
}
```

</div>

To run index.js and make the modules available for import we execute the following Docker command with the `/home/k6/example/src` host folder mounted at `/src` in the container:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [false]}'>

```shell
$ docker run -v /home/k6/example/src:/src -i loadimpact/k6 run /src/index.js
```

</div>

Note that on Windows, you also need to make sure that your drive in question, say `C:\`,
has been marked for sharing in the Docker settings:

![Running k6 in docker on Windows](images/Modules/running-k6-in-docker-on-windows.png)
