---
title: "Init context"
excerpt: 'The init context (aka "init code") is code in the global context that has access to a few functions not accessible during main script execution.'
---
The init context (aka "init code") is code in the global context that has
access to a few functions not accessible during main script execution (aka
"VU context" or "VU code"). For a more detailed description see
[Running k6](/getting-started/running-k6#section-the-init-context-and-the-default-function).



| Function                                                                              | Description         |
| ----------------------------------------------------------------------------------- | --------------------- |
| [open( filePath, [mode] )](/javascript-api/init-context/open) | Opens a file and reads all the contents into memory. |
