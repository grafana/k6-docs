---
title: 'getByTitle(title[, options])'
description: 'Browser module: locator.getByTitle(title[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytitle-spec.md" version="<K6_VERSION>" >}}

## Examples

Find and interact with elements by their title attribute:

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
      <button title="Hello World">Hi</button>
      <select title="Favorite Color">
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
      </select>
      <input type="checkbox" title="Check me">
    `);

    const locator = page.locator(':root');

    await locator.getByTitle('Hello World').click();

    await locator.getByTitle('Favorite Color').selectOption('Red');

    await locator.getByTitle('Check me').check();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytitle-tips.md" version="<K6_VERSION>" >}}

## Related

- [locator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyrole/) - Locate by ARIA role
- [locator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyalttext/) - Locate by alt text
- [locator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbylabel/) - Locate by form labels
- [locator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyplaceholder/) - Locate by placeholder text
- [locator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytestid/) - Locate by test ID
- [locator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytext/) - Locate by visible text
