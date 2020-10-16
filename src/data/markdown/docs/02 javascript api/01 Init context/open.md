---
head_title: 'JavaScript API: open'
title: 'open( filePath, [mode] )'
description: 'Opens a file and reads all the contents into memory.'
excerpt: ''
---

Opens a file, reading all its contents into memory for use in the script. Favourably used to parameterize tests with data from CSV/JSON files etc.

<Blockquote mod='warning'>

#### Function only available in "init context"

This is a function that can only be called from the init context (aka **init code**), code in the global context that is, outside of the main export default function { ... }.

By restricting it to the init context, we can easily determine what local files are needed to run the test and thus what we need to bundle up when distributing the test to multiple nodes in a clustered/distributed test.

See example further down on this page. For more in-depth description see [Running k6](/getting-started/running-k6).

</Blockquote>

| Parameter | Type   | Description                                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| filePath  | string | The path to the file, absolute or relative, that will be read into memory. The file will only be loaded once, even when running with several VUs. |
| mode      | string | By default the contents of the file is read as text, but if you specify `b` the file will be read as binary data instead.                         |

### Returns

| Type           | Description                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- |
| string / bytes | The contents of the file, read as text or bytes (if `b` has been specified as the mode). |

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

<CodeGroup labels={["Loading JSON data to parameterize test"]}>

```js
import { sleep } from 'k6';

const users = JSON.parse(open('./users.json'));

export default function () {
  let user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

<CodeGroup labels={["Loading a binary file and POSTing it as a multipart request"]}>

```js
import http from 'k6/http';
import { sleep } from 'k6';

let binFile = open('/path/to/file.bin', 'b');

export default function () {
  var data = {
    field: 'this is a standard form field',
    file: http.file(binFile, 'test.bin'),
  };
  var res = http.post('https://example.com/upload', data);
  sleep(3);
}
```

</CodeGroup>
