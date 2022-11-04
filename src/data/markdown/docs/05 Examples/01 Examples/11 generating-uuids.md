---
title: 'Generating UUIDs'
excerpt: 'Scripting example on how to generate UUIDs in your load test.'
---

If you want to make a version 4 UUID,
you can use the [`uuidv4` function](/javascript-api/jslib/utils/uuidv4/) from the [k6 JS lib repository](https://jslib.k6.io/).

<CodeGroup labels={[""]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export default function () {
  const randomUUID = uuidv4();
  console.log(randomUUID); // 35acae14-f7cb-468a-9866-1fc45713149a
}
```

</CodeGroup>

If you really need other UUID versions, you must rely on an external library.

## Send v4 UUIDs in a POST request

This example script:
1. Makes a variable from a v4 UUID and logs the value to the console.
1. Makes the UUID an ID for an example object, then sends the object to a test server.

<CodeGroup labels={["uuid.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { randomString, uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';

export default function () {
  // create a uuid
  const id = uuidv4();
  console.log(id);

  //make it a user ID in a POST request
  const data = {
    userId: id,
    username: randomString(8),
    password: randomString(8),
  };
  const res = http.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(JSON.parse(res));
}
```

</CodeGroup>



## Generate v1 UUIDs


Universally unique identifiers are handy in many scenarios, as k6 doesn't have built-in support
for version 1 UUID, you'll have to resort to third-party libraries.
This example uses a Node.js library called [uuid](https://www.npmjs.com/package/uuid)
and [Browserify](http://browserify.org/) (to make it work in k6).

For this to work, we first need to go through a few required steps:

1. Make sure you have the necessary prerequisites installed:
   [Node.js](https://nodejs.org/en/download/) and [Browserify](http://browserify.org/)

2. Install the `uuid` library:
   <CodeGroup labels={[]} lineNumbers={[false]}>

   ```bash
   $ npm install uuid@3.4.0
   ```

   </CodeGroup>

3. Run it through browserify:
   <CodeGroup labels={[]} lineNumbers={[false]}>

   ```bash
   $ browserify node_modules/uuid/index.js -s uuid > uuid.js
   ```

   </CodeGroup>

4. Move the `uuid.js` file to the same folder as your script file. Now you can import
   it into your test script:

   <CodeGroup labels={[]} lineNumbers={[false]}>

   ```javascript
   import uuid from './uuid.js';
   ```

   </CodeGroup>

Here's an example generating a v1 and v4 UUID:

<CodeGroup labels={["generate-uuids.js"]} lineNumbers={[false]}>

```javascript
import uuid from './uuid.js';

export default function () {
  // Generate a UUID v1
  const uuid1 = uuid.v1();
  console.log(uuid1);

  // Generate a UUID v4
  const uuid4 = uuid.v4();
  console.log(uuid4);
}
```

</CodeGroup>
