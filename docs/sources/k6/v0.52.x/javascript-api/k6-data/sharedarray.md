---
title: SharedArray
description: 'SharedArray is an array-like object that shares the underlying memory between VUs.'
weight: 1
---

# SharedArray

`SharedArray` is an array-like object that shares the underlying memory between VUs.
The function executes only once, and its result is saved in memory once.
When a script requests an element, k6 gives a _copy_ of that element.

You must construct a `SharedArray` in the [`init` context](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).
Its constructor takes a name for the `SharedArray` and a function that needs to return an array object itself:

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const data = new SharedArray('some name', function () {
  const dataArray = [];
  // more operations
  return dataArray; // must be an array
});
```

The name argument is required.
VUs are completely separate JS VMs, and k6 needs some way to identify the `SharedArray` that it needs to return.
You can have multiple `SharedArrays` and even load only some of them for given VUs,
though this is unlikely to have any performance benefit.

Supported operations on a `SharedArray` include:

- Getting the number of elements with `length`
- Getting an element by its index using the normal syntax `array[index]`
- Using `for-of` loops

In most cases, you should be able to reduce the memory usage of an array data structure by wrapping it in a `SharedArray`.
Once constructed, a `SharedArray` is read-only, so **you can't use a SharedArray to communicate data between VUs**.

{{< admonition type="caution" >}}

Attempting to instantiate a `SharedArray` outside of the [init context](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle) results in the exception `new SharedArray must be called in the init context`.

This limitation will eventually be removed, but for now, the implication is that you can use `SharedArray` to populate test data only at the very beginning of your test and not as a result of receiving data from a response (for example).

{{< /admonition >}}

## Common pitfalls

`SharedArray` has a special underlying implementation that provides memory efficiency benefits.
However, certain operations can negate these benefits by converting the `SharedArray` into a regular array or causing unnecessary marshalling.

### Avoid array methods that create new arrays

Methods like `.filter()` and `.map()` create regular arrays when called on a `SharedArray`, which removes the memory efficiency benefits.
Instead, iterate over the `SharedArray` and process elements individually.

However, you can use `.filter()` or `.map()` inside the `SharedArray` constructor function, since that operation only happens once during initialization.

**Don't:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const data = new SharedArray('users', function () {
  return JSON.parse(open('./users.json'));
});

export default function () {
  // This creates a new regular array, losing SharedArray benefits
  const filtered = data.filter(user => user.active);
  // ...
}
```

**Do:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

// Using filter/map inside the constructor is fine since it only runs once
const activeUsers = new SharedArray('active users', function () {
  const allUsers = JSON.parse(open('./users.json'));
  return allUsers.filter(user => user.active);
});

export default function () {
  const user = activeUsers[Math.floor(Math.random() * activeUsers.length)];
  // ...
}
```

### Avoid marshalling the entire SharedArray

When you marshal or serialize a `SharedArray` (for example, with `JSON.stringify()`), it converts to a regular array representation, which eliminates memory efficiency benefits.
Only marshal individual elements when needed.

**Don't:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const data = new SharedArray('users', function () {
  return JSON.parse(open('./users.json'));
});

export default function () {
  // Marshalling the entire SharedArray defeats its purpose
  const serialized = JSON.stringify(data);
  // ...
}
```

**Do:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const data = new SharedArray('users', function () {
  return JSON.parse(open('./users.json'));
});

export default function () {
  // Marshal only the element you need
  const user = data[Math.floor(Math.random() * data.length)];
  const serialized = JSON.stringify(user);
  // ...
}
```

### Avoid storing a single large object

`SharedArray` is designed for arrays of elements, not for storing a single large object.

**Don't:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

// Wrapping a single object in an array just to use SharedArray
const data = new SharedArray('config', function () {
  return [JSON.parse(open('./large-config.json'))];
});

export default function () {
  const config = data[0];
  // ...
}
```

### Avoid returning SharedArray from setup()

When you return a `SharedArray` from the `setup()` function, k6 marshals it, which removes its memory efficiency benefits.
Keep `SharedArray` instances in the init context instead.

**Don't:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

export function setup() {
  // Returning SharedArray from setup causes marshalling
  const data = new SharedArray('users', function () {
    return JSON.parse(open('./users.json'));
  });
  return { users: data };
}

