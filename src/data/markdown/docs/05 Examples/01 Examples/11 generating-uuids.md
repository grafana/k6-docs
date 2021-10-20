---
title: 'Generating UUIDs'
excerpt: 'Scripting example on how to generate UUIDs in your load test.'
---

Scripting example on how to generate UUIDs in your load test.

Note that if you don't need v1 UUIDs, consider using the `uuidv4` function from
the [k6 JS lib repository](https://jslib.k6.io/).

## Generate v1 and v4 UUIDs

Universally unique identifiers are handy in many scenarios, as k6 doesn't have built-in support
for UUIDs, we'll have to resort to using a Node.js library called [uuid](https://www.npmjs.com/package/uuid)
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

4. Move the `uuid.js` file to the same folder as your script file and you'll be able to import
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
