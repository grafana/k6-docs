---
title: SharedArray
excerpt: 'SharedArray is an array-like object that shares the underlying memory between VUs.'
---

`SharedArray` is an array-like object that shares the underlying memory between VUs. Its constructor takes a name for the `SharedArray` and a function which needs to return an array object itself. The function will be executed only once and its result will then be saved in memory once and copies of the elements will be given when requested. The name is needed as VUs are completely separate JS VMs and k6 needs some way to identify the `SharedArray`s that it needs to return.

This does mean that you can have multiple such ones and even only load some of them for given VUs, although that is unlikely to have any performance benefit.

Everything about `SharedArray` is read-only once it is constructed, so it is not possible to communicate between VUs using it.

> #### ⚠️ `SharedArray` can currently only be constructed inside `init` code!
> 
>  Attempting to instantiate a `SharedArray` outside of the [init context](/using-k6/test-lifecycle/) will result in a `new SharedArray must be called in the init context` exception. This limitation will eventually be removed, but for now, the implication is that `SharedArray` can only be used to populate test data at the very beginning of your test and not as a result of receiving data from a response (for example).

Supported operations include:
1. getting the number of elements with `length`
2. getting an element by its index using the normal syntax `array[index]`
3. using `for-of` loops

Which means that for the most part if you currently have an array data structure that you want to take less memory you can just wrap it in `SharedArray` and it should work for most cases.

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import { SharedArray } from 'k6/data';

const data = new SharedArray('some name', function () {
  // here you can open files, and then do additional processing on them or just generate the data dynamically
  const f = JSON.parse(open('./somefile.json'));
  return f; // f must be an array
});

export default () => {
  const element = data[Math.floor(Math.random() * data.length)];
  // do something with element
};
```

</div>

## Performance characteristics

As the `SharedArray` is keeping the data marshalled as JSON and unmarshals elements when requested it does take additional time to unmarshal JSONs and generate objects that then need to be garbage collected.

This in general should be unnoticeable compared to whatever you are doing with the data, but might mean that for small sets of data it is better to not use `SharedArray`, although your mileage may vary.

As an example the following script:

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const n = parseInt(__ENV.N);
function generateArray() {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = { something: 'something else' + i, password: '12314561' };
  }
  return arr;
}

let data;
if (__ENV.SHARED === 'true') {
  data = new SharedArray('my data', generateArray);
} else {
  data = generateArray();
}

export default function () {
  const iterationData = data[Math.floor(Math.random() * data.length)];
  const res = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(iterationData), {
    headers: { 'Content-type': 'application/json' },
  });
  check(res, { 'status 200': (r) => r.status === 200 });
}
```

</div>

Which was ran with v0.31.0 and 100 VUs. As can be seen from the table below, there isn't much of a difference at lower numbers of data lines - up until around 1000 data lines there is little benefit in memory usage. But also there is little to no difference in CPU usage as well. At 10k and above, the memory savings start to heavily translate to CPU ones.

| data lines | shared | wall time | CPU %    | MEM usage   | http requests |
| ---        | ---    | ---       | ---      |  ----       | ---           |
| 100        | true   | 2:01:70   | 70-79%   | 213-217MB   | 92191-98837   |
| 100        | false  | 2:01:80   | 74-75%   | 224-232MB   | 96851-98643   |
| 1000       | true   | 2:01:60   | 74-79%   | 209-216MB   | 98251-98806   |
| 1000       | false  | 2:01:90   | 75-77%   | 333-339MB   | 98069-98951   |
| 10000      | true   | 2:01:70   | 78-79%   | 213-217MB   | 97953-98735   |
| 10000      | false  | 2:03:00   | 80-83%   | 1364-1400MB | 96816-98852   |
| 100000     | true   | 2:02:20   | 78-79%   | 238-275MB   | 98103-98540   |
| 100000     | false  | 2:14:00   | 120-124% | 8.3-9.1GB   | 96003-97802   |

In v0.30.0 the difference in CPU usage at lower numbers was around 10-15%, but it also started to even out at around 10k data lines and was a clear winner at 100k.

The CPU/memory data comes from using `/usr/bin/time` and the raw data can be found [here](https://gist.github.com/MStoykov/1181cfa6f00bc56b90915155f885e2bb).

These numbers are purely illustrative as the performance can be affected by any additional processing of the element retrieved from the `SharedArray`, or if an output is in use, or it gets multiple elements, etc. While `SharedArray` has some CPU usage it might turn out that it will be negligible in a given situation with just 10 elements or more problematic than the memory usage for a 100k elements. So if in doubt you should probably run some benchmarks and decide which tradeoffs are more important for your use case.
