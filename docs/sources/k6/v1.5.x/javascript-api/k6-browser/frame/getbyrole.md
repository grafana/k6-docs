---
title: 'getByRole(role[, options])'
description: 'Browser module: frame.getByRole(role[, options]) method'
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

    const frame = page.mainFrame();
    await frame.getByRole('button', { name: 'Pizza, Please!' }).click();
  } finally {
    page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyrole-tips.md" version="<K6_VERSION>" >}}

## Related

- [frame.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyalttext/) - Locate by alt text
- [frame.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbylabel/) - Locate by form labels
- [frame.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyplaceholder/) - Locate by placeholder text
- [frame.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytestid/) - Locate by test ID
- [frame.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytext/) - Locate by text content
- [frame.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytitle/) - Locate by title attribute
