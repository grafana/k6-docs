---
title: "Generating UUIDs"
excerpt: "Scripting example on how to generate UUIDs in your load test."
---

Scripting example on how to generate UUIDs in your load test.

## Generate v1 and v4 UUIDs
Universally unique identifiers are handy in many scenarios, as k6 doesn't have built-in support
for UUIDs, we'll have to resort to using a Node.js library called [uuid](https://www.npmjs.com/package/uuid)
and [Browserify](http://browserify.org/) (to make it work in k6).

There are a few steps required to make this work:

1. Make sure you have the necessary prerequisites installed:
   [Node.js](https://nodejs.org/en/download/) and [Browserify](http://browserify.org/)

2. Install the `uuid` library:
   <div class="code-group" data-props='{ "labels": [], "lineNumbers": [false] }'>

    ```shell
    $ npm install uuid@3.4.0
    ```

   </div>
3. Run it through browserify:
   <div class="code-group" data-props='{ "labels": [], "lineNumbers": [false] }'>

   ```shell
   $ browserify node_modules/uuid/index.js -s uuid > uuid.js
   ```

   </div>

4. Move the `uuid.js` file to the same folder as your script file and you'll be able to import
   it into your test script:

   <div class="code-group" data-props='{ "labels": [], "lineNumbers": [false] }'>

   ```js
   import uuid from "./uuid.js"`
   ```

   </div>


Here's an example generating a v1 and v4 UUID:

<div class="code-group" data-props='{ "labels": ["generate-uuids.js"], "lineNumbers": [false] }'>

```js
import uuid from "./uuid.js";

export default function() {
    // Generate a UUID v1
    let uuid1 = uuid.v1();
    console.log(uuid1);

    // Generate a UUID v4
    let uuid4 = uuid.v4();
    console.log(uuid4);
}
```

</div>
