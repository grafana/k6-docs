---
title: 'getByLabel(text[, options])'
description: 'Browser module: page.getByLabel(text[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbylabel-spec.md" version="<K6_VERSION>" >}}

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

{{< docs/shared source="k6" lookup="browser/getby-apis/getbylabel-tips.md" version="<K6_VERSION>" >}}

## Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by text content
