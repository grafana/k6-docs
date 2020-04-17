---
title: "Working with HTML forms"
excerpt: ""
---
A common use case when testing web sites is to fill in and submit forms.

In many cases using the [Selection](/javascript-api/k6-html/selection) API (jQuery API clone) to interact with HTML data is enough, but for some use cases, like with forms, we can make things easier and the code more compact by wrapping the [Selection](/javascript-api/k6-html/selection) API plus some additional logic to get a higher-level API.

That's what we've done with the [Response.submitForm( [params] )](/javascript-api/k6-http/response/response-submitform-params) API.

<div class="code-group" data-props='{"labels": ["Submitting a form"], "lineNumbers": [true]}'>

```javascript
import http from "k6/http";

export default function() {
  // Request page containing a form
  let res = http.get("https://httpbin.org/forms/post");
 
  // Now, submit form setting/overriding some fields of the form
  res = res.submitForm({
    fields: {
      custname: "test",
      extradata: "test2"
    },
    submitSelector: "mySubmit"
  });
}
```

</div>
