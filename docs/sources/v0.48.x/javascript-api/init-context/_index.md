---
title: 'Init context'
description: 'The init context (aka "init code") is code in the global context that has access to a few functions not accessible during main script execution.'
weight: 01
---

# Init context

Before the k6 starts the test logic, code in the _init context_ prepares the script.
A few functions are available only in init context.
For details about the runtime, refer to the [Test lifecycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

| Function                                                                                              | Description                                          |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [open( filePath, [mode] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/init-context/open) | Opens a file and reads all the contents into memory. |
