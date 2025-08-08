---
title: 'getByTitle(title[, options])'
description: 'Browser module: page.getByTitle(title[, options]) method'
---

# getByTitle(title[, options])

Returns a locator for elements with the specified `title` attribute. This method is useful for locating elements that use the `title` attribute to provide additional information, tooltips, or accessibility context.

<TableWithNestedRows>

| Parameter     | Type           | Default | Description                                                                                                  |
| ------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| title         | string\|RegExp | -       | Required. The title text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| options       | object         | `null`  |                                                                                                              |
| options.exact | boolean        | `false` | Whether to match the title text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                                                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the element(s) matching the specified title attribute. |

### Examples

Find and interact with elements by their title attribute:

{{< code >}}

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/0.5.0/index.js';

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
      <button title="Hello World">Hi</button>
      <select title="Favorite Color">
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
      </select>
      <input type="checkbox" title="Check me">
    `);

    await page.getByTitle('Hello World').click();

    await page.getByTitle('Favorite Color').selectOption('Red');

    await page.getByTitle('Check me').check();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Common use cases

**User interface controls:**

- Toolbar buttons and action items
- Navigation controls (previous/next, pagination)
- Media player controls
- Menu and dropdown triggers

**Informational elements:**

- Help icons and tooltips
- Status indicators and badges
- Progress indicators
- Warning and error messages

**Accessibility support:**

- Screen reader descriptions
- Alternative text for complex elements
- Context-sensitive help
- Form field explanations

### Best practices

1. **Meaningful titles**: Ensure title attributes provide clear, helpful information about the element's purpose or content.

2. **Accessibility compliance**: Use titles to enhance accessibility, especially for elements that might not have clear visual labels.

3. **Avoid redundancy**: Don't duplicate visible text in the title attribute unless providing additional context.

4. **Dynamic content**: When testing applications with changing title content, use flexible matching patterns or regular expressions.

5. **Tooltip testing**: Remember that title attributes often create tooltips on hover, which can be useful for UI testing.

6. **Internationalization**: Consider that title text may change in different language versions of your application.

### Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by visible text
