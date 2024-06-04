---
title: 'Migrating to k6 v0.52'
description: 'A migration guide to ease the process of transitioning to the new k6 browser module version'
weight: 04
---

# Migrating to k6 v0.52

This guide outlines the key changes you will need to make when moving your existing k6 browser test scripts to the **upcoming** latest [k6 browser module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser) (bundled with [k6 version 0.52](https://github.com/grafana/k6/releases/tag/v0.52.0)).

## Key changes

In the upcoming release of k6, we will be introducing a breaking change that will affect **all scripts** that use the k6 browser module. The main breaking changes are:

1. Converting majority of the k6 browser module APIs to asynchronous (async) APIs. What this means is that they will return a `promise` that will `resolve` to a value when the API call succeeds, or it will `reject` when an error occurs.
2. A side affect of making this async change, is that you will need to use a workaround to work with the k6 [check]({{< relref "../javascript-api/k6/check" >}}) API.
3. Finally, it's also worth reiterating that the [group]({{< relref "../javascript-api/k6/group" >}}) API still doesn't work with async APIs.

If you are interested in the rational as to why we're making this change, have a look at the [v0.51 release notes](https://github.com/grafana/k6/releases/tag/v0.51.0).

## Migrating to async

To ensure your scripts work with the upcoming release of k6, you will need to ensure that all the synchronous (sync) APIs that are going to be migrated over to async are handled appropriately. In majority of cases you will only need to add `await` in front of the API call, like so:

From

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const page = browser.newPage();
  // ...
}
```

{{< /code >}}

To

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const page = await browser.newPage();
  // ...
}
```

{{< /code >}}

You will likely already have encountered async APIs when working with the browser module such as [page.click]({{< relref "../javascript-api/k6-experimental/browser/page/click/" >}}), so the use of `async` and `await` keywords will be familiar to you.

The full list of APIs that will migrate over to be async can be found in this [github comment](https://github.com/grafana/xk6-browser/issues/428#issuecomment-1964020837). You will also find a screenshot of a comparison between the [fillform.js example](https://github.com/grafana/xk6-browser/blob/main/examples/fillform.js) in `v0.51` and `v0.52` in another [comment](https://github.com/grafana/xk6-browser/issues/428#issuecomment-2141634960) in the same github issue.

### When can I migrate?

Awaiting on something that’s not a thenable just returns that value. In another words, you can add the `await` keyword today to the browser module API calls in your scripts to future proof them. For example this works in k6 `v0.51` and it will work in k6 `v0.52`:

{{< code >}}

```javascript
import { check } from 'k6';
import { browser } from 'k6/experimental/browser';

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to the website under test.
    await page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
    await Promise.all([
      page.waitForNavigation(),
      page.locator('a[href="/my_messages.php"]').click(),
    ]);

    // Check that the header reads "Unauthorized".
    const h2 = page.locator('h2');
    const headerOK = (await h2.textContent()) == 'Unauthorized';
    check(headerOK, { header: headerOK });

    // Take a screenshot of the page.
    await page.screenshot({ path: 'screenshot.png' });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Can I promise chain?

If you want to use promise chaining the newly migrated async APIs, You won't be able to do that until the migration. For example, you can't do this yet:

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const page = browser.newPage();

  // ...

  await page.$('#text1').then((text) => text.type('hello world'));

  // ...
}
```

{{< /code >}}

Instead you could do this until k6 `v0.52` is released:

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const page = browser.newPage();

  // ...

  const text = await page.$('#text1');
  await text.type('hello world');

  // ...
}
```

{{< /code >}}

## Working with k6 check

The k6 `check` API wasn't designed to work with async APIs. However there is a workaround. In your current scripts, you may use a `check` like so:

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

export default async function () {
  const page = browser.newPage();

  // ...

  check(page, {
    header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
  });

  // ...
}
```

{{< /code >}}

Since the `locator.textContent` API is being migrated to async, and `check` doesn't work with async APIs, you will need to do something like this:

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

export default async function () {
  const page = browser.newPage();

  // ...

  const h2 = page.locator('h2');
  const headerOK = (await h2.textContent()) == 'Welcome, admin!';
  check(headerOK, { header: headerOK });

  // ...
}
```

{{< /code >}}

## Groups

A note on groups, they do not work with async APIs either, there is no workaround as of yet. Here's the [github issue](https://github.com/grafana/k6/issues/2728) that you can follow to keep up to date with relevant news on a groups API that works with async APIs.

# Are there any other upcoming major breaking changes?

We think that this is likely the last large breaking change until the browser module is deemed to be stable enough to be a non-experimental module in k6. When the browser module is no longer experimental, we think it should only be a small change in the import path from `k6/experimental/browser` to `k6/browser`. We have an open [issue on github](https://github.com/grafana/xk6-browser/issues/1117) which you can view and track to see the progress of graduating the browser module out of experimental. For more information on graduating extension out of experimental, refer to the [extension graduation process]({{< relref "../extensions/explanations/extension-graduation" >}}).

# Where to get extra help

We will also be releasing the latest type definitions and updating the documentation when we release k6 `v0.52`. Refer to the [k6 IntelliSense]({{< relref "../set-up/configure-k6-intellisense" >}}) documentation on how to work with the type definition file in your project.

For all the details, make sure to review the **upcoming** changelog for [k6 version 0.52](https://github.com/grafana/k6/releases/tag/v0.52.0). As always, ask in [the community forum](https://community.grafana.com/c/grafana-k6/k6-browser/79) if you need help!
