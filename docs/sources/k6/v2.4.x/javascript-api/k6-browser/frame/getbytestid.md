---
title: 'getByTestId(testId)'
description: 'Browser module: frame.getByTestId(testId) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytestid-spec.md" version="<K6_VERSION>" >}}

## Examples

### Basic test ID usage

Locate and interact with elements using test IDs:

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

    const frame = page.mainFrame();
    await frame.getByTestId('username').fill('FirstLast');
    await frame.getByTestId('email').fill('firstlast@example.com');
    await frame.getByTestId('submit-button').click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytestid-tips.md" version="<K6_VERSION>" >}}

## Related

- [frame.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyrole/) - Locate by ARIA role
- [frame.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyalttext/) - Locate by alt text
- [frame.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbylabel/) - Locate by form labels
- [frame.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyplaceholder/) - Locate by placeholder text
- [frame.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytext/) - Locate by text content
- [frame.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytitle/) - Locate by title attribute
