---
title: 'getByPlaceholder(placeholder[, options])'
description: 'Browser module: frame.getByPlaceholder(placeholder[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyplaceholder-spec.md" version="<K6_VERSION>" >}}

## Example

Find and fill inputs by their placeholder text:

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

    const frame = page.mainFrame();
    await frame.getByPlaceholder('First name').fill('First');
    await frame.getByPlaceholder('Last name').fill('Last');
    await frame.getByPlaceholder('dd/mm/yyyy').fill('01/01/1990');

    await frame.getByPlaceholder('your.email@example.com').fill('first.last@example.com');
    await frame.getByPlaceholder('+1 (555) 123-4567').fill('+1 (555) 987-6543');
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyplaceholder-tips.md" version="<K6_VERSION>" >}}

## Related

- [frame.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyrole/) - Locate by ARIA role
- [frame.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyalttext/) - Locate by alt text
- [frame.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbylabel/) - Locate by form labels (preferred for accessibility)
- [frame.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytestid/) - Locate by test ID
- [frame.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytitle/) - Locate by title attribute
- [frame.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytext/) - Locate by visible text
