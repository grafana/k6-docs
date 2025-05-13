---
title: 'Use global variables in k6'
description: 'Learn how and when to use global variables in k6.'
weight: 13
---

# Use global variables in k6

A global variable is a variable that can be accessed from any scope. In the context of k6, global variables can be used to persist and pass information across iterations of a test run, and must be declared in the [`init` stage](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle/#the-init-stage).

A common use case is when you need to extract a value from a page, such as a CSRF or an API token, and reuse that across iterations of your test.

There are multiple ways to use global variables in JavaScript, each with benefits and drawbacks.

## Option 1: use `import` and `export`

The first option is to declare a global variables object in your main script and export it.

```js
import { doSomething, doSomethingElse } from './imported-script.js';

export const VARS = {};

export default function () {
  VARS.prop = 'prop1';

  doSomething();

  doSomethingElse();
  console.log(JSON.stringify(VARS));
}
```

You can then import the variable in your script, and use it across functions or alter the values:

```js
import { VARS } from './main.js';

export function doSomething() {
  console.log(JSON.stringify(VARS));
}

export function doSomethingElse() {
  VARS.prop2 = 'prop2';
}
```

The advantage of using this method is the fact that you need to explicitly use the `import` and `export` statements. That can make it easier when working in a team, so other developers can understand your script logic and see where the variables and values came from.

## Option 2: use `globalThis`

The second option is to use the `globalThis` JavaScript object, which is available in any JavaScript environment, not just k6.

For example, in your main script you can add a property to `globalThis`:

```js
import { doSomething, doSomethingElse } from './imported-script.js';

globalThis.VARS = {};

export default function () {
  globalThis.VARS.prop = 'prop1';

  doSomething();

  doSomethingElse();
  console.log(JSON.stringify(globalThis.VARS));
}
```

And, similarly to the previous option, you can use access it from anywhere in that script or in imported scripts as well:

```js
export function doSomething() {
  console.log(JSON.stringify(globalThis.VARS));
}

export function doSomethingElse() {
  globalThis.VARS.prop2 = 'prop2';
}
```

The advantage to using the `globalThis` object is that you don't need to `import` or `export` a global variable. The downside is that, depending on how complex or extensive your test scripts are, using the `globalThis` variable can make your script more verbose, and cause unintended behavior if you're not careful about how you're using and setting global variables.
