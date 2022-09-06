---
title: "Locator"
excerpt: "xk6-browser: Locator Class"
---

The Locator API makes it easier to work with dynamically changing elements. Some of the benefits of using it over existing ways to locate an element (e.g. `Page.$()`) include:

- Helps with writing robust tests by finding an element even if the underlying frame navigates.
- Makes it easier to work with dynamic web pages and SPAs built with Svelte, React, Vue, etc.
- Enables the use of test abstractions like the Page Object Model (POM) pattern to simplify and organize tests.
- `strict` mode is enabled for all `locator` methods, which means that if more than one element matches the given selector it will throw an error.

Locator can be created with the [page.locator(selector[, options])](/javascript-api/xk6-browser/page/#page-locator) method.

| Method                                                                                                        | Description                                                                                                                |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| [locator.check([options])](/javascript-api/xk6-browser/locator/check) <BWIPT id="471"/>                       | Select the input checkbox.                                                                                                 |
| [locator.click([options])](/javascript-api/xk6-browser/locator/click) <BWIPT id="471"/>                       | Mouse click on the chosen element.                                                                                        |
| [locator.dblclick([options])](/javascript-api/xk6-browser/locator/dblclick) <BWIPT id="469"/>                 | Mouse double click on the chosen element.                                                                                 |
| [locator.dispatchEvent(type, eventInit, [options])](/javascript-api/xk6-browser/locator/dispatchevent)        | Dispatches HTML DOM event types e.g. `'click'`.                                                                              |
| [locator.fill(value, [options])](/javascript-api/xk6-browser/locator/fill)                                    | Fill an `input`, `textarea` or `contenteditable` element with the provided value.                                          |
| [locator.focus([options])](/javascript-api/xk6-browser/locator/focus)                                         | Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element, if it can be focused. |
| [locator.getAttribute(name, [options])](/javascript-api/xk6-browser/locator/getattribute)                     | Returns the element attribute value for the given attribute name.                                                          |
| [locator.hover([options])](/javascript-api/xk6-browser/locator/hover) <BWIPT id="471"/>                       | Hovers over the element.                                                                                                   |
| [locator.innerHTML([options])](/javascript-api/xk6-browser/locator/innerhtml)                                 | Returns the `element.innerHTML`.                                                                                           |
| [locator.innerText([options])](/javascript-api/xk6-browser/locator/innertext)                                 | Returns the `element.innerText`.                                                                                           |
| [locator.inputValue([options])](/javascript-api/xk6-browser/locator/inputvalue)                               | Returns `input.value` for the selected `input`, `textarea` or `select` element.                                            |
| [locator.isChecked([options])](/javascript-api/xk6-browser/locator/ischecked)                                 | Checks if the `checkbox` `input` type is selected.                                                                         |
| [locator.isDisabled([options])](/javascript-api/xk6-browser/locator/isdisabled)                               | Checks if the element is `disabled`.                                                                                       |
| [locator.isEditable([options])](/javascript-api/xk6-browser/locator/iseditable)                               | Checks if the element is `editable`.                                                                                       |
| [locator.isEnabled([options])](/javascript-api/xk6-browser/locator/isenabled)                                 | Checks if the element is `enabled`.                                                                                        |
| [locator.isHidden([options])](/javascript-api/xk6-browser/locator/ishidden)                                   | Checks if the element is `hidden`.                                                                                         |
| [locator.isVisible([options])](/javascript-api/xk6-browser/locator/isvisible)                                 | Checks if the element is `visible`.                                                                                        |
| [locator.press(key, [options])](/javascript-api/xk6-browser/locator/press)                                    | Press a single key on the keyboard or a combination of keys.                                                               |
| [locator.selectOption(values, [options])](/javascript-api/xk6-browser/locator/selectoption) <BWIPT id="470"/> | Select one or more options which match the values.                                                                         |
| [locator.tap([options])](/javascript-api/xk6-browser/locator/tap) <BWIPT id="471"/>                           | Tap on the chosen element.                                                                                                |
| [locator.textContent([options])](/javascript-api/xk6-browser/locator/textcontent)                             | Returns the `element.textContent`.                                                                                         |
| [locator.type(text, [options])](/javascript-api/xk6-browser/locator/type)                                     | Type in the text into the input field.                                                                                     |
| [locator.uncheck([options])](/javascript-api/xk6-browser/locator/uncheck) <BWIPT id="471"/>                   | Unselect the `input` checkbox.                                                                                             |
| [locator.waitFor([options])](/javascript-api/xk6-browser/locator/waitfor) <BWIPT id="472"/>                   | Wait for the element to be in a particular state e.g. `visible`.                                                           |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import launcher from "k6/x/browser";

export default function () {
  const browser = launcher.launch('chromium', {
    headless: false,
  });
  const context = browser.newContext();
  const page = context.newPage();
  page.goto("https://test.k6.io/flip_coin.php", {
    waitUntil: "networkidle",
  });

  /*
  In this example, we will use two locators, matching a
  different betting button on the page. If you were to query
  the buttons once and save them as below, you would see an
  error after the initial navigation. Try it!

    const heads = page.$("input[value='Bet on heads!']");
    const tails = page.$("input[value='Bet on tails!']");

  The Locator API allows you to get a fresh element handle each
  time you use one of the locator methods. And, you can carry a
  locator across frame navigations. Let's create two locators;
  each locates a button on the page.
  */
  const heads = page.locator("input[value='Bet on heads!']");
  const tails = page.locator("input[value='Bet on tails!']");

  const currentBet = page.locator("//p[starts-with(text(),'Your bet: ')]");

  // the tails locator clicks on the tails button by using the
  // locator's selector.
  tails.click();
  // Since clicking on each button causes page navigation,
  // waitForNavigation is needed. It's because the page
  // won't be ready until the navigation completes.
  page.waitForNavigation();
  console.log(currentBet.innerText());

  // the heads locator clicks on the heads button by using the
  // locator's selector.
  heads.click();
  page.waitForNavigation();
  console.log(currentBet.innerText());

  tails.click();
  page.waitForNavigation();
  console.log(currentBet.innerText());

  page.close();
  browser.close();
}
```

</CodeGroup>
