---
title: JavaScript Compatibility Mode
description: 'k6 supports running test scripts with different ECMAScript compatibility modes using --compatibility-mode'
_build:
  list: false
weight: 19
---

# JavaScript compatibility mode

You can write k6 scripts in various ECMAScript versions:

- ES6+ JavaScript with ES modules (ESM).
- Plain old JavaScript (ES5.1+) with CommonJS modules.

k6 supports both module types and most ES6+ features in all k6 execution modes: local, distributed, and cloud.

Yet, to enable ES module support, k6 uses [Babel](https://babeljs.io/) internally to transform ESM to CommonJS. This process is as follows:

![Babel transformation in k6](/media/docs/k6-oss/diagram-grafana-k6-babel-pipeline.png)

Since large tests can consume significant resources, some users prefer to bundle and **optimize their test code outside k6 for better performance**. For this reason, k6 offers two JavaScript Compatibility modes:

- [Extended mode](#extended-mode): The default, supporting ESM and most ES6+ features.
- [Base mode](#base-mode): Limited to plain old JavaScript (ES5.1) and CommonJS, excluding the Babel step.

When running tests, you can change the mode through the `--compatibility-mode` option:

| Env                     | CLI                    | Code / Config file | Default      |
| ----------------------- | ---------------------- | ------------------ | ------------ |
| `K6_COMPATIBILITY_MODE` | `--compatibility-mode` | N/A                | `"extended"` |

## Extended mode

By default, k6 uses the `--compatibility-mode=extended` mode:

{{< code >}}

```default
$ k6 run script.js
```

{{< /code >}}

As illustrated in the previous diagram, if k6 detects unsupported ES+ features while parsing the test script, it then transforms the script with Babel to polyfill the unsupported features.

This k6 Babel transformation enables the k6 JavaScript VM to execute the test. Also, it may increase startup time (refer to [Performance comparison](#performance-comparison)) and produces code with slightly different line/column numbers.

## Base mode

{{< code >}}

```cli
$ k6 run --compatibility-mode=base script.js
```

```env
$ K6_COMPATIBILITY_MODE=base k6 run script.js
```

{{< /code >}}

This mode omits the Babel transformation step, supporting only ES5.1+ code.

Use this mode if your scripts are already written using only ES5.1 features, or were previously transformed by Babel. This mode can lead to reduce startup time, RAM usage, and overall improved performance.

The examples below demonstrate the use of Babel with bundlers like [Webpack](https://webpack.js.org/) and [Rollup](https://rollupjs.org/):

- [k6-template-es6](https://github.com/grafana/k6-template-es6)
- [k6-template-typescript](https://github.com/grafana/k6-template-typescript)
- [k6-rollup-example](https://github.com/grafana/k6-rollup-example)

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

## Performance Comparison

There might be a notable performance difference between both compatibility modes, particularly influenced by the script code and the number of VUs. The following [GNU time](https://www.gnu.org/software/time/) metrics provide insights about their differences:

{{< code >}}

```base
$ /usr/bin/time -v k6 run \
    --compatibility-mode=base \
    --vus 3500 \
    --duration=60s \
    script.js

[...]
User time (seconds): 15.10
System time (seconds): 10.02
Percent of CPU this job got: 40%
Elapsed (wall clock) time (h:mm:ss or m:ss): 1:01.88
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 903612
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 1
Minor (reclaiming a frame) page faults: 352090
Voluntary context switches: 558479
Involuntary context switches: 4689
Swaps: 0
File system inputs: 0
File system outputs: 78856
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```

```extended
$ /usr/bin/time -v k6 run \
    --compatibility-mode=extended \
    --vus 3500 \
    --duration=60s \
    script.js

[...]
User time (seconds): 104.44
System time (seconds): 6.96
Percent of CPU this job got: 101%
Elapsed (wall clock) time (h:mm:ss or m:ss): 1:49.49
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 7972316
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 1
Minor (reclaiming a frame) page faults: 2595676
Voluntary context switches: 535511
Involuntary context switches: 9306
Swaps: 0
File system inputs: 0
File system outputs: 78856
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```

{{< /code >}}

<b>&nbsp;</b>

## Read more

- [Native ESM support](https://github.com/grafana/k6/issues/3265): GitHub issue for native ESM support in k6. This feature aims to eliminate the Babel transformation step within k6.
- [k6-template-es6](https://github.com/grafana/k6-template-es6): Template using Webpack and Babel to bundle k6 tests into CommonJS modules.
- [k6-rollup-example](https://github.com/grafana/k6-rollup-example): Example using Rollup and Babel to bundle a testing project.
- [Running large tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/running-large-tests): Optimize k6 for better performance.
- [k6 Modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules): Different options to import modules in k6.
- [k6 Archive Command](https://grafana.com/docs/k6/<K6_VERSION>/misc/archive): The `k6 archive` command bundles all k6 test dependencies into a `tar` file, which can then be used for execution. It may also reduce the execution startup time.
