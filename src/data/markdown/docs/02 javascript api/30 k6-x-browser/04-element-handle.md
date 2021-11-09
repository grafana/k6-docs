---
title: "ElementHandle"
excerpt: "xk6-browser: ElementHandle Class"
---

<BrowserCompatibility/>


## Supported APIs

Support for the [`ElementHandle` Playwright API](https://playwright.dev/docs/api/class-elementhandle) except for the following APIs:

### Missing Playwright APIs

<Glossary>

- [$eval()](https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector)
- [$$eval()](https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector-all)
- [setInputFiles()](https://playwright.dev/docs/api/class-elementhandle#element-handle-set-input-files)

</Glossary>

<BrowserWIP/>

## Examples

<CodeGroup labels={["Fill out a form"]} >

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    headless: false,
    slowMo: '500ms', // slow down by 500ms
  });
  const context = browser.newContext();
  const page = context.newPage();

  // Goto front page, find login link and click it
  page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
  const elem = page.$('a[href="/my_messages.php"]');
  elem.click();

  // Enter login credentials and login
  page.$('input[name="login"]').type('admin');
  page.$('input[name="password"]').type('123');
  page.$('input[type="submit"]').click();

  // Wait for next page to load
  page.waitForLoadState('networkdidle');

  page.close();
  browser.close();
}
```

</CodeGroup>

<CodeGroup labels={["Check element state"]} >

```javascript
import launcher from 'k6/x/browser';
import { check } from 'k6';

export default function () {
  const browser = launcher.launch('chromium', {
    headless: false,
  });
  const context = browser.newContext();
  const page = context.newPage();

  // Inject page content
  page.setContent(`
        <div class="visible">Hello world</div>
        <div style="display:none" class="hidden"></div>
        <div class="editable" editable>Edit me</div>
        <input type="checkbox" enabled class="enabled">
        <input type="checkbox" disabled class="disabled">
        <input type="checkbox" checked class="checked">
        <input type="checkbox" class="unchecked">
    `);

  // Check state
  check(page, {
    visible: (p) => p.$('.visible').isVisible(),
    hidden: (p) => p.$('.hidden').isHidden(),
    editable: (p) => p.$('.editable').isEditable(),
    enabled: (p) => p.$('.enabled').isEnabled(),
    disabled: (p) => p.$('.disabled').isDisabled(),
    checked: (p) => p.$('.checked').isChecked(),
    unchecked: (p) => p.$('.unchecked').isChecked() === false,
  });

  page.close();
  browser.close();
}
```

</CodeGroup>


<BrowserClassList/>