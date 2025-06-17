---
title: "Locator"
description: "Browser module: Locator Class"
weight: 08
weight: 08
---

# Locator

The Locator API makes it easier to work with dynamically changing elements. Some of the benefits of using it over existing ways to locate an element (e.g. `Page.$()`) include:

- Helps with writing robust tests by finding an element even if the underlying frame navigates.
- Makes it easier to work with dynamic web pages and SPAs built with Svelte, React, Vue, etc.
- Enables the use of test abstractions like the Page Object Model (POM) pattern to simplify and organize tests.
- `strict` mode is enabled for all `locator` methods, which means that if more than one element matches the given selector it will throw an error.

Locator can be created with the [page.locator(selector[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/locator) method.

| Method                                                                                                                                                 | Description                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [check([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/check) {{< docs/bwipt id="471" >}}                       | Select the input checkbox.                                                                                              |
| [clear([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/clear)                                                   | Clears text boxes and input fields of any existing values.                                                              |
| [click([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/click) {{< docs/bwipt id="471" >}}                       | Mouse click on the chosen element.                                                                                      |
| [dblclick([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/dblclick) {{< docs/bwipt id="471" >}}                 | Mouse double click on the chosen element.                                                                               |
| [dispatchEvent(type, eventInit, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/dispatchevent)                  | Dispatches HTML DOM event types e.g. `'click'`.                                                                         |
| [fill(value, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/fill)                                              | Fill an `input`, `textarea` or `contenteditable` element with the provided value.                                       |
| [first()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/first)                                                            | Returns `locator` to the first matching element.                                                                        |
| [focus([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/focus)                                                   | Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element, if it can be focused. |
| [getAttribute(name, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getattribute)                               | Returns the element attribute value for the given attribute name.                                                       |
| [hover([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/hover) {{< docs/bwipt id="471" >}}                       | Hovers over the element.                                                                                                |
| [innerHTML([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/innerhtml)                                           | Returns the `element.innerHTML`.                                                                                        |
| [innerText([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/innertext)                                           | Returns the `element.innerText`.                                                                                        |
| [inputValue([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/inputvalue)                                         | Returns `input.value` for the selected `input`, `textarea` or `select` element.                                         |
| [isChecked([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/ischecked)                                           | Checks if the `checkbox` `input` type is selected.                                                                      |
| [isDisabled([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/isdisabled)                                         | Checks if the element is `disabled`.                                                                                    |
| [isEditable([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/iseditable)                                         | Checks if the element is `editable`.                                                                                    |
| [isEnabled([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/isenabled)                                           | Checks if the element is `enabled`.                                                                                     |
| [isHidden()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/ishidden)                                                      | Checks if the element is `hidden`.                                                                                      |
| [isVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/isvisible)                                                    | Checks if the element is `visible`.                                                                                     |
| [last()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/last)                                                              | Returns `locator` to the last matching element.                                                                         |
| [nth()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/nth)                                                                | Returns `locator` to the n-th matching element.                                                                         |
| [press(key, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/press)                                              | Press a single key on the keyboard or a combination of keys.                                                            |
| [selectOption(values, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/selectoption) {{< docs/bwipt id="470" >}} | Select one or more options which match the values.                                                                      |
| [setChecked(checked[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/setchecked)                                | Sets the `checkbox` or `radio` input element's value to the specified checked or unchecked state.                       |
| [tap([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/tap) {{< docs/bwipt id="471" >}}                           | Tap on the chosen element.                                                                                              |
| [textContent([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/textcontent)                                       | Returns the `element.textContent`.                                                                                      |
| [type(text, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/type)                                               | Type in the text into the input field.                                                                                  |
| [uncheck([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/uncheck) {{< docs/bwipt id="471" >}}                   | Unselect the `input` checkbox.                                                                                          |
| [waitFor([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/waitfor) {{< docs/bwipt id="472" >}}                   | Wait for the element to be in a particular state e.g. `visible`.                                                        |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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

  try {
    await page.goto('https://test.k6.io/flip_coin.php');

    /*
    In this example, we will use two locators, matching a
    different betting button on the page. If you were to query
    the buttons once and save them as below, you would see an
    error after the initial navigation. Try it!
  
      const heads = await page.$("input[value='Bet on heads!']");
      const tails = await page.$("input[value='Bet on tails!']");
  
    The Locator API allows you to get a fresh element handle each
    time you use one of the locator methods. And, you can carry a
    locator across frame navigations. Let's create two locators;
    each locates a button on the page.
    */
    const heads = page.locator("input[value='Bet on heads!']");
    const tails = page.locator("input[value='Bet on tails!']");

    const currentBet = page.locator("//p[starts-with(text(),'Your bet: ')]");

    // In the following Promise.all the tails locator clicks
    // on the tails button by using the locator's selector.
    // Since clicking on each button causes page navigation,
    // waitForNavigation is needed -- this is because the page
    // won't be ready until the navigation completes.
    // Setting up the waitForNavigation first before the click
    // is important to avoid race conditions.
    await Promise.all([page.waitForNavigation(), tails.click()]);
    console.log(await currentBet.innerText());
    // the heads locator clicks on the heads button
    // by using the locator's selector.
    await Promise.all([page.waitForNavigation(), heads.click()]);
    console.log(await currentBet.innerText());
    await Promise.all([page.waitForNavigation(), tails.click()]);
    console.log(await currentBet.innerText());
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
