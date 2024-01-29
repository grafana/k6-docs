---
title: JavaScript Compatibility Mode
excerpt: 'k6 supports running test scripts with different ECMAScript compatibility modes using --compatibility-mode'
_build:
  list: false
weight: 19
---

# JavaScript Compatibility Mode

You can run test scripts with different ECMAScript compatibility modes with the
`run --compatibility-mode` CLI option or `K6_COMPATIBILITY_MODE` environment variable.

Currently two modes are available:

## Base

{{< code >}}

```bash
$ k6 run --compatibility-mode=base script.js
```

```bash
$ K6_COMPATIBILITY_MODE=base k6 run script.js
```

{{< /code >}}

Pure Golang JavaScript VM supporting ES5.1+. Use this mode if your scripts are already written
using only ES5.1 features, or were previously transformed by [Babel](https://babeljs.io/),
to reduce startup time, RAM usage and improve performance. See the [k6-es6 project](https://github.com/k6io/k6-es6)
for an example [Webpack](https://webpack.js.org/) setup that does this
transformation outside of k6.

> ### ⚠️ Disclaimer
>
> Your mileage may vary while running `--compatibility-mode=base` and also importing external dependencies. For instance,
> `xml2js` and `cheerio` currently do not work, while `lodash` does.

### Basic Example

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

### Advanced Example

{{< code >}}

```javascript
const http = require('k6/http');
const metrics = require('k6/metrics');
const k6 = require('k6');

module.exports.options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'failed requests': ['rate<0.1'],
  },
};

const myFailRate = new metrics.Rate('failed requests');

module.exports.default = function () {
  const res = http.get('https://httpbin.test.k6.io/');
  const checkRes = k6.check(res, {
    'status was 200': function (r) {
      return r.status == 200;
    },
  });
  if (!checkRes) {
    myFailRate.add(1);
  }
  k6.sleep(1);
};
```

{{< /code >}}

## Extended

{{< code >}}

```bash
$ k6 run --compatibility-mode=extended script.js
```

```bash
$ K6_COMPATIBILITY_MODE=extended k6 run script.js
```

{{< /code >}}

In case of syntax/parsing errors, the script will be transformed using Babel with specific plugins bringing the compatibility to ES2015(ES6)+. This means that features such as classes and arrow functions can be used. This does take some time to transpile and the produced code has slightly different line/column numbers.

Before v0.31.0, k6 included [core.js](https://github.com/zloirock/core-js) v2 and even more Babel plugins in extended mode.
This added around 2MB extra memory usage per VU and some of the transformations (generators, async/await) of Babel were still insufficient to get k6 working with these features.

## Performance Comparison

There's a substantial difference in performance between both modes, as shown by
[GNU time](https://www.gnu.org/software/time/) below, especially when running tests with a large
number of VUs:

{{< code >}}

```bash
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

```bash
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
