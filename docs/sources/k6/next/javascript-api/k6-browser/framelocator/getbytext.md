---
title: 'getByText(text[, options])'
description: 'Browser module: frameLocator.getByText(text[, options]) method'
---

# getByText(text[, options])

Returns a locator for elements containing the specified text. This method finds elements by their visible text content, making it ideal for locating user-facing content like buttons, links, headings, and other text elements.

| Parameter       | Type             | Default | Description                                                                                                 |
| --------------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `text`          | string \| RegExp | -       | Required. The text content to search for. Can be a string for exact match or a RegExp for pattern matching. |
| `options`       | object           | `null`  |                                                                                                             |
| `options.exact` | boolean          | `false` | Whether to match the text exactly with case sensitivity. When `true`, performs a case-sensitive match.      |

## Returns

| Type                                                                                   | Description                                                                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the elements containing the specified text. |

## Examples

Find and click elements by their visible text:

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
    await page.setContent(`
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const frameLocator = page.locator('#my_frame').contentFrame();
    await frameLocator.getByText('Pizza, Please!').click();

    const noThanksBtn = frameLocator.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

## Text matching behavior

**Whitespace normalization**: Text matching automatically normalizes whitespace, meaning:

- Multiple spaces become single spaces
- Line breaks become spaces
- Leading and trailing whitespace is ignored

Consider the following DOM structure:

<!-- md-k6:skip -->
<!-- eslint-skip -->

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

<!-- md-k6:skip -->
<!-- eslint-skip -->

```js
// Matches <span>
frameLocator.getByText('world');
// Matches first <div>
frameLocator.getByText('Hello world');
// Matches second <div>
frameLocator.getByText('Hello', { exact: true });
// Matches both <div>s
frameLocator.getByText(/Hello/);
// Matches second <div>
frameLocator.getByText(/^hello$/i);
```

## Common use cases

- **Button interactions**: Submit, Cancel, Delete, Edit buttons
- **Navigation**: Menu items, breadcrumbs, pagination links
- **Content verification**: Success messages, error messages, headings
- **Form interactions**: Checkbox labels, radio button options
- **Status indicators**: Active, Inactive, Pending states

## Best practices

1. **User-focused testing**: Using `getByText()` ensures your tests interact with content as users see it.
1. **Avoid brittle text**: Be cautious with exact text that might change frequently (like dates, counts, or user-generated content).
1. **Use meaningful text**: Prefer descriptive button text and labels over generic terms like "Click here" or "Button".
1. **Handle dynamic content**: Use regular expressions for text that contains variable parts (timestamps, user names, counts).
1. **Consider accessibility**: Text-based selection encourages better accessibility practices in your application.
1. **Internationalization**: For multi-language applications, consider using test IDs or roles instead of text for critical interactions.

## Related

- [frameLocator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyrole/) - Locate by ARIA role
- [frameLocator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyalttext/) - Locate by alt text
- [frameLocator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbylabel/) - Locate by form labels
- [frameLocator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyplaceholder/) - Locate by placeholder text
- [frameLocator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytestid/) - Locate by test ID
- [frameLocator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytitle/) - Locate by title attribute
