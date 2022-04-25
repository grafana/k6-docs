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


- [elementHandle.$(selector)](#elementhandle---selector)
- [elementHandle.$$(selector)](#elementhandle----selector)
- [elementHandle.$eval()](#elementhandle--eval)
- [elementHandle.$$eval()](#elementhandle---eval)
- [elementHandle.boundingBox()](#elementhandle-boundingbox)
- [elementHandle.check([options])](#elementhandle-check-options)
- [elementHandle.click([options])](#elementhandle-click-options)
- [elementHandle.contentFrame()](#elementhandle-contentframe)
- [elementHandle.dblclick([options])](#elementhandle-dblclick-options)
- [elementHandle.dispatchEvent(type[, eventInit])](#elementhandle-dispatchevent-type-eventinit)
- [elementHandle.fill(value[, options])](#elementhandle-fill-value-options)
- [elementHandle.focus()](#elementhandle-focus)
- [elementHandle.getAttribute()](#elementhandle-getattribute)
- [elementHandle.hover([options])](#elementhandle-hover-options)
- [elementHandle.innerHTML()](#elementhandle-innerhtml)
- [elementHandle.innerText()](#elementhandle-innertext)
- [elementHandle.inputValue([options])](#elementhandle-inputvalue-options)
- [elementHandle.isChecked()](#elementhandle-ischecked)
- [elementHandle.isDisabled()](#elementhandle-isdisabled)
- [elementHandle.isEditable()](#elementhandle-iseditable)
- [elementHandle.isEnabled()](#elementhandle-isenabled)
- [elementHandle.isHidden()](#elementhandle-ishidden)
- [elementHandle.isVisible()](#elementhandle-isvisible)
- [elementHandle.ownerFrame()](#elementhandle-ownerframe)
- [elementHandle.press(key[, options])](#elementhandle-press-key-options)
- [elementHandle.screenshot([options])](#elementhandle-screenshot-options)
- [elementHandle.scrollIntoViewIfNeeded([options])](#elementhandle-scrollintoviewifneeded-options)
- [elementHandle.selectOptions(values[, options])](#elementhandle-selectoptions-values-options)
- [elementHandle.selectText([options])](#elementhandle-selecttext-options)
- [elementHandle.setChecked(checked[, options])](#elementhandle-setchecked-checked-options)
- [elementHandle.setInputFiles()](#elementhandle-setinputfiles)
- [elementHandle.tap([options])](#elementhandle-tap-options)
- [elementHandle.textContent()](#elementhandle-textcontent)
- [elementHandle.type(text[, options])](#elementhandle-type-text-options)
- [elementHandle.uncheck([options])](#elementhandle-uncheck-options)
- [elementHandle.waitForElementState(state[, options])](#elementhandle-waitforelementstate-state-options)
- [elementHandle.waitForSelector(selector[, options])](#elementhandle-waitforselector-selector-options)


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




