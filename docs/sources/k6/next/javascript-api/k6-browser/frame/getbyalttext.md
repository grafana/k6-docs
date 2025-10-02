---
title: 'getByAltText(altText[, options])'
description: 'Browser module: frame.getByAltText(altText[, options]) method'
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

    const logo = page.mainFrame().getByAltText('LOGO');
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

    const logo = page.mainFrame().getByAltText('logo', { exact: true });
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

    const logo = page.mainFrame().getByAltText(/logo/s);
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

- [frame.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyrole/) - Locate by ARIA role
- [frame.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbylabel/) - Locate by form labels
- [frame.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbyplaceholder/) - Locate by placeholder text
- [frame.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytestid/) - Locate by test ID
- [frame.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytitle/) - Locate by title attribute
- [frame.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/getbytext/) - Locate by visible text
