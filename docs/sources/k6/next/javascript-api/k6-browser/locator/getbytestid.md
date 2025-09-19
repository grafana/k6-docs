---
title: 'getByTestId(testId)'
description: 'Browser module: locator.getByTestId(testId) method'
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

    const locator = page.locator(':root');
    await locator.getByTestId('username').fill('FirstLast');
    await locator.getByTestId('email').fill('firstlast@example.com');
    await locator.getByTestId('submit-button').click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytestid-tips.md" version="<K6_VERSION>" >}}

## Related

- [locator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyrole/) - Locate by ARIA role
- [locator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyalttext/) - Locate by alt text
- [locator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbylabel/) - Locate by form labels
- [locator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyplaceholder/) - Locate by placeholder text
- [locator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytext/) - Locate by text content
- [locator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytitle/) - Locate by title attribute
