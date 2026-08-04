// Source: docs/sources/k6/next/javascript-api/k6-browser/response/body.md (JavaScript block 1)
// Standalone verification copy of the documentation example.

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
    const res = await page.goto('https://test.k6.io/');

    const body = await res.body();
    const text = new TextDecoder().decode(body);
    console.log(text);
  } finally {
    await page.close();
  }
}
