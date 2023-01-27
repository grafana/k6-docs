---
title: 'group( name, fn )'
description: 'Runs code inside a group. Used to organize results in a test.'
excerpt: 'Runs code inside a group. Used to organize results in a test.'
---

Run code inside a group. Groups are used to organize results in a test.

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| name      | string   | Name of the group.                                     |
| fn        | function | Group body - code to be executed in the group context. |

### Returns

| Type | Description               |
| ---- | ------------------------- |
| any  | The return value of _fn_. |

<Blockquote mod="warning">
Using group with async functions or any kind of asynchronize code does not work reliably or intuitive.

This means that starting promise chains or even using `await` within it would not work as expected and some of the code "within" the group will be waited for and will be tagged with the proper `group` tag and others will not be.

In order for this to not be confusing async functions are forbidden as arguments. This still let users make and chain promises within a group but it is recommend that this is not done and it is not supported. 

This issue, possible solutions and more detail explanations of all of this is tracked in this [k6 issue](https://github.com/grafana/k6/issues/2728).
</Blockquote>

### Example

<CodeGroup labels={[]}>

```javascript
import { group } from 'k6';

export default function () {
  group('visit product listing page', function () {
    // ...
  });
  group('add several products to the shopping cart', function () {
    // ...
  });
  group('visit login page', function () {
    // ...
  });
  group('authenticate', function () {
    // ...
  });
  group('checkout process', function () {
    // ...
  });
}
```

</CodeGroup>

The above code will present the results separately depending on the group execution.

Learn more on [Groups and Tags](/using-k6/tags-and-groups).


