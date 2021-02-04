---
title: 'group( name, fn )'
description: 'Runs code inside a group. Used to organize results in a test.'
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
  group('go to login page and authenticate', function () {
    // ...
  });
  group('checkout process', function () {
    // ...
  });

}
}
```

</CodeGroup>

The above code will present the results separately depending on the group execution.

Learn more on [Groups and Tags](/using-k6/tags-and-groups).


