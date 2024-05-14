---
title: 'group( name, fn )'
description: 'Runs code inside a group. Used to organize results in a test.'
description: 'Runs code inside a group. Used to organize results in a test.'
---

# group( name, fn )

Run code inside a group. Groups are used to organize results in a test.

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| name      | string   | Name of the group.                                     |
| fn        | function | Group body - code to be executed in the group context. |

### Returns

| Type | Description               |
| ---- | ------------------------- |
| any  | The return value of _fn_. |

{{% admonition type="warning" %}}

Avoid using `group` with async functions or asynchronous code.
If you do, k6 might apply tags in a way that is unreliable or unintuitive.

If you start promise chains or even use `await` within `group`, some code within the group will be waited for and tagged with the proper `group` tag, but others won't be.

To avoid confusion, `async` functions are forbidden as `group()` arguments. This still lets users make and chain promises within a group, but doing so is unsupported and not recommended.

For more information, refer to [k6 #2728](https://github.com/grafana/k6/issues/2728), which tracks possible solutions and provides detailed explanations.

{{% /admonition %}}

### Example

{{< code >}}

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

{{< /code >}}

The above code will present the results separately depending on the group execution.

Learn more on [Groups and Tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).
