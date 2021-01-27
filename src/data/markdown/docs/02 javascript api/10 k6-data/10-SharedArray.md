---
title: SharedArray
---

`SharedArray` is an array-like object that shares the underlying memory between VUs. Its constructor
takes a name for the `SharedArray` and a function which needs to return an array object itself. The
function will be executed only once and its result will then be saved in memory once and copies
of the elements will be given when requested. The name is needed as VUs are completely separate JS
VMs and k6 needs some way to identify the `SharedArray`s that it needs to return. 

This does mean that you can have multiple such ones and even only load some of them for given VUs, although that is
unlikely to have any performance benefit.

Everything about `SharedArray` is read-only once it is constructed, so it is not possible to
communicate between VUs using it.

Supported operations include:
1. getting the number of elements with `length`
2. getting an element by its index using the normal syntax `array[index]`
3. using `for-of` loops

Which means that for the most part if you currently have an array data structure that you want to
take less memory you can just wrap it in `SharedArray` and it should work for most cases.

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import { SharedArray } from "k6/data";

var data = new SharedArray("some name", function() {
    // here you can open files, and then do additional processing on them or just generate the data dynamically 
    var f = JSON.parse(open("./somefile.json")).;
    return f; // f must be an array
});

export default () => {
    var element = data[Math.floor(Math.random() * data.length)]
    // do something with element
}
```

</div>

## Performance characteristics

As the `SharedArray` is keeping the data marshalled as JSON and unmarshal elements when requested it
does:

1. take additional time to unmarshal JSONs
2. generate objects that then need to be garbage collected

This in general should be unnoticeable compared to whatever you are doing with the data, but might
mean that for small sets of data it is better to not use `SharedArray`, although your mileage may
vary.

As an example the following script:

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import {check} from "k6";
import http from "k6/http";
import {SharedArray} from "k6/data"

var n = parseInt(__ENV.N)
function generateArray() {
    var arr = new Array(n);
    for (var i = 0; i< n; i++){
        arr[i] = {"something": "something else" +i, "password": "12314561" }
    }
    return arr
}

var data;
if (__ENV.SHARED === "true") {
  data = new SharedArray("my data", generateArray);
} else {
  data = generateArray();
}

export default function () {
    var iterationData = data[Math.floor(Math.random() * data.length)];
    var res = http.post("https://httpbin.test.k6.io/anything", JSON.stringify(iterationData), {headers: {"Content-type": "application/json"}})
    check(res, {"status 200": (r) => r.status === 200})
}
```

</div>

Which was ran with v0.30.0 and 100 VUs started to even out the CPU usage around 10k elements, but also was using 1/3 of the memory. At 100k `SharedArray` was the clear winner, while for lower numbers it is possible that not using it will help with performance.

| data lines | shared | wall time | CPU %    | mem usage   | http requests |
| ---        | ---    | ---       | ---      |  ----       | ---           |
| 100        | true   | 2:02:50   | 86-90%   | 509-517MB   | 90248-92979   |
| 100        | false  | 2:02:50   | 76-80%   | 512-533MB   | 92534-94666   |
| 1000       | true   | 2:03:00   | 86-92%   | 509-519MB   | 92007-95234   |
| 1000       | false  | 2:02:60   | 78-80%   | 621-630MB   | 92814-94526   |
| 10000      | true   | 2:02:70   | 88-95%   | 515-523MB   | 92936-94997   |
| 10000      | false  | 2:03:80   | 81-85%   | 1650-1675MB | 92339-95083   |
| 100000     | true   | 2:04:50   | 89-91%   | 528-531MB   | 92274-93987   |
| 100000     | false  | 2:15:00   | 115-123% | 8.9-9.5GB   | 90416-94817   |

The CPU/memory data comes from using `/usr/bin/time` and the raw data can be find [here](https://gist.github.com/MStoykov/1181cfa6f00bc56b90915155f885e2bb)

This numbers are purely illustrative as if the script is doing more with an element that it gets from the `SharedArray`, or an output is in use, or it gets multiple elements, or - all of those things add up so, while `SharedArray` has some CPU usage it might turn out that it will be negligible in a given situation with just 10 elements or more problematic then the memory usage for a 100k elements. So if in doubt you should probably run some benchmarks.
