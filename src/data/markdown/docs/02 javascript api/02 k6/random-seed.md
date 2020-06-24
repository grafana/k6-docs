---
title: "randomSeed( int )"
description: "Set seed to get a reproducible pseudorandom number using `Math.random`."
---
Set seed to get a reproducible pseudorandom number using `Math.random`. 


| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| int         | integer | The seed value. |


### Example

Use `randomSeed` to get the same random number in all the iterations.

<div class="code-group" data-props='{"labels": []}'>

```js
import { randomSeed } from "k6";

export const options = {
  vus: 10,
  duration: '5s'
}

export default function() {
  randomSeed(123456789);
  let rnd = Math.random();
  console.log(rnd);
}
```

</div>
