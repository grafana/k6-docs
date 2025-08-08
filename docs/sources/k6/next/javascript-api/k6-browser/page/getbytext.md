---
title: 'getByText(text[, options])'
description: 'Browser module: page.getByText(text[, options]) method'
---

# getByText(text[, options])

Returns a locator for elements containing the specified text. This method finds elements by their visible text content, making it ideal for locating user-facing content like buttons, links, headings, and other text elements.

<TableWithNestedRows>

| Parameter     | Type           | Default | Description                                                                                                 |
| ------------- | -------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| text          | string\|RegExp | -       | Required. The text content to search for. Can be a string for exact match or a RegExp for pattern matching. |
| options       | object         | `null`  |                                                                                                             |
| options.exact | boolean        | `false` | Whether to match the text exactly with case sensitivity. When `true`, performs a case-sensitive match.      |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                                                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the element(s) containing the specified text. |

### Examples

Find and click elements by their visible text:

{{< code >}}

<!-- md-k6:skip -->

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
    await page.goto('https://quickpizza.grafana.com/');

    await page.getByText('Pizza, Please!').click();

    const noThanksBtn = page.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Text matching behavior

**Whitespace normalization**: Text matching automatically normalizes whitespace, meaning:

- Multiple spaces become single spaces
- Line breaks become spaces
- Leading and trailing whitespace is ignored

Consider the following DOM structure:

{{< code >}}

<!-- md-k6:skip -->
<!-- eslint-skip -->

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

{{< /code >}}

You can locate by text substring, exact string, or a regular expression:

{{< code >}}

<!-- md-k6:skip -->
<!-- eslint-skip -->

```js
// Matches <span>
page.getByText('world');
// Matches first <div>
page.getByText('Hello world');
// Matches second <div>
page.getByText('Hello', { exact: true });
// Matches both <div>s
page.getByText(/Hello/);
// Matches second <div>
page.getByText(/^hello$/i);
```

{{< /code >}}

### Common use cases

- **Button interactions**: Submit, Cancel, Delete, Edit buttons
- **Navigation**: Menu items, breadcrumbs, pagination links
- **Content verification**: Success messages, error messages, headings
- **Form interactions**: Checkbox labels, radio button options
- **Status indicators**: Active, Inactive, Pending states

### Best practices

1. **User-focused testing**: Using `getByText()` ensures your tests interact with content as users see it.

2. **Avoid brittle text**: Be cautious with exact text that might change frequently (like dates, counts, or user-generated content).

3. **Use meaningful text**: Prefer descriptive button text and labels over generic terms like "Click here" or "Button".

4. **Handle dynamic content**: Use regular expressions for text that contains variable parts (timestamps, user names, counts).

5. **Consider accessibility**: Text-based selection encourages better accessibility practices in your application.

6. **Internationalization**: For multi-language applications, consider using test IDs or roles instead of text for critical interactions.

### Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
