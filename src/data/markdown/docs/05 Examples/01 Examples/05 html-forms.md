---
title: "HTML Forms"
excerpt: "Scripting example on how to handle HTML forms in a load test."
---

Scripting example on how to handle HTML forms in a load test.

### Filling in and submitting forms
One of the most tedious tasks when testing websites and apps are to get all the form filling to
work. You have to get all the so-called "correlations" ([see above](/examples/correlation-and-dynamic-data)) correct
which can take time, even with the help of a scenario recorder as the starting point for getting
the basic user journey down into a re-playable test.

<div class="code-group" data-props='{ "labels": ["submit-form.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import {sleep} from "k6";

export default function() {
    // Request page containing a form
    let res = http.get("https://httpbin.org/forms/post");
 
    // Now, submit form setting/overriding some fields of the form
    res = res.submitForm({
        formSelector: 'form[action="/post"]',
        fields: { custname: "test", extradata: "test2" },
        submitSelector: "mySubmit",
    });

    sleep(3);
}
```

</div>

**Relevant k6 APIs**:
- [Response.submitForm([params])](/javascript-api/k6-http/response/response-submitform-params)
- [Selection.find(selector)](/javascript-api/k6-html/selection/selection-find-selector)
  (the [jQuery Selector API](http://api.jquery.com/category/selectors/) docs are also a good
  resource on what possible selector queries can be made)
