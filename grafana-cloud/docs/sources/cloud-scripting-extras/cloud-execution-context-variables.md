---
title: Cloud execution context variables
description: 
weight: 304
---


## Cloud execution context variables

When you run tests in k6 Cloud, you can use three additional environment variables to find out in which load zone, server instance, and distribution label the script is currently running.

| Name              | Value  | Description                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUDRUN_LOAD_ZONE`    | string | The load zone from where the metric was collected. Values will be of the form: amazon:us :ashburn (see list above).                                      |
| `K6_CLOUDRUN_INSTANCE_ID`  | number | A sequential number representing the unique ID of a load generator server taking part in the test, starts at 0.                                          |
| `K6_CLOUDRUN_DISTRIBUTION` | string | The value of the "distribution label" that you used in `ext.loadimpact.distribution` corresponding to the load zone the script is currently executed in. |

You can read the values of these variables in your k6 script as usual.


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



