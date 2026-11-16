---
title: 'getByText(text[, options])'
description: 'Browser module: page.getByText(text[, options]) method'
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

    await page.getByText('Pizza, Please!').click();

    const noThanksBtn = page.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytext-tips.md" version="<K6_VERSION>" >}}

## Related

- [page.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyrole/) - Locate by ARIA role
- [page.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyalttext/) - Locate by alt text
- [page.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbylabel/) - Locate by form labels
- [page.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbyplaceholder/) - Locate by placeholder text
- [page.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytestid/) - Locate by test ID
- [page.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/getbytitle/) - Locate by title attribute
