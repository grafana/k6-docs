---
title: "k6/experimental/websockets"
excerpt: "k6 websockets experimental API"
---

<Blockquote mod="attention" title="The redis module is experimental, use at your own risk">

While we intend to keep this module as simple and stable as possible,
we may need to add features or introduce breaking changes.
This could happen at any time until we release this module as stable.

**Use at your own risk!**

Feel free to provide user feedback, and open an issue or pull request if you have any suggestions.

</Blockquote>


This experimental API implements the browser's [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

With some caveats:

- The [binaryType](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType) is by default ArrayBuffer and setting it panics as k6 does not support Blob.



### API

| Class                                       | Description                                                                                    |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket)     | Constructs a new WebSocket connection |
