---
aliases:
  - ./migrating-to-k6-v0-46/ # docs/k6/<K6_VERSION>/using-k6-browser/migrating-to-k6-v0-46
title: 'Migrating browser scripts to k6 v0.52'
description: 'A migration guide to ease the process of transitioning to the new k6 browser module version bundled with k6 v0.52'
weight: 05
---

# Migrating browser scripts to k6 v0.52

This guide outlines the key changes you will need to make when moving your existing k6 experimental browser test scripts to the _latest_ [k6 browser module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser) version bundled with [k6 0.52](https://github.com/grafana/k6/releases/tag/v0.52.0).

## Key changes

In the latest release of k6, we have graduated k6 browser module out of experimental and is now under the import `k6/browser`. Migrating to this is a breaking change that will affect _all scripts_ that use the experimental k6 browser module. The breaking changes are:

1. Converted most of the k6 browser module APIs to asynchronous (async) APIs. That means they will return a `promise` that will `resolve` to a value when the API call succeeds or `reject` when an error occurs.
2. A side effect of making this async changes is that you will need to use a workaround to work with the k6 [check](http://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check/) API.
3. Finally, it's also worth reiterating that the [group](http://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group/) API still doesn't work with async APIs.

If you are interested in the rationale behind this change, refer to the [v0.51 release notes](https://github.com/grafana/k6/releases/tag/v0.51.0).

{{% admonition type="note" %}}

The experimental import (`k6/experimental/browser`) and the corresponding synchronous APIs will be supported up until the 23rd of September 2024.

{{% /admonition %}}

## Migrating to async

To ensure your scripts work with the latest release of the k6 browser module, you must:

1. Change the import from `k6/experimental/browser` to `k6/browser`.
2. Ensure that all the synchronous (sync) APIs that have been migrated over to async are handled appropriately. In most cases, you will only need to add `await` in front of the API call.

For example, before:

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/experimental/browser';

...

export default async function () {
    const page = browser.newPage();
    ...
}
```

{{< /code >}}

And now:

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/browser';

...

export default async function () {
    const page = await browser.newPage();
    ...
}
```

{{< /code >}}

You might have already encountered async APIs when working with the browser module, such as [page.click](http://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/click/), so the use of `async` and `await` keywords might be familiar to you.

Below is a screenshot of a comparison between a generic browser test in `v0.51` and `v0.52` to help visualize the change:

![v0.51 & v0.52 script comparison](/media/docs/k6-oss/browser-v0.52-migration-script-comparison-3.png)

### The affected APIs

{{< collapse title="List of APIs to be migrated to async" >}}

| Class          | Method                  |
| -------------- | ----------------------- |
| Browser        | closeContext            |
| Browser        | context                 |
| Browser        | newContext              |
| Browser        | newPage                 |
| Browser        | userAgent               |
| BrowserContext | addCookies              |
| BrowserContext | addInitScript           |
| BrowserContext | browser                 |
| BrowserContext | clearCookies            |
| BrowserContext | clearPermissions        |
| BrowserContext | close                   |
| BrowserContext | cookies                 |
| BrowserContext | grantPermissions        |
| BrowserContext | newPage                 |
| BrowserContext | setGeolocation          |
| BrowserContext | setOffline              |
| ElementHandle  | $                       |
| ElementHandle  | $$                      |
| ElementHandle  | boundingBox             |
| ElementHandle  | check                   |
| ElementHandle  | contentFrame            |
| ElementHandle  | dblclick                |
| ElementHandle  | dispatchEvent           |
| ElementHandle  | fill                    |
| ElementHandle  | focus                   |
| ElementHandle  | getAttribute            |
| ElementHandle  | hover                   |
| ElementHandle  | innerHTML               |
| ElementHandle  | innerText               |
| ElementHandle  | inputValue              |
| ElementHandle  | isChecked               |
| ElementHandle  | isDisabled              |
| ElementHandle  | isEditable              |
| ElementHandle  | isEnabled               |
| ElementHandle  | isHidden                |
| ElementHandle  | isVisible               |
| ElementHandle  | ownerFrame              |
| ElementHandle  | press                   |
| ElementHandle  | screenshot              |
| ElementHandle  | scrollIntoViewIfNeeded  |
| ElementHandle  | selectOption            |
| ElementHandle  | selectText              |
| ElementHandle  | setInputFiles           |
| ElementHandle  | tap                     |
| ElementHandle  | textContent             |
| ElementHandle  | type                    |
| ElementHandle  | uncheck                 |
| ElementHandle  | waitForElementState     |
| ElementHandle  | waitForSelector         |
| Frame          | $                       |
| Frame          | $$                      |
| Frame          | check                   |
| Frame          | content                 |
| Frame          | dblclick                |
| Frame          | dispatchEvent           |
| Frame          | evaluate<R, Arg>        |
| Frame          | evaluateHandle<R, Arg>  |
| Frame          | fill                    |
| Frame          | focus                   |
| Frame          | frameElement            |
| Frame          | getAttribute            |
| Frame          | hover                   |
| Frame          | innerHTML               |
| Frame          | innerText               |
| Frame          | inputValue              |
| Frame          | isChecked               |
| Frame          | isDisabled              |
| Frame          | isEditable              |
| Frame          | isEnabled               |
| Frame          | isHidden                |
| Frame          | isVisible               |
| Frame          | press                   |
| Frame          | selectOption            |
| Frame          | setContent              |
| Frame          | setInputFiles           |
| Frame          | tap                     |
| Frame          | textContent             |
| Frame          | title                   |
| Frame          | type                    |
| Frame          | uncheck                 |
| Frame          | waitForLoadState        |
| Frame          | waitForSelector         |
| Frame          | waitForTimeout          |
| JSHandle       | asElement               |
| JSHandle       | dispose                 |
| JSHandle       | evaluate<R, Arg>        |
| JSHandle       | evaluateHandle<R, Arg>  |
| JSHandle       | getProperties           |
| JSHandle       | jsonValue               |
| Keyboard       | down                    |
| Keyboard       | insertText              |
| Keyboard       | press                   |
| Keyboard       | type                    |
| Keyboard       | up                      |
| Locator        | check                   |
| Locator        | clear                   |
| Locator        | dblclick                |
| Locator        | dispatchEvent           |
| Locator        | fill                    |
| Locator        | focus                   |
| Locator        | getAttribute            |
| Locator        | hover                   |
| Locator        | innerHTML               |
| Locator        | innerText               |
| Locator        | inputValue              |
| Locator        | isChecked               |
| Locator        | isDisabled              |
| Locator        | isEditable              |
| Locator        | isEnabled               |
| Locator        | isHidden                |
| Locator        | isVisible               |
| Locator        | press                   |
| Locator        | selectOption            |
| Locator        | tap                     |
| Locator        | textContent             |
| Locator        | type                    |
| Locator        | uncheck                 |
| Locator        | waitFor                 |
| Mouse          | click                   |
| Mouse          | dblclick                |
| Mouse          | down                    |
| Mouse          | move                    |
| Mouse          | up                      |
| Page           | $                       |
| Page           | $$                      |
| Page           | bringToFront            |
| Page           | check                   |
| Page           | close                   |
| Page           | content                 |
| Page           | dblclick                |
| Page           | dispatchEvent           |
| Page           | emulateMedia            |
| Page           | emulateVisionDeficiency |
| Page           | evaluate<R, Arg>        |
| Page           | evaluateHandle<R, Arg>  |
| Page           | fill                    |
| Page           | focus                   |
| Page           | getAttribute            |
| Page           | hover                   |
| Page           | innerHTML               |
| Page           | innerText               |
| Page           | inputValue              |
| Page           | isChecked               |
| Page           | isDisabled              |
| Page           | isEditable              |
| Page           | isEnabled               |
| Page           | isHidden                |
| Page           | isVisible               |
| Page           | on                      |
| Page           | opener                  |
| Page           | press                   |
| Page           | reload                  |
| Page           | screenshot              |
| Page           | selectOption            |
| Page           | setContent              |
| Page           | setExtraHTTPHeaders     |
| Page           | setInputFiles           |
| Page           | setViewportSize         |
| Page           | tap                     |
| Page           | textContent             |
| Page           | throttleCPU             |
| Page           | throttleNetwork         |
| Page           | title                   |
| Page           | type                    |
| Page           | uncheck                 |
| Page           | viewportSize            |
| Page           | waitForLoadState        |
| Page           | waitForSelector         |
| Page           | waitForTimeout          |
| Request        | allHeaders              |
| Request        | headerValue             |
| Request        | headersArray            |
| Request        | postData                |
| Request        | resourceType            |
| Request        | response                |
| Request        | size                    |
| Request        | timing                  |
| Response       | allHeaders              |
| Response       | body                    |
| Response       | headerValue             |
| Response       | headerValues            |
| Response       | headersArray            |
| Response       | json                    |
| Response       | securityDetails         |
| Response       | serverAddr              |
| Response       | size                    |
| Touchscreen    | tap                     |

{{< /collapse >}}

## Working with k6 check

The k6 `check` API will not `await` promises, so calling a function that returns a `Promise`, for example `locator.textContent()`, inside one of the predicates will not work. Instead you will have to `await` and store the result in a variable _outside_ the `check`:

For example, before:

{{< code >}}

<!-- eslint-skip -->

```javascript
check(page, {
  header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
});
```

{{< /code >}}

And now:

{{< code >}}

<!-- eslint-skip -->

```javascript
const headerText = await page.locator('h2').textContent();
check(headerText, {
  header: headerText === 'Welcome, admin!',
});
```

{{< /code >}}

## Groups

A note on [groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups/#groups), they don't work with async APIs either, there is no workaround as of yet. Here's the [GitHub issue](https://github.com/grafana/k6/issues/2728) that you can follow to keep up-to-date with relevant news on a group API that works with async APIs.

## Migrating from k6 v0.45 or below

If you use k6 v0.45 or below, first review [how to migrate to v0.46](https://grafana.com/docs/k6/v0.51.x/migrating-to-k6-v0-46). This guide details the breaking changes introduced in v0.46 for the `browser` APIs and provides instructions on how to migrate to them.

# Where to get extra help

With the release of k6 `v0.52`, you'll also be able to find the latest type definitions and updates to the [k6 browser documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser). Refer to [Configure k6 IntelliSense](http://grafana.com/docs/k6/<K6_VERSION>/set-up/configure-k6-intellisense/) for details on how to work with the type definition file in your project.

For all the details, review the CHANGELOG for [k6 version 0.52](https://github.com/grafana/k6/releases/tag/v0.52.0). You can also ask questions in [the community forum](https://community.grafana.com/c/grafana-k6/k6-browser/79) if you need help.
