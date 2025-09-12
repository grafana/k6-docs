---
title: 'getByLabel(text[, options])'
description: 'Browser module: page.getByLabel(text[, options]) method'
---

# getByLabel(text[, options])

Returns a locator for form controls associated with the specified label text. This method is ideal for interacting with form elements in an accessible and user-focused way, as it mirrors how users typically identify form fields.

| Parameter       | Type             | Default | Description                                                                                                  |
| --------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `text`          | string \| RegExp | -       | Required. The label text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| `options`       | object           | `null`  |                                                                                                              |
| `options.exact` | boolean          | `false` | Whether to match the label text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

## Returns

| Type                                                                                   | Description                                                                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the form control associated with the specified label. |

## Examples

### Basic form interaction

Fill form fields using their labels:

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
      <label for="username">Username (hint: default)</label>
      <input type="text" id="username" name="username">
      <label for="password">Password (hint: 12345678)</label>
      <input type="password" id="password" name="password">
    `);

    const username = page.getByLabel('Username (hint: default)', { exact: true });
    const password = page.getByLabel(/^Password.*$/);

    await username.fill('default');
    await password.fill('12345678');
  } finally {
    await page.close();
  }
}
```

### Working with different input types

Handle various form control types in various label association patterns:

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
      <label for="username">Username (hint: default)</label>
      <input type="text" id="username" name="username">
      <span id="password-label">Password (hint: 12345678)</span>
      <input type="password" aria-labelledby="password-label">
      <label for="subscribe">Subscribe to newsletter</label>
      <input type="checkbox" id="subscribe" name="subscribe">
      <label for="email">Email</label>
      <input type="radio" id="email" value="email">
      <label for="sms">Text message</label>
      <input type="radio" id="sms" value="sms">
      <label for="theme">Theme</label>
      <select id="theme" name="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <textarea aria-label="Comments"></textarea>
    `);

    // Inputs
    await page.getByLabel('Username (hint: default)', { exact: true }).fill('default');
    await page.getByLabel(/^Password.*$/).fill('12345678');

    // Checkbox
    await page.getByLabel('Subscribe to newsletter').check();

    // Radio button
    await page.getByLabel('Email', { exact: true }).check();

    // Select dropdown
    await page.getByLabel('Theme').selectOption('light');

    // Textarea
    await page.getByLabel('Comments').fill('This is a test comment');
  } finally {
    await page.close();
  }
}
```

## Label association patterns

The `getByLabel()` method works with several HTML patterns for associating labels with form controls:

1. Explicit association with `for` attribute:

   <!-- eslint-skip -->

   ```html
   <label for="username">Username</label> <input type="text" id="username" name="username" />
   ```

1. ARIA labeling:

   <!-- eslint-skip -->

   ```html
   <span id="username-label">Username</span> <input type="text" aria-labelledby="username-label" />
   ```

1. ARIA label attribute:

   <!-- eslint-skip -->

   ```html
   <input type="text" aria-label="Username" />
   ```

## Common use cases

- **Form testing**: Login forms, registration forms, contact forms
- **E-commerce**: Checkout forms, shipping information, payment details
- **Settings pages**: User preferences, account settings, configuration forms
- **Accessibility testing**: Ensuring proper label association and screen reader compatibility

## Best practices

1. **Accessibility-first approach**: Using `getByLabel()` ensures your tests work the same way users with assistive technology interact with forms.
1. **Meaningful labels**: Encourage developers to use descriptive, unique label text that clearly identifies the form control's purpose.
1. **Required field indicators**: When testing required fields, include any visual indicators (like asterisks) in your label text matching.
1. **Form validation testing**: Use labels to test form validation scenarios, as they provide a stable way to identify fields regardless of styling changes.

## Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by text content
