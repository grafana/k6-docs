---
title: 'getByText(text[, options])'
description: 'Browser module: frameLocator.getByText(text[, options]) method'
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
    await page.setContent(`
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const frameLocator = page.locator('#my_frame').contentFrame();
    await frameLocator.getByText('Pizza, Please!').click();

    const noThanksBtn = frameLocator.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytext-tips.md" version="<K6_VERSION>" >}}

## Related

- [frameLocator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyrole/) - Locate by ARIA role
- [frameLocator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyalttext/) - Locate by alt text
- [frameLocator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbylabel/) - Locate by form labels
- [frameLocator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyplaceholder/) - Locate by placeholder text
- [frameLocator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytestid/) - Locate by test ID
- [frameLocator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytitle/) - Locate by title attribute
