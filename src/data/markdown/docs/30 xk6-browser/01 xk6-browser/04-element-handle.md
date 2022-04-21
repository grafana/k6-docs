---
title: "ElementHandle"
excerpt: "xk6-browser: ElementHandle Class"
---

<BrowserCompatibility/>

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


- [elementHandle.$(selector)](#)
- [elementHandle.$$(selector)](#)
- [elementHandle.$eval()](#)
- [elementHandle.$$eval()](#)
- [elementHandle.boundingBox()](#elementhandle-boundingbox)
- [elementHandle.check([options])](#elementhandle-check-options)
- [elementHandle.click([options])](#elementhandle-click-options)
- [elementHandle.contentFrame()](#elementhandle-contentframe)
- [elementHandle.dblclick([options])](#)
- [elementHandle.dispatchEvent(type[, eventInit])](#)
- [elementHandle.fill(value[, options])](#)
- [elementHandle.focus()](#)
- [elementHandle.getAttribute()](#)
- [elementHandle.hover([options])](#)
- [elementHandle.innerHTML()](#)
- [elementHandle.innerText()](#)
- [elementHandle.innerText()](#)
- [elementHandle.inputValue([options])](#)
- [elementHandle.isChecked()](#)
- [elementHandle.isDisabled()](#)
- [elementHandle.isEditable()](#)
- [elementHandle.isEnabled()](#)
- [elementHandle.isHidden()](#)
- [elementHandle.isVisible()](#)
- [elementHandle.ownerFrame()](#)
- [elementHandle.press(key[, options])](#)
- [elementHandle.screenshot([options])](#)
- [elementHandle.scrollIntoViewIfNeeded([options])](#)
- [elementHandle.selectOptions(values[, options])](#)
- [elementHandle.selectText([options])](#)
- [elementHandle.setChecked(checked[, options])](#)
- [elementHandle.setInputFiles()](#)
- [elementHandle.tap([options])](#)
- [elementHandle.textContent()](#)
- [elementHandle.type(text[, options])](#)
- [elementHandle.uncheck([options])](#)
- [elementHandle.waitForElementState(state[, options])](#)
- [elementHandle.waitForSelector(selector[, options])](#)


## elementHandle.$(selector)
## elementHandle.$$(selector)
## elementHandle.$eval()
## elementHandle.$$eval()
## elementHandle.boundingBox()
## elementHandle.check([options])
## elementHandle.click([options])
## elementHandle.contentFrame()
## elementHandle.dblclick([options])
## elementHandle.dispatchEvent(type[, eventInit])
## elementHandle.fill(value[, options])
## elementHandle.focus()
## elementHandle.getAttribute()
## elementHandle.hover([options])
## elementHandle.innerHTML()
## elementHandle.innerText()
## elementHandle.innerText()
## elementHandle.inputValue([options])
## elementHandle.isChecked()
## elementHandle.isDisabled()
## elementHandle.isEditable()
## elementHandle.isEnabled()
## elementHandle.isHidden()
## elementHandle.isVisible()
## elementHandle.ownerFrame()
## elementHandle.press(key[, options])
## elementHandle.screenshot([options])
## elementHandle.scrollIntoViewIfNeeded([options])
## elementHandle.selectOptions(values[, options])
## elementHandle.selectText([options])
## elementHandle.setChecked(checked[, options])
## elementHandle.setInputFiles()
## elementHandle.tap([options])
## elementHandle.textContent()
## elementHandle.type(text[, options])
## elementHandle.uncheck([options])
## elementHandle.waitForElementState(state[, options])
## elementHandle.waitForSelector(selector[, options])




