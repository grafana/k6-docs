---
title: 'getByPlaceholder(placeholder[, options])'
description: 'Browser module: page.getByPlaceholder(placeholder[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyplaceholder-spec.md" version="<K6_VERSION>" >}}

## Example

Find and fill inputs by their placeholder text:

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

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyplaceholder-tips.md" version="<K6_VERSION>" >}}

## Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels (preferred for accessibility)
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by visible text
