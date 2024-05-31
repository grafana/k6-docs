---
title: 'ElementHandle'
slug: 'elementhandle'
description: 'Browser module: ElementHandle Class'
weight: 04
---

# ElementHandle

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

| Method                                                                                                                                                                   | Description                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [elementHandle.$(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/query)                                         | Queries the element for the given selector.                                                                                                                                                      |
| [elementHandle.$$(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/queryall)                                     | Queries the elements for the given selector.                                                                                                                                                     |
| [elementHandle.boundingBox()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/boundingbox)                                 | Returns the bounding box of the element.                                                                                                                                                         |
| [elementHandle.check([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/check)                                    | Checks the element if it is a `checkbox` or `radio` button.                                                                                                                                      |
| [elementHandle.click([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/click)                                    | Clicks on the element.                                                                                                                                                                           |
| [elementHandle.contentFrame()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/contentframe)                               | Returns the [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame) of the element.                                                                       |
| [elementHandle.dblclick([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/dblclick)                              | Double clicks on the element.                                                                                                                                                                    |
| [elementHandle.dispatchEvent(type[, eventInit])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/dispatchevent)            | Dispatches an event to the element.                                                                                                                                                              |
| [elementHandle.fill(value[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/fill)                               | Fills the specified value into the element.                                                                                                                                                      |
| [elementHandle.focus()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/focus)                                             | Focuses on the element.                                                                                                                                                                          |
| [elementHandle.getAttribute(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/getattribute)                | Returns the specified attribute of the element.                                                                                                                                                  |
| [elementHandle.hover([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/hover)                                    | Hovers over the element.                                                                                                                                                                         |
| [elementHandle.innerHTML()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/innerhtml)                                     | Returns the inner HTML of the element.                                                                                                                                                           |
| [elementHandle.innerText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/innertext)                                     | Returns the inner text of the element.                                                                                                                                                           |
| [elementHandle.inputValue([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/inputvalue)                          | Returns the value of the input element.                                                                                                                                                          |
| [elementHandle.isChecked()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/ischecked)                                     | Checks if the `checkbox` input type is selected.                                                                                                                                                 |
| [elementHandle.isDisabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/isdisabled)                                   | Checks if the element is `disabled`.                                                                                                                                                             |
| [elementHandle.isEditable()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/iseditable)                                   | Checks if the element is `editable`.                                                                                                                                                             |
| [elementHandle.isEnabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/isenabled)                                     | Checks if the element is `enabled`.                                                                                                                                                              |
| [elementHandle.isHidden()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/ishidden/)                                      | Checks if the element is `hidden`.                                                                                                                                                               |
| [elementHandle.isVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/isvisible/)                                    | Checks if the element is `visible`.                                                                                                                                                              |
| [elementHandle.ownerFrame()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/ownerframe)                                   | Returns the [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame) of the element.                                                                       |
| [elementHandle.press(key[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/press)                               | Focuses on the element and presses a single key or a combination of keys using the virtual [keyboard](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/keyboard). |
| [elementHandle.screenshot([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/screenshot)                          | Takes a screenshot of the element.                                                                                                                                                               |
| [elementHandle.scrollIntoViewIfNeeded([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/scrollintoviewifneeded)  | Scrolls the element into view if needed.                                                                                                                                                         |
| [elementHandle.selectOption(values[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/selectoption)              | Selects the `select` element's one or more options which match the values.                                                                                                                       |
| [elementHandle.selectText([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/selecttext)                          | Selects the text of the element.                                                                                                                                                                 |
| [elementHandle.setChecked(checked[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/setchecked)                 | Sets the `checkbox` or `radio` input element's value to the specified checked or unchecked state.                                                                                                |
| [elementHandle.setInputFiles(file[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/setinputfiles)              | Sets the file input element's value to the specified files.                                                                                                                                      |
| [elementHandle.tap(options)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/tap)                                          | Taps the element.                                                                                                                                                                                |
| [elementHandle.textContent()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/textcontent)                                 | Returns the text content of the element.                                                                                                                                                         |
| [elementHandle.type(text[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/type)                                | Focuses on the element and types the specified text into the element using the virtual [keyboard](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/keyboard).     |
| [elementHandle.uncheck([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/uncheck)                                | Unchecks the element if it is a `checkbox` or `radio` button.                                                                                                                                    |
| [elementHandle.waitForElementState(state[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/waitforelementstate) | Waits for the element to reach the specified state.                                                                                                                                              |
| [elementHandle.waitForSelector(selector[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/waitforselector)      | Waits for the element to be present in the DOM and to be visible.                                                                                                                                |

## Examples

{{< code >}}

```javascript
import { check } from 'k6';
import { browser } from 'k6/experimental/browser';

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

  // Goto front page, find login link and click it
  try {
    await page.goto('https://test.k6.io/');
    const messagesLink = await page.$('a[href="/my_messages.php"]');

    await Promise.all([page.waitForNavigation(), messagesLink.click()]);
    // Enter login credentials and login
    await page.$('input[name="login"]').type('admin');
    await page.$('input[name="password"]').type('123');

    const submitButton = await page.$('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);
    const text = await p.$('h2');
    const content = await text.textContent();
    check(page, {
      header: () => text == 'Welcome, admin!',
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

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

export default function () {
  const page = await browser.newPage();

  try {
    // Inject page content
    await page.setContent(`
          <div class="visible">Hello world</div>
          <div style="display:none" class="hidden"></div>
          <div class="editable" editable>Edit me</div>
          <input type="checkbox" enabled class="enabled">
          <input type="checkbox" disabled class="disabled">
          <input type="checkbox" checked class="checked">
          <input type="checkbox" class="unchecked">
    `);

    // Check state
    let el = await page.$('.visible');
    const isVisible = await el.isVisible();

    el = await page.$('.hidden');
    const isHidden = await el.isHidden();

    el = await page.$('.editable');
    const isEditable = await el.isEditable();

    el = await page.$('.enabled');
    const isEnabled = await el.isEnabled();

    el = await page.$('.disabled');
    const isDisabled = await el.isDisabled();

    el = await page.$('.checked');
    const isChecked = await el.isChecked();

    el = await page.$('.unchecked');
    const isUncheckedChecked = await el.isChecked();

    check(page, {
      visible: isVisible,
      hidden: isHidden,
      editable: isEditable,
      enabled: isEnabled,
      disabled: isDisabled,
      checked: isChecked,
      unchecked: isUncheckedChecked === false,
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
