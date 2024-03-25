---
head_title: 'JavaScript API: open'
title: 'open( filePath, [mode] )'
description: 'Opens a file and reads all the contents into memory.'
description: 'Opens a file and reads all the contents into memory.'
---

# open( filePath, [mode] )

Opens a file, reading all its contents into memory for use in the script.

{{% admonition type="note" %}}

`open()` often consumes a large amount of memory because every VU keeps a separate copy of the file in memory.

To reduce the memory consumption, we strongly advise the usage of [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) for CSV, JSON and other files intended for script parametrization.

{{% /admonition %}}

{{% admonition type="caution" %}}

This function can only be called from the init context (aka _init code_), code in the global context that is, outside of the main export default function { ... }.

By restricting it to the init context, we can easily determine what local files are needed to run the test and thus what we need to bundle up when distributing the test to multiple nodes in a clustered/distributed test.

See the example further down on this page. For a more in-depth description, see [Test lifecycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

{{% /admonition %}}

| Parameter | Type   | Description                                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| filePath  | string | The path to the file, absolute or relative, that will be read into memory. The file will only be loaded once, even when running with several VUs. |
| mode      | string | By default, the contents of the file are read as text, but if you specify `b`, the file will be read as binary data instead.                      |

### Returns

| Type                 | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| string / ArrayBuffer | The contents of the file, returned as string or ArrayBuffer (if `b` was specified as the mode). |

{{< code >}}

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

{{< /code >}}

{{< code >}}

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

{{< /code >}}

{{< code >}}

```javascript
import { sleep } from 'k6';

const users = JSON.parse(open('./users.json')); // consider using SharedArray for large files

export default function () {
  const user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

{{< /code >}}

{{< code >}}

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

{{< /code >}}
