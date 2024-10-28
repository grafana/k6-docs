---
title: 'Generating UUIDs'
description: 'Scripting example on how to generate UUIDs in your load test.'
weight: 11
---

# Generating UUIDs

If you want to make a version 4 UUID,
you can use the [`uuidv4` function](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/uuidv4) from the [k6 JS lib repository](https://jslib.k6.io/).

{{< code >}}

```javascript
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export default function () {
  const randomUUID = uuidv4();
  console.log(randomUUID); // 35acae14-f7cb-468a-9866-1fc45713149a
}
```

{{< /code >}}

If you really need other UUID versions, you must rely on an external library.

## Generate v1 UUIDs

As k6 doesn't have built-in support
for version 1 UUID, you'll have to use a third-party library.

This example uses a Node.js library called [uuid](https://www.npmjs.com/package/uuid)
and [Browserify](http://browserify.org/) (to make it work in k6).
For this to work, we first need to go through a few required steps:

1. Make sure you have the necessary prerequisites installed:
   [Node.js](https://nodejs.org/en/download/) and [Browserify](http://browserify.org/)

2. Install the `uuid` library:
   {{< code >}}

   ```bash
   $ npm install uuid@3.4.0
   ```

   {{< /code >}}

3. Run it through browserify:
   {{< code >}}

   ```bash
   $ browserify node_modules/uuid/index.js -s uuid > uuid.js
   ```

   {{< /code >}}

4. Move the `uuid.js` file to the same folder as your script file. Now you can import
   it into your test script:

   {{< code >}}

   ```javascript
   import uuid from './uuid.js';
   ```

   {{< /code >}}

This example generates a v1 UUID:

{{< code >}}

```javascript
import uuid from './uuid.js';

export default function () {
  // Generate a UUID v1
  const uuid1 = uuid.v1();
  console.log(uuid1);
}
```

{{< /code >}}
