---
aliases:
  - ./javascript-compatibility-mode/ # /docs/k6/<K6_VERSION>/using-k6/javascript-compatibility-mode/
title: JavaScript and TypeScript compatibility mode
menuTitle: JavaScript and TypeScript mode
excerpt: 'k6 supports running test scripts with different compatibility modes using --compatibility-mode'
weight: 19
---

# JavaScript compatibility mode

This is option most users should no longer be using.

In previous versions k6 used to not natively support as much of the ECMAScript standard as was desired. For this reason the default mode used to use babel internally to add support for what was missing. This though had performance impact on starting k6 and might still not have supported as much as was desired. As such a different mode without babel (and core.js) was added that was much faster in initialization, but likely required transpilation from the user.

Since v0.53.0 this hasn't been needed and in general this option has minimal usability and is likely to be removed completely in future versions. See [issue](https://github.com/grafana/k6/issues/3864) for the last remaining difference.

Additionally, k6 also has support for [esbuild](https://esbuild.github.io/), to transpile TypeScript (TS) code. This used to use compatibility-mode but is now enabled by default and no configuration is required.

Some users prefer to bundle their test code outside k6. For this reason, k6 offers three JavaScript compatibility modes:

- [Extended mode](#extended-mode): The default option. That is `base` + aliasing `global` to `globalThis` - a nodejs compatibility.
- [Base mode](#base-mode): Only using native support in k6 and the underlying JS engine. After v0.53.0 it has the same functionality as `extended` apart from the `global` aliasing.

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

After v0.53.0 the only difference with base is that `global` (node's global variable) is aliased to the value of `globalThis`.

## Typescript support

{{< code >}}

```cli
$ k6 run script.ts
```

```env
$ k6 run script.ts
```

{{< /code >}}

It uses [esbuild](https://esbuild.github.io/) to transpile TypeScript (TS) code for all files that have the `.ts` extension.

TypeScript support is partial as it strips the type information but doesn't provide type safety.

## Base mode

{{< code >}}

```cli
$ k6 run --compatibility-mode=base script.js
```

```env
$ K6_COMPATIBILITY_MODE=base k6 run script.js
```

{{< /code >}}

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

- [Running large tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/running-large-tests): Optimize k6 for better performance.
- [k6 Modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules): Different options to import modules in k6.
- [k6 Archive Command](https://grafana.com/docs/k6/<K6_VERSION>/misc/archive): The `k6 archive` command bundles all k6 test dependencies into a `tar` file, which can then be used for execution. It may also reduce the execution startup time.
