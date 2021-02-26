---
title: "jslib"
excerpt: "External JavaScript libraries for k6"
---

The [jslib.k6.io](https://jslib.k6.io/) is a collection of external JavaScript libraries that can be [directly imported](https://k6.io/docs/using-k6/modules#remote-http-s-modules) in k6 scripts.  



### Example

<CodeGroup labels={[]}>

```javascript
import { check, sleep } from "k6";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js"
import { randomIntBetween, 
         randomItem, 
         uuidv4 } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

const testData = {
  user: {
    name: "Batman"
  }
};

export default function() {
  check(testData, {
    "JSON path works": () => jsonpath.value(testData, 'user.name') === "Batman"
  });

  console.log(uuidv4());
  console.log(randomItem([1,2,3,4]));

  sleep(randomIntBetween(1,5)); // sleep between 1 and 5 seconds
}
```

</CodeGroup>
