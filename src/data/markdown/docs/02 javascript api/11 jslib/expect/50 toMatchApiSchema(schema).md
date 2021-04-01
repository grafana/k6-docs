---
title: 'toMatchAPISchema(schema)'
description: 'Use .expect(response).toMatchAPISchema(schema) verify API contract.'
---

`toMatchAPISchema(schema)` validates that data matches the given JSON schema. It must be called in the chain after `t.expect(response.json())` or `.and(response.json())`. 


| Parameter      | Type   | Description |
| -------------- | ------ | ----------- |
| schema         | object | JSON Schema object |


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';

// this schema is typically imported from a separate file such as ./contracts/CrocApiSchema.js
// For simplicity of the example, the contract object is pasted here.
let crocodileApiContract = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number",
      "minimum": 1,
      "maximum": 30
    },
    "date_of_birth": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "name",
    "age",
    "date_of_birth"
  ]
};

export default function() {
  describe('01. Fetch public crocs', (t) => {
    let response = http.get(`https://test-api.k6.io/public/crocodiles/1/`);

    t.expect(response.status).as("response status").toEqual(200)
    .and(response).toHaveValidJson()
    .and(response.json()).as("Croc API schema").toMatchAPISchema(crocodileApiContract);
  });
}
```

</CodeGroup>


The result should look similar to this
```
█ 01. Fetch public crocs
  ✓ response status is 200.
  ✓ https://test-api.k6.io/public/crocodiles/1/ has valid json response
  ✓ Croc API schema schema validation
```