export default function (data) {
  // data.users is now a regular array, not a SharedArray
  const user = data.users[0];
  // ...
}
```

**Do:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

// Keep SharedArray in init context
const users = new SharedArray('users', function () {
  return JSON.parse(open('./users.json'));
});

export default function () {
  // Access SharedArray directly
  const user = users[Math.floor(Math.random() * users.length)];
  // ...
}
```

### Opening files outside SharedArray just to return them as one

SharedArray works as it only opens and process the data ones and keeps in shared memory and then returns elements to separate VUs as requested. If you open the file in init context outside of the SharedArray callback, each VU will do that and have a copy of the original data.
**Don't:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const usersRaw = open('./users.json');
const usersJSON = JSON.parse(usersRaw);

// This doesn't just magically remove the work that was done before or reduces the memory used
const usersShared = new SharedArray('users', function () { return usersJSON })

export default function () {
  // data.users is now a regular array, not a SharedArray
  const user = usersShared[0];
  // ...
}
```

**Do:**

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
  // Here you can do additional work including only getting certain elements or filtering.
  return JSON.parse(open('./users.json'));
});

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];
  // ...
}
```

## Example

{{< code >}}

<!-- md-k6:skip -->

```javascript
import { SharedArray } from 'k6/data';

const data = new SharedArray('some name', function () {
  // All heavy work (opening and processing big files for example) should be done inside here.
  // This way it will happen only once and the result will be shared between all VUs, saving time and memory.
  const f = JSON.parse(open('./somefile.json'));
  return f; // f must be an array
});

export default function () {
  const element = data[Math.floor(Math.random() * data.length)];
  // do something with element
}
```

{{< /code >}}

## Performance characteristics

Internally, the current implementation of `SharedArray` keeps the data marshaled as JSON and unmarshals elements only when they are requested.

In general, this operation should be unnoticeable (relative to whatever else you do with the data).
But, for small data sets, `SharedArray` might perform worse.
However, this is highly dependent on use case.

To test this, we ran the following script on version v0.31.0 with 100 VUs.

{{< code >}}

<!-- md-k6:env.N=3 -->

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
  const res = http.post('https://quickpizza.grafana.com/api/post', JSON.stringify(iterationData), {
    headers: { 'Content-type': 'application/json' },
  });
  check(res, { 'status 200': (r) => r.status === 200 });
}
```

{{< /code >}}

As the table shows, performance didn't differ much at lower numbers of data lines:
up until around 1000 data lines, `SharedArray` shows little benefit in memory usage
and had a higher upper bound of CPU usage (though not substantially higher).

At 10k lines and above, the memory savings started to heavily carry over to CPU savings as well.

| data lines | shared | wall time | CPU %    | MEM usage   | http requests |
| ---------- | ------ | --------- | -------- | ----------- | ------------- |
| 100        | true   | 2:01:70   | 70-79%   | 213-217MB   | 92191-98837   |
| 100        | false  | 2:01:80   | 74-75%   | 224-232MB   | 96851-98643   |
| 1000       | true   | 2:01:60   | 74-79%   | 209-216MB   | 98251-98806   |
| 1000       | false  | 2:01:90   | 75-77%   | 333-339MB   | 98069-98951   |
| 10000      | true   | 2:01:70   | 78-79%   | 213-217MB   | 97953-98735   |
| 10000      | false  | 2:03:00   | 80-83%   | 1364-1400MB | 96816-98852   |
| 100000     | true   | 2:02:20   | 78-79%   | 238-275MB   | 98103-98540   |
| 100000     | false  | 2:14:00   | 120-124% | 8.3-9.1GB   | 96003-97802   |

In v0.30.0, the difference in CPU usage at lower numbers was around 10-15%, but it also started to even out at around 10k data lines and was a clear winner at 100k.

The CPU/memory data came from using `/usr/bin/time`. Refer to the [gist with the raw data](https://gist.github.com/MStoykov/1181cfa6f00bc56b90915155f885e2bb).

These numbers are purely illustrative: the performance can be affected by any additional processing of the element retrieved from the `SharedArray`, or if an output is in use, or it gets multiple elements, etc.
While `SharedArray` has some CPU usage,
it might turn out to be negligible in a given situation with just 10 elements, or more problematic than the memory usage for a 100k elements.
So, if in doubt, you should probably run some benchmarks and decide which tradeoffs are more important for your use case.
