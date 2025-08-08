---
title: 'getByTestId(testId)'
description: 'Browser module: page.getByTestId(testId) method'
---

# getByTestId(testId)

Returns a locator for elements with the specified test ID attribute. This method is designed for robust test automation by locating elements using dedicated test identifiers that are independent of the visual appearance or content changes. Currently it can only work with the `data-testid` attribute.

<TableWithNestedRows>

| Parameter | Type           | Default | Description                                                                                                                                            |
| --------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| testId    | string\|RegExp | -       | Required. The test ID value to search for. Searches for the `data-testid` attribute. Can be a string for exact match or a RegExp for pattern matching. |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                                                                       |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the element(s) matching the specified test ID. |

### Examples

#### Basic test ID usage

Locate and interact with elements using test IDs:

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

  try {
    await page.setContent(`
      <input type="text" data-testid="username">
      <input type="text" data-testid="email">
      <button data-testid="submit-button">Submit</button>
    `);

    await page.getByTestId('username').fill('FirstLast');
    await page.getByTestId('email').fill('firstlast@example.com');
    await page.getByTestId('submit-button').click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Best practices

1. **Stable identifiers**: Use meaningful, stable test IDs that won't change with refactoring or content updates.

2. **Hierarchical naming**: Use consistent naming conventions like `user-profile-edit-btn`.

3. **Avoid duplicates**: Ensure test IDs are unique within the page to prevent ambiguity.

4. **Strategic placement**: Add test IDs to key interactive elements and components that are frequently tested.

5. **Team coordination**: Establish test ID conventions with your development team to ensure consistency.

### Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by text content
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
