---
title: 'HTML Forms'
excerpt: 'Scripting example on how to handle HTML forms in a k6 test.'
---

Scripting example on how to handle HTML forms.

In many cases using the [Selection](/javascript-api/k6-html/selection) API (jQuery API clone) to interact with HTML data is enough, but for some use cases, like with forms, we can make things easier providing a higher-level API like the [Response.submitForm( [params] )](/javascript-api/k6-http/response/response-submitform) API.

<CodeGroup labels={["submit-form.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  // Request page containing a form
  let res = http.get('https://httpbin.test.k6.io/forms/post');

  // Now, submit form setting/overriding some fields of the form
  res = res.submitForm({
    formSelector: 'form',
    fields: { custname: 'test', extradata: 'test2' },
  });
  sleep(3);
}
```

</CodeGroup>

**Relevant k6 APIs**:

- [Response.submitForm([params])](/javascript-api/k6-http/response/response-submitform)
- [Selection.find(selector)](/javascript-api/k6-html/selection/selection-find)
  (the [jQuery Selector API](http://api.jquery.com/category/selectors/) docs are also a good
  resource on what possible selector queries can be made)
