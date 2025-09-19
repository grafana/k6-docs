---
title: 'getByTestId(testId)'
description: 'Browser module: frameLocator.getByTestId(testId) method'
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
    const iframeHTML = `
      <input type="text" data-testid="username">
      <input type="text" data-testid="email">
      <button data-testid="submit-button">Submit</button>
    `;

    await page.setContent(`
      <iframe id="my_frame" src="data:text/html,${encodeURIComponent(iframeHTML)}"></iframe>
    `);

    const frameLocator = page.locator("#my_frame").contentFrame();
    await frameLocator.getByTestId('username').fill('FirstLast');
    await frameLocator.getByTestId('email').fill('firstlast@example.com');
    await frameLocator.getByTestId('submit-button').click();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbytestid-tips.md" version="<K6_VERSION>" >}}

## Related

- [frameLocator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyrole/) - Locate by ARIA role
- [frameLocator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyalttext/) - Locate by alt text
- [frameLocator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbylabel/) - Locate by form labels
- [frameLocator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyplaceholder/) - Locate by placeholder text
- [frameLocator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytext/) - Locate by text content
- [frameLocator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytitle/) - Locate by title attribute
