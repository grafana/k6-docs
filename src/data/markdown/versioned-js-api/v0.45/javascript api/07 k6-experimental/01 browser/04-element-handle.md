---
title: "ElementHandle"
excerpt: "Browser module: ElementHandle Class"
---

<BrowserDocsWIP/>

## Supported APIs

| Method | Playwright Relevant Distinctions |
| - |  - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-query-selector" target="_blank" >elementHandle.$(selector)</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-query-selector-all" target="_blank" >elementHandle.$$(selector)</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-bounding-box" target="_blank" >elementHandle.boundingBox()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-check" target="_blank" >elementHandle.check([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-click" target="_blank" >elementHandle.click([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-content-frame" target="_blank" >elementHandle.contentFrame()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-dblclick" target="_blank" >elementHandle.dblclick([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-dispatch-event" target="_blank" >elementHandle.dispatchEvent(type[, eventInit])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-fill" target="_blank" >elementHandle.fill(value[, options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-focus" target="_blank" >elementHandle.focus()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-get-attribute" target="_blank" >elementHandle.getAttribute()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-hover" target="_blank" >elementHandle.hover([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-inner-html" target="_blank" >elementHandle.innerHTML()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-inner-text" target="_blank" >elementHandle.innerText()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-input-value" target="_blank" >elementHandle.inputValue([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-is-checked" target="_blank" >elementHandle.isChecked()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-is-disabled" target="_blank" >elementHandle.isDisabled()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-is-editable" target="_blank" >elementHandle.isEditable()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-is-enabled" target="_blank" >elementHandle.isEnabled()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-is-hidden" target="_blank" >elementHandle.isHidden()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-is-visible" target="_blank" >elementHandle.isVisible()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-owner-frame" target="_blank" >elementHandle.ownerFrame()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-press" target="_blank" >elementHandle.press(key[, options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-screenshot" target="_blank" >elementHandle.screenshot([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-scroll-into-view-if-needed" target="_blank" >elementHandle.scrollIntoViewIfNeeded([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-select-option" target="_blank" >elementHandle.selectOptions(values[, options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-select-text" target="_blank" >elementHandle.selectText([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-set-checked" target="_blank" >elementHandle.setChecked(checked[, options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-tap" target="_blank" >elementHandle.tap([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-text-content" target="_blank" >elementHandle.textContent()</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-type" target="_blank" >elementHandle.type(text[, options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-uncheck" target="_blank" >elementHandle.uncheck([options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-wait-for-element-state" target="_blank" >elementHandle.waitForElementState(state[, options])</a> | - |
| <a href="https://playwright.dev/docs/api/class-elementhandle#element-handle-wait-for-selector" target="_blank" >elementHandle.waitForSelector(selector[, options])</a> | - |

## Examples

<CodeGroup labels={["Fill out a form"]} >

```javascript
import { check } from 'k6';
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch({
    headless: false,
    slowMo: '500ms', // slow down by 500ms
  });
  const context = browser.newContext();
  const page = context.newPage();

  // Goto front page, find login link and click it
  try {
    await page.goto('https://test.k6.io/');
    const messagesLink = page.locator('a[href="/my_messages.php"]');

    await Promise.all([page.waitForNavigation(), messagesLink.click()]);
    // Enter login credentials and login
    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);
    check(page, {
      'header': page => page.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>

<CodeGroup labels={["Check element state"]} >

```javascript
import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export default function () {
  const browser = chromium.launch({
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
