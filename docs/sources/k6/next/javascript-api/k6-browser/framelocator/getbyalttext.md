---
title: 'getByAltText(altText[, options])'
description: 'Browser module: frameLocator.getByAltText(altText[, options]) method'
---

# getByAltText(altText[, options])

Returns a locator for elements with the specified alt text. This method is useful for locating images and other elements that have an `alt` attribute, making your tests more accessible and user-focused.

| Parameter       | Type             | Default | Description                                                                                                |
| --------------- | ---------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `altText`       | string \| RegExp | -       | Required. The alt text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| `options`       | object           | `null`  |                                                                                                            |
| `options.exact` | boolean          | `false` | Whether to match the alt text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

## Returns

| Type                                                                                   | Description                                                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with elements matching the specified alt text. |

## Examples

### Basic alt text matching

Find and click an image by its alt text:

<!-- md-k6:skip -->

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
    await page.setContent(`
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const logo = page.locator('#my_frame').contentFrame().getByAltText('LOGO');
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

<!-- md-k6:skip -->

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
    await page.setContent(`
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const logo = page.locator('#my_frame').contentFrame().getByAltText('logo', { exact: true });
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

<!-- md-k6:skip -->

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
    await page.setContent(`
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const logo = page.locator('#my_frame').contentFrame().getByAltText(/logo/s);
    await logo.waitFor();

    await logo.click();
    await page.waitForLoadState();
  } finally {
    await page.close();
  }
}
```

## Common use cases

- **Image testing:**
  - Testing image alt text for accessibility compliance
  - Interacting with clickable images/banners
- **Accessibility testing:**
  - Ensuring all images have meaningful alt text
  - Testing screen reader compatibility
  - Validating WCAG compliance
- **UI interaction:**
  - Clicking on logo images to navigate home
  - Selecting images in galleries or carousels
  - Interacting with image-based buttons

## Best practices

1. **Use descriptive alt text**: When creating tests, ensure your application uses meaningful alt text that describes the image content or function.
1. **Prefer exact matches**: Use `exact: true` when you need precise matching to avoid false positives.
1. **Accessibility-first**: Using `getByAltText()` encourages better accessibility practices by ensuring images have proper alt attributes.
1. **Regular expressions for patterns**: Use RegExp for flexible matching when dealing with dynamic or numbered content.
1. **Combine with assertions**: Always verify that the located elements behave as expected using assertions.

## Related

- [frameLocator.getByRole()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyrole/) - Locate by ARIA role
- [frameLocator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbylabel/) - Locate by form labels
- [frameLocator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyplaceholder/) - Locate by placeholder text
- [frameLocator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytestid/) - Locate by test ID
- [frameLocator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytitle/) - Locate by title attribute
- [frameLocator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytext/) - Locate by visible text
