---
title: 'getByLabel(text[, options])'
description: 'Browser module: locator.getByLabel(text[, options]) method'
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

    const locator = page.locator(':root');
    const username = locator.getByLabel('Username (hint: default)', { exact: true });
    const password = locator.getByLabel(/^Password.*$/);

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

    const locator = page.locator(':root');

    // Inputs
    await locator.getByLabel('Username (hint: default)', { exact: true }).fill('default');
    await locator.getByLabel(/^Password.*$/).fill('12345678');

    // Checkbox
    await locator.getByLabel('Subscribe to newsletter').check();

    // Radio button
    await locator.getByLabel('Email', { exact: true }).check();

    // Select dropdown
    await locator.getByLabel('Theme').selectOption('light');

    // Textarea
    await locator.getByLabel('Comments').fill('This is a test comment');
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbylabel-tips.md" version="<K6_VERSION>" >}}

## Related

- [locator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyrole/) - Locate by ARIA role
- [locator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyalttext/) - Locate by alt text
- [locator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyplaceholder/) - Locate by placeholder text
- [locator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytestid/) - Locate by test ID
- [locator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytitle/) - Locate by title attribute
- [locator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytext/) - Locate by text content
