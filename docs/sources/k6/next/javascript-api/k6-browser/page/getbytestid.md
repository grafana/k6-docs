---
title: 'getByTestId(testId)'
description: 'Browser module: page.getByTestId(testId) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytestid-spec.md" version="<K6_VERSION>" >}}

## Examples

### Basic test ID usage

Locate and interact with elements using test IDs:

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
      <input type="text" data-testid="username">
      <input type="text" data-testid="email">
      <button data-testid="submit-button">Submit</button>
    `);

    await page.getByTestId('username').fill('FirstLast');
    await page.getByTestId('email').fill('firstlast@example.com');
    await page.getByTestId('submit-button').click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytestid-tips.md" version="<K6_VERSION>" >}}

## Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytext/) - Locate by text content
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
