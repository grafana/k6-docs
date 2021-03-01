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

The complete list of supported librariers can be viewed on [jslib.k6.io](https://jslib.k6.io). 

## Versioning

```
https://jslib.k6.io/library-name/version/index.js
```

Note, that libraries have versions. For example "functional.js" library currently has v0.0.1, v0.0.2 and v0.0.3. When using a library, you will have to choose a specific version. 

We recommend that you use the last version available at the time of writing your k6 scripts. 