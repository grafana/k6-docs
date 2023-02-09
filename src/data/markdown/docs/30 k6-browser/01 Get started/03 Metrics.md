---
title: 'Browser metrics'
excerpt: 'An overview of the different browser performance metrics that the browser module tracks.'
---

<Blockquote mod="attention">

These metrics are still subject to change in the future.

</Blockquote>

Apart from the usual HTTP specific metrics that k6 already tracks, the browser module tracks the following browser specific performance metrics on top:

| Metric Name                    |  Description                                                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| browser_dom_content_loaded     | Emitted when the page is loaded but scripts have just started to be executed.                                |
| browser_first_paint            | Emitted when the browser renders the first pixel on the page.                                                |
| browser_first_contentful_paint | Emitted when the browser renders the first DOM element on the page, whether that's a text, image or header.  |
| browser_first_meaningful_paint | Emitted when the browser renders the main content from above-the-fold that the users are looking for.        |
| browser_loaded                 | Emitted when the page is fully loaded.                                                                       |