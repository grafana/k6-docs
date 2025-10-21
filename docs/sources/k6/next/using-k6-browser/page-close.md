---
title: 'Importance of Page.close in k6 browser'
description: 'The Importance of calling Page.close in k6 browser test'
weight: 01
---
# Page.close in k6 browser

When running k6 browser tests with event-based APIs, such as `page.on`, tests may not always properly flush metrics or clean up resources automatically, which can lead to incomplete metric reporting or leftover event handlers. 
To prevent this, always call `page.close()` at the end of your browser tests. Doing so ensures accurate and complete metric collection, cleans up event listeners to prevent resource leaks, and simplifies test teardown for improved reliability.

## Example

```javascript
import { browser } from "k6/browser";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://quickpizza.grafana.com/";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export default async function () {
  let checkData;
  const page = await browser.newPage();
  try {

    await page.goto(BASE_URL);
    checkData = await page.locator("h1").textContent();
    check(page, {
      header: checkData == "Looking to break out of your pizza routine?",
    });

    await page.locator('//button[. = "Pizza, Please!"]').click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot.png" });
    checkData = await page.locator("div#recommendations").textContent();
    check(page, {
      recommendation: checkData != "",
    });
  } finally {
    //Always close the page at the end
    await page.close();
  }
}
```
