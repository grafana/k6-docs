---
title: 'ConsoleMessage'
description: 'Browser module: ConsoleMessage Class'
weight: 03
---

# ConsoleMessage

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| args() | List of arguments passed to a `console` function call.           |
| page() | The page that produced this console message.                     |
| text() | The text of the console message.                                 |
| type() | The type of the console message. For example: `log`, or `debug`. |
