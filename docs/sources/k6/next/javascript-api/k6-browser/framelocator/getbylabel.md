---
title: 'getByLabel(text[, options])'
description: 'Browser module: frameLocator.getByLabel(text[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbylabel-spec.md" version="<K6_VERSION>" >}}

## Examples

### Basic form interaction

Fill form fields using their labels:

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
    const iframeHTML = `
      <label for="username">Username (hint: default)</label>
      <input type="text" id="username" name="username">
      <label for="password">Password (hint: 12345678)</label>
      <input type="password" id="password" name="password">
    `;

    await page.setContent(`
      <iframe id="my_frame" src="data:text/html,${encodeURIComponent(iframeHTML)}"></iframe>
    `);

    const frameLocator = page.locator("#my_frame").contentFrame();
    const username = frameLocator.getByLabel('Username (hint: default)', { exact: true });
    const password = frameLocator.getByLabel(/^Password.*$/);

    await username.fill('default');
    await password.fill('12345678');
  } finally {
    await page.close();
  }
}
```

### Working with different input types

Handle various form control types in various label association patterns:

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
    const iframeHTML = `
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
    `;

    await page.setContent(`
      <iframe id="my_frame" src="data:text/html,${encodeURIComponent(iframeHTML)}"></iframe>
    `);

    const frameLocator = page.locator("#my_frame").contentFrame();

    // Inputs
    await frameLocator.getByLabel('Username (hint: default)', { exact: true }).fill('default');
    await frameLocator.getByLabel(/^Password.*$/).fill('12345678');

    // Checkbox
    await frameLocator.getByLabel('Subscribe to newsletter').check();

    // Radio button
    await frameLocator.getByLabel('Email', { exact: true }).check();

    // Select dropdown
    await frameLocator.getByLabel('Theme').selectOption('light');

    // Textarea
    await frameLocator.getByLabel('Comments').fill('This is a test comment');
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbylabel-tips.md" version="<K6_VERSION>" >}}

## Related

- [frameLocator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyrole/) - Locate by ARIA role
- [frameLocator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyalttext/) - Locate by alt text
- [frameLocator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyplaceholder/) - Locate by placeholder text
- [frameLocator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytestid/) - Locate by test ID
- [frameLocator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytitle/) - Locate by title attribute
- [frameLocator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytext/) - Locate by text content
