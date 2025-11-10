---
title: 'getByAltText(altText[, options])'
description: 'Browser module: locator.getByAltText(altText[, options]) method'
---

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyalttext-spec.md" version="<K6_VERSION>" >}}

## Examples

### Basic alt text matching

Find and click an image by its alt text:

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
    await page.goto('https://quickpizza.grafana.com');

    const logo = page.locator(':root').getByAltText('LOGO');
    await logo.waitFor();

    await logo.click();
    await page.waitForLoadState();
  } finally {
    await page.close();
  }
}
```

### Exact alt text matching

Use exact matching for precise alt text:

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
    await page.goto('https://quickpizza.grafana.com');

    const logo = page.locator(':root').getByAltText('logo', { exact: true });
    await logo.waitFor();

    await logo.click();
    await page.waitForLoadState();
  } finally {
    await page.close();
  }
}
```

### Using regular expressions

Find images using pattern matching:

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
    await page.goto('https://quickpizza.grafana.com');

    const logo = page.locator(':root').getByAltText(/logo/s);
    await logo.waitFor();

    await logo.click();
    await page.waitForLoadState();
  } finally {
    await page.close();
  }
}
```

{{< docs/shared source="k6" lookup="browser/getby-apis/getbyalttext-tips.md" version="<K6_VERSION>" >}}

## Related

- [locator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyrole/) - Locate by ARIA role
- [locator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbylabel/) - Locate by form labels
- [locator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbyplaceholder/) - Locate by placeholder text
- [locator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytestid/) - Locate by test ID
- [locator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytitle/) - Locate by title attribute
- [locator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getbytext/) - Locate by visible text
