---
title: 'getByPlaceholder(placeholder[, options])'
description: 'Browser module: page.getByPlaceholder(placeholder[, options]) method'
---

# getByPlaceholder(placeholder[, options])

Returns a locator for input elements with the specified `placeholder` attribute. This method is useful for locating form fields that use `placeholder` attribute to provide hints or examples to users about the expected input format.

<TableWithNestedRows>

| Parameter     | Type           | Default | Description                                                                                                        |
| ------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| placeholder   | string\|RegExp | -       | Required. The placeholder text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| options       | object         | `null`  |                                                                                                                    |
| options.exact | boolean        | `false` | Whether to match the placeholder text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                                                                                      |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the input element(s) matching the specified placeholder text. |

### Examples

Find and fill inputs by their placeholder text:

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
      <input type="text" placeholder="First name">
      <input type="text" placeholder="Last name">
      <input type="text" placeholder="dd/mm/yyyy">
      <input type="text" placeholder="your.email@example.com">
      <input type="text" placeholder="+1 (555) 123-4567">
    `);

    await page.getByPlaceholder('First name').fill('First');
    await page.getByPlaceholder('Last name').fill('Last');
    await page.getByPlaceholder('dd/mm/yyyy').fill('01/01/1990');

    await page.getByPlaceholder('your.email@example.com').fill('first.last@example.com');
    await page.getByPlaceholder('+1 (555) 123-4567').fill('+1 (555) 987-6543');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Common use cases

**Form field identification:**

- Login and registration forms without explicit labels
- Quick search boxes
- Filter and input controls
- Comment and feedback forms

**E-commerce:**

- Product search bars
- Quantity input fields
- Promo code entry
- Address and payment information

**Interactive applications:**

- Chat input fields
- Command input interfaces
- Settings and configuration forms
- Data entry applications

### Best practices

1. **Complement, don't replace labels**: Placeholder text should supplement, not replace proper form labels for accessibility.

2. **Use descriptive placeholders**: Ensure placeholder text clearly indicates the expected input format or content.

3. **Consider internationalization**: When testing multi-language applications, be aware that placeholder text may change.

4. **Accessibility considerations**: Remember that placeholder text alone may not be sufficient for users with disabilities.

### Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels (preferred for accessibility)
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by visible text
