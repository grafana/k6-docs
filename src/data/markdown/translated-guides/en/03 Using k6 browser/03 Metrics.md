---
title: 'Browser metrics'
excerpt: 'An overview of the different browser performance metrics that the browser module tracks.'
---

Follow along to learn about:

- Google's Core Web Vitals and why they are important
- How to analyze the browser metrics output
- How to set thresholds for your browser metrics

## Google's Core Web Vitals

The k6 browser module emits metrics based on the [Core Web Vitals](https://web.dev/vitals/#core-web-vitals).
This section provides some conceptual background about the core vitals.
To review the complete list of browser metrics, refer to the section in the [Metrics reference](/using-k6/metrics/reference#browser).

Google introduced these metrics to provided unified signals to assess user experience on the web.
The vitals are composed of three important metrics to help user experience when using your web application.

- Loading performance
- Interactivity
- And visual stability

### Why web vitals

The Core Web Vitals are one of [Google's Page Experience Signals](https://developers.google.com/search/docs/appearance/page-experience). A positive page experience naturally leads to better quality and better search engine rankings. These golden metrics help you understand which areas of your frontend application need optimization so your pages can rank higher than similar content.

Existing browser measures, such as `Load` and `DOMContentLoaded` times, no longer accurately reflect user experience very well.
Relying on these load events does not give the correct metric to analyze critical performance bottlenecks that your page might have. Google's Web Vitals is a better measure of your page performance and its user experience.

## Understanding the browser metrics output

When a browser test finishes, k6 reports a top-level overview of the aggregated browser metrics output.
The following snippet is an example:

<Blockquote mod="note" title="">

In future releases, the `browser_*` metrics will be removed in favor of the web vitals. As Google also recommends measuring the 75th percentile for each web vital metric, there will still be future tweaks to improve the summary output.

</Blockquote>

```bash
  webvital_cumulative_layout_shift.......................: avg=0        min=0        med=0        max=0        p(90)=0        p(95)=0
  webvital_cumulative_layout_shift_good..................: 1       0.113248/s
  webvital_first_contentful_paint........................: avg=415.35ms min=302ms    med=415.35ms max=528.7ms  p(90)=506.03ms p(95)=517.36ms
  webvital_first_contentful_paint_good...................: 2       0.226497/s
  webvital_first_input_delay.............................: avg=5.59ms   min=5.59ms   med=5.59ms   max=5.59ms   p(90)=5.59ms   p(95)=5.59ms
  webvital_first_input_delay_good........................: 1       0.113248/s
  webvital_interaction_to_next_paint.....................: avg=248ms    min=248ms    med=248ms    max=248ms    p(90)=248ms    p(95)=248ms
  webvital_interaction_to_next_paint_needs_improvement...: 1       0.113248/s
  webvital_largest_content_paint.........................: avg=528.7ms  min=528.7ms  med=528.7ms  max=528.7ms  p(90)=528.7ms  p(95)=528.7ms
  webvital_largest_content_paint_good....................: 1       0.113248/s
  webvital_time_to_first_byte............................: avg=320.59ms min=247.09ms med=320.59ms max=394.1ms  p(90)=379.4ms  p(95)=386.75ms
  webvital_time_to_first_byte_good.......................: 2       0.226497/s
```

After each web vital metric, an additional row with the same metric name is also printed with its rating. The rating can be `good`, `needs_improvement,` or `poor`. When the browser module receives the metric from the [Google's Web Vital Library](https://github.com/GoogleChrome/web-vitals), it counts how many times it sees that metric. 

For example, `webvital_first_contentful_paint_good` was reported twice, indicating that this metric was seen on two pages and has a rating of good. In future releases of k6, we aim to improve how to display the rating for a better developer experience.

You can also visualize these results in different ways depending on your team's needs. For more information, check out our blog post on [visualizing k6 results](https://k6.io/blog/ways-to-visualize-k6-results/). 

## Set thresholds for your browser metrics

The browser module can use all key k6 functionalities, such as [Thresholds](https://k6.io/docs/using-k6/thresholds/).

To set thresholds for your browser metrics:
1. Add the metric you want to check.
1. Specify its threshold value.

As the following example shows, you can also pass in different URLs if you're going to set a threshold for other pages, especially when your script contains page navigations.

<Blockquote mod="attention">

Currently, you can only use URLs to specify thresholds for different pages. If you use [Groups](https://k6.io/docs/using-k6/tags-and-groups/#groups), the metrics are not correctly grouped as described in [#721](https://github.com/grafana/xk6-browser/issues/721).

</Blockquote>

<CodeGroup labels={["script.js"]}>

```javascript
export const options = {
  thresholds: {
    'webvital_largest_content_paint': ['p(90) < 1000'],
    'webvital_first_input_delay{url:https://test.k6.io/}': ['p(90) < 80'],
    'webvital_first_input_delay{url:https://test.k6.io/my_messages.php}': ['p(90) < 100'],
  },
};
```

</CodeGroup>

When the test is run, you should see a similar output as the one below.

```bash
  webvital_first_input_delay.....................: avg=6.29ms   min=4.39ms   med=6.29ms   max=8.19ms   p(90)=7.81ms   p(95)=8ms
  ✓ { url:https://test.k6.io/ }..................: avg=4.39ms   min=4.39ms   med=4.39ms   max=4.39ms   p(90)=4.39ms   p(95)=4.39ms
  ✓ { url:https://test.k6.io/my_messages.php }...: avg=8.19ms   min=8.19ms   med=8.19ms   max=8.19ms   p(90)=8.19ms   p(95)=8.19ms
  webvital_first_input_delay_good................: 2       0.16075/s
  webvital_interaction_to_next_paint.............: avg=56ms     min=56ms     med=56ms     max=56ms     p(90)=56ms     p(95)=56ms
  webvital_interaction_to_next_paint_good........: 1       0.080375/s
  ✓ webvital_largest_content_paint.................: avg=446.95ms min=282.19ms med=446.95ms max=611.7ms  p(90)=578.75ms p(95)=595.22ms
```

