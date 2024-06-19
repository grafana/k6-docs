---
title: 'getAttribute(name)'
description: 'Browser module: elementHandle.getAttribute method'
---

# getAttribute(name)

{{% admonition type="warning" %}}

Use [`locator.getAttribute(name[, options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/getattribute/) instead.

{{% /admonition %}}

Returns the element attribute value for the given attribute name.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name            | string | `''`    | Attribute name to get the value for.                                                                                                                                                                                                                                                                                                          |

</TableWithNestedRows>

### Returns

| Type                      | Description                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Promise<string \| null>` | A Promise that fulfills with the string value of the attribute or `null` if the attribute is not present. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/browser.php');

  const textbox = await page.$('#text1');
  const attribute = await textbox.getAttribute('onfocus');
  console.log(attribute);

  await page.close();
}
```

{{< /code >}}
