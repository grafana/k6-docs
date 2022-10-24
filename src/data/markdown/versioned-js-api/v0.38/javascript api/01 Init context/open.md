---
head_title: 'JavaScript API: open'
title: 'open( filePath, [mode] )'
description: 'Opens a file and reads all the contents into memory.'
excerpt: 'Opens a file and reads all the contents into memory.'
---

Opens a file, reading all its contents into memory for use in the script.

> #### Use [SharedArray](/javascript-api/k6-data/sharedarray/) for CSV and JSON files
> `open()` often consumes a large amount of memory because every VU keeps a separate copy of the file in memory.
> To reduce the memory consumption, we strongly advise the usage of [SharedArray](/javascript-api/k6-data/sharedarray/) for CSV, JSON and other files intended for script parametrization.

<blockquote mod='warning'>

#### Function only available in "init context"

This is a function that can be called from only the init context (aka **init code**). This is to say, code in the global context, outside of the main export default function { ... }.

By restricting it to the init context, we can easily determine what local files are needed to run the test and thus what we need to bundle up when distributing the test to multiple nodes in a distributed test.

Refer to the example in the subsequent section of this page. For a more in-depth description, see [Running k6](/get-started/running-k6).

#### Breaking change in v0.36.0

Since k6 v0.36.0, VUs are now restricted to only `open()` files that were also opened in the [init context](https://k6.io/docs/using-k6/test-life-cycle/#init-and-vu-stages) of the first VU, which was initialized to get the exported `options` from the JS script (`__VU==0`).
This means that the code like `if (__VU > 0) { const arr = open("./arr.json"); }` will result in an error.

</blockquote>

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| filePath  | string | The path to the file, absolute or relative, that will be read into memory. The file will only be loaded once, even when running with several VUs. |
| mode      | string | By default, the contents of the file are read as text, but if you specify `b`, the file will be read as binary data instead.   |

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| string / ArrayBuffer | The contents of the file, returned as string or ArrayBuffer (if `b` was specified as the mode). |

> #### Breaking change in v0.32.0
> Since k6 v0.32.0 `open(..., 'b')` returns an ArrayBuffer object instead of an array of numbers (bytes).
> If you need to manipulate the binary data, you'll need to wrap the ArrayBuffer
> object in a [typed array view](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).


<CodeGroup labels={["users.json"]}>

```json
[
  {
    "username": "user1",
    "password": "password1"
  },
  {
    "username": "user2",
    "password": "password2"
  },
  {
    "username": "user3",
    "password": "password3"
  }
]
```

</CodeGroup>

<CodeGroup labels={["Loading JSON data with SharedArray to parameterize test"]}>

```javascript
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';

const data = new SharedArray('users', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const f = JSON.parse(open('./users.json'));
  return f; // f must be an array[]
});

export default () => {
  const randomUser = data[Math.floor(Math.random() * data.length)];
  console.log(`${randomUser.username}, ${randomUser.password}`);
  sleep(3);
};
```

</CodeGroup>

<CodeGroup labels={["Loading JSON data without SharedArray"]}>

```javascript
import { sleep } from 'k6';

const users = JSON.parse(open('./users.json')); // consider using SharedArray for large files

export default function () {
  const user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

<CodeGroup labels={["Loading a binary file and POSTing it as a multipart request"]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

const binFile = open('/path/to/file.bin', 'b');

export default function () {
  const data = {
    field: 'this is a standard form field',
    file: http.file(binFile, 'test.bin'),
  };
  const res = http.post('https://example.com/upload', data);
  sleep(3);
}
```

</CodeGroup>
