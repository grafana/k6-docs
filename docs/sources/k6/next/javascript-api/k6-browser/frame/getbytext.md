---
title: 'getByText(text[, options])'
description: 'Browser module: frame.getByText(text[, options]) method'
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

    const frame = page.mainFrame();
    await frame.getByText('Pizza, Please!').click();

    const noThanksBtn = frame.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytext-tips.md" version="<K6_VERSION>" >}}

## Related

- [frame.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyrole/) - Locate by ARIA role
- [frame.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyalttext/) - Locate by alt text
- [frame.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbylabel/) - Locate by form labels
- [frame.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyplaceholder/) - Locate by placeholder text
- [frame.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytestid/) - Locate by test ID
- [frame.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytitle/) - Locate by title attribute
