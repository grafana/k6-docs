---
title: 'Element.selection()'
excerpt: 'Retrieve the Selection matching this element.'
---

# Element.selection()

Retrieve the Selection matching this element.

Mimics `$(element)`

### Returns

| Type    | Description                          |
| ------- | ------------------------------------ |
| Selection | The Selection mathing this element. |

### Example

{{< code >}}

```javascript
import http from "k6/http";

export default () => {
	let li = http.get("https://test.k6.io").html().find("li");
	li.each(function(_, element) {
		let container = element.selection().closest('ul.header-icons');
		console.log("li.each", container.html())
	});
}

```
{{< /code >}}
