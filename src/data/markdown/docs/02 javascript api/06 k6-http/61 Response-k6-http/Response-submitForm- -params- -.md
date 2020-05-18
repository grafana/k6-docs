---
title: 'Response.submitForm( [params] )'
excerpt: ''
---

Fill in and submit form found in HTML of response. By default it will look for the first `form` tag in the HTML, but this can be overridden using the `formSelector` option. To set/override the form fields you set properties of an object in the `fields` option.

This method takes an object argument where the following properties can be set:

| Param          | Type   | Description                                                                                                                                                                                 |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| formSelector   | string | A selector string passed to [Selection.find(selector)](/javascript-api/k6-html/selection/selection-find-selector) to locate the form to fill in and submit. By default this is `"form"`. |
| fields         | object | The form fields to set/override. The keys are the form fields names and the values are the form field values.                                                                               |
| submitSelector | string | A selector string used to locate the submit button in the form. By default this is `'[type="submit"]'`.                                                                                     |
| params         | object | A [Params (k6/http)](/javascript-api/k6-http/params-k6-http) object that will be forwarded to the form submit request. Can be used to set headers, cookies etc.                         |

### Returns

| Type                                                               | Description               |
| ------------------------------------------------------------------ | ------------------------- |
| [Response (k6/http)](/javascript-api/k6-http/response-k6-http) | The form submit response. |

### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import http from 'k6/http';

export default function() {
  // Request page containing a form
  let res = http.get('https://httpbin.org/forms/post');

  // Now, submit form setting/overriding some fields of the form
  res = res.submitForm({
    formSelector: '//form[@action="/post"]',
    fields: { custname: 'test', extradata: 'test2' },
    submitSelector: 'mySubmit',
  });
}
```

</div>
