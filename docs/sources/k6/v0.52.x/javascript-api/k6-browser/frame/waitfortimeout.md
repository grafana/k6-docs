---
title: 'waitForTimeout(timeout)'
description: 'Browser module: waitForTimeout(timeout) method'
---

# waitForTimeout(timeout)

{{< admonition type="note" >}}

Never wait for timeout in production, use this only for debugging. Tests that wait for time are inherently flaky. Use [`Locator`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) actions and web assertions that wait automatically.

{{< /admonition >}}

Waits for the given `timeout` in milliseconds.

### Returns

| Type            | Description                                          |
| --------------- | ---------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the timeout is reached. |
