---
title: Load zones
description: You can run k6 on the following AWS cloud regions.
canonicalUrl: https://grafana.com/docs/grafana-cloud/k6/author-run/cloud-scripting-extras/load-zones/
---

You can run your tests from the following load zones.

## Syntax to set load zones

Declare load zones in the `options.ext.loadimpact.distribution` object.

Each load zone has an object with a custom label for the key.
Load zones have two properties:
- `loadZone`, a string whose value must be one of the load zones, as listed in the next section.
- `percent`, an integer declaring the percentage of the load that runs from the load zone.

The sum of the percentages must equal 100.

This example distributes load across two load zones, Ashburn and Dublin.

```
export const options = {
  ext: {
    loadimpact: {
      distribution: {
        distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
```

You can access the label of the load zone as an environment variable.

<Glossary>

- US East (Ohio) - **DEFAULT** `amazon:us:columbus`
- Africa (Cape Town) `amazon:sa:cape town`
- Asia Pacific (Hong Kong) `amazon:cn:hong kong`
- Asia Pacific (Mumbai) `amazon:in:mumbai`
- Asia Pacific (Osaka) `amazon:jp:osaka`
- Asia Pacific (Seoul) `amazon:kr:seoul`
- Asia Pacific (Singapore) `amazon:sg:singapore`
- Asia Pacific (Sydney) `amazon:au:sydney`
- Asia Pacific (Tokyo) `amazon:jp:tokyo`
- Canada (Montreal) `amazon:ca:montreal`
- Europe (Frankfurt) `amazon:de:frankfurt`
- Europe (Ireland)  `amazon:ie:dublin`
- Europe (London) `amazon:gb:london`
- Europe (Milan) `amazon:it:milan`
- Europe (Paris)  `amazon:fr:paris`
- Europe (Stockholm) `amazon:se:stockholm`
- Middle East (Bahrain) `amazon:bh:bahrain`
- South America (São Paulo) `amazon:br:sao paulo`
- US West (N. California) `amazon:us:palo alto`
- US West (Oregon) `amazon:us:portland`
- US East (N. Virginia) `amazon:us:ashburn`

</Glossary>


