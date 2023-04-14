---
title: 'Browser metrics'
excerpt: 'An overview of the different browser performance metrics that the browser module tracks.'
---

Follow along to learn about:

1. The existing browser metrics that k6 browser tracks
2. The Web Vitals and why they are important
3. How to set thresholds for your browser metrics
4. How to separate the browser metrics for different pages

## Existing browser metrics

<Blockquote mod="note" title="">

  As of k6 version 0.44.0, k6 browser now natively supports [Web Vitals](https://web.dev/vitals/). In future releases, we will remove the following browser metrics to focus on the standard web vital metrics.

</Blockquote>

Apart from the usual HTTP specific metrics that k6 already tracks, the browser module tracks the following browser specific performance metrics on top:

| Metric Name                    |  Description                                                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| browser_dom_content_loaded     | Emitted when the page is loaded but scripts have just started to be executed.                                |
| browser_first_paint            | Emitted when the browser renders the first pixel on the page.                                                |
| browser_first_contentful_paint | Emitted when the browser renders the first DOM element on the page, whether that's a text, image or header.  |
| browser_loaded                 | Emitted when the page is fully loaded.                                                                       |

## Web vitals

### Why are they important?

## Set thresholds for your browser metrics

## Separate browser metrics for different pages