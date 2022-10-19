---
title: 'websockets'
excerpt: "k6 websockets experimental API"
---

<ExperimentalBlockquote />

This experimental API implements the browser's [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

With some caveats:

- The [binaryType](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType) is by default ArrayBuffer and setting it panics as k6 does not support Blob.



| Class                                       | Description                                                                                    |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket)     | Constructs a new WebSocket connection |