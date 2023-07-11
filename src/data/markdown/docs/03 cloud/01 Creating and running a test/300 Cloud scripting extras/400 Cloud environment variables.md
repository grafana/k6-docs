---
title: Cloud environment variables
description: k6 Cloud provides some extra environment variables about load zones, server instances, and labels.
canonicalUrl: https://grafana.com/docs/grafana-cloud/k6/author-run/cloud-scripting-extras/cloud-execution-context-variables/
---

When you run tests in k6 Cloud, you can use three additional environment variables to find out in which load zone, server instance, and distribution label the script is currently running.

<Blockquote mod="note" title="You can also set your own environment variables">

To use custom Cloud environment variables, refer to [Cloud environment variables](/cloud/manage/environment-variables/).

</Blockquote>

| Name              | Value  | Description                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUDRUN_LOAD_ZONE`    | string | The load zone from where the metric was collected. Values will be of the form: amazon:us :ashburn (see list above).                                      |
| `K6_CLOUDRUN_INSTANCE_ID`  | number | A sequential number representing the unique ID of a load generator server taking part in the test, starts at 0.                                          |
| `K6_CLOUDRUN_DISTRIBUTION` | string | The value of the "distribution label" that you used in `ext.loadimpact.distribution` corresponding to the load zone the script is currently executed in. |

You can read the values of these variables in your k6 script as usual.

<CodeGroup labels={["Reading injected environment variables"]}>

```javascript
export const options = {
  vus: 50,
  duration: '30s',
  ext: {
    loadimpact: {
      distribution: {
        ashburnDistribution: { loadZone: 'amazon:us:ashburn', percent: 50 },
        dublinDistribution: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
export default function () {
  if (__ENV.K6_CLOUDRUN_DISTRIBUTION === 'ashburnDistribution') {
    // do something
  } else if (__ENV.K6_CLOUDRUN_DISTRIBUTION == 'dublinDistribution') {
    // do something
  }
}
```

</CodeGroup>

<Blockquote mod="Attention" title="The LI_ prefix is deprecated">

Previously, cloud environment variables were prefixed with `LI_` (for example, `LI_LOAD_ZONE`).
These names are deprecated and may be removed in future versions of k6 Cloud.

</Blockquote>

