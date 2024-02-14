---
title: JavaScript compatibility mode
menuTitle: JavaScript mode
excerpt: 'k6 supports running test scripts with different ECMAScript compatibility modes using --compatibility-mode'
_build:
  list: false
weight: 19
---

# JavaScript compatibility mode

You can write k6 scripts in various ECMAScript versions:

- ES6+ JavaScript with ES modules (ESM).
- ES6+ JavaScript with CommonJS modules.

k6 supports both module types and most ES6+ features in all k6 execution modes: local, distributed, and cloud.

To enable ES module support, k6 uses [Babel](https://babeljs.io/) internally to transform ESM to CommonJS. The process is as follows:

![Babel transformation in k6](/media/docs/k6-oss/diagram-grafana-k6-babel-pipeline.png)

Some users prefer to bundle their test code outside k6. For this reason, k6 offers two JavaScript compatibility modes:

- [Extended mode](#extended-mode): The default option, supporting ESM and most ES6+ features.
- [Base mode](#base-mode): Limited to CommonJS, excluding the Babel step.

When running tests, you can change the mode by using the `--compatibility-mode` option:

| Env                     | CLI                    | Code / Config file | Default      |
| ----------------------- | ---------------------- | ------------------ | ------------ |
| `K6_COMPATIBILITY_MODE` | `--compatibility-mode` | N/A                | `"extended"` |

## Extended mode

By default, k6 uses the `--compatibility-mode=extended` mode:

{{< code >}}

```bash
$ k6 run script.js
```

{{< /code >}}

As illustrated in the previous diagram, if k6 detects unsupported ES+ features while parsing the test script, it then transforms the script with Babel to polyfill the unsupported features.

Currently, the k6 Babel transformation only adds ESM support and sets `global` (node's global variable) with the value of `globalThis`.

## Base mode

{{< code >}}

```cli
$ k6 run --compatibility-mode=base script.js
```

```env
$ K6_COMPATIBILITY_MODE=base k6 run script.js
```

{{< /code >}}

The base mode omits the Babel transformation step, supporting only ES5.1+ code. You may want to enable this mode if your scripts are already written using only ES5.1 features or were previously transformed by Babel.

Generally, this mode is not recommended as it offers minor benefits in reducing startup time.

### CommonJS Example

{{< code >}}

```javascript
const http = require('k6/http');
const k6 = require('k6');

module.exports.options = {
  vus: 10,
  duration: '30s',
};

module.exports.default = function () {
  http.get('http://test.k6.io');
  k6.sleep(1);
};
```

{{< /code >}}

> ### ⚠️ About require()
>
> Note that `require()` is a custom k6 implementation of module
> loading, which doesn't behave in the same way as the
> [require() call in Node.js](https://nodejs.org/api/modules.html#modules_require_id).
> Specifically, it only handles loading of built-in k6 modules,
> scripts on the local filesystem, and remote scripts over HTTP(S),
> but it does _not_ support the
> [Node.js module resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together).

## Bundling with Babel outside of k6

The examples below demonstrate the use of Babel with bundlers like [Webpack](https://webpack.js.org/) and [Rollup](https://rollupjs.org/):

- [k6-template-es6](https://github.com/grafana/k6-template-es6): Template using Webpack and Babel to bundle k6 tests.
- [k6-rollup-example](https://github.com/grafana/k6-rollup-example): Example using Rollup and Babel to bundle a testing project.

## Read more

- [Native ESM support](https://github.com/grafana/k6/issues/3265): GitHub issue for native ESM support in k6. This feature aims to eliminate the Babel transformation step within k6.
- [Running large tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/running-large-tests): Optimize k6 for better performance.
- [k6 Modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules): Different options to import modules in k6.
- [k6 Archive Command](https://grafana.com/docs/k6/<K6_VERSION>/misc/archive): The `k6 archive` command bundles all k6 test dependencies into a `tar` file, which can then be used for execution. It may also reduce the execution startup time.
