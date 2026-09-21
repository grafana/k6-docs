---
title: 'getByRole(role[, options])'
description: 'Browser module: locator.getByRole(role[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyrole-spec.md" version="<K6_VERSION>" >}}

## Examples

### Basic role selection

Find and click a button by its role:

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
    await page.goto('https://quickpizza.grafana.com/');

    const locator = page.locator(':root');
    await locator.getByRole('button', { name: 'Pizza, Please!' }).click();
  } finally {
    page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyrole-tips.md" version="<K6_VERSION>" >}}

## Related

- [locator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyalttext/) - Locate by alt text
- [locator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbylabel/) - Locate by form labels
- [locator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyplaceholder/) - Locate by placeholder text
- [locator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytestid/) - Locate by test ID
- [locator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytext/) - Locate by text content
- [locator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytitle/) - Locate by title attribute
