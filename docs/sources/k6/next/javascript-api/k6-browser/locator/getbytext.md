---
title: 'getByText(text[, options])'
description: 'Browser module: locator.getByText(text[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytext-spec.md" version="<K6_VERSION>" >}}

## Examples

Find and click elements by their visible text:

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
    await locator.getByText('Pizza, Please!').click();

    const noThanksBtn = locator.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytext-tips.md" version="<K6_VERSION>" >}}

## Related

- [locator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyrole/) - Locate by ARIA role
- [locator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyalttext/) - Locate by alt text
- [locator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbylabel/) - Locate by form labels
- [locator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyplaceholder/) - Locate by placeholder text
- [locator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytestid/) - Locate by test ID
- [locator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytitle/) - Locate by title attribute
