---
title: 'Selection.val()'
description: 'Get the current value of the first element in the set of matched elements.'
---

# Selection.val()

Get the current value of the first element in the set of matched elements.
Mimics [jquery.val](https://api.jquery.com/val/).

### Returns

| Type   | Description                                                    |
| ------ | -------------------------------------------------------------- |
| string | The value of the first element in the set of matched elements. |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
                <input id="text_input" type="text" value="input-text-value"/>
                <select id="select_one">
                        <option value="not this option">no</option>
                        <option value="yes this option" selected>yes</option>
                </select>
                <select id="select_text">
                        <option>no text</option>
                        <option selected>yes text</option>
                </select>
                <select id="select_multi" multiple>
                        <option>option 1</option>
                        <option selected>option 2</option>
                        <option selected>option 3</option>
                </select>
                <textarea id="textarea" multiple>Lorem ipsum dolor sit amet</textarea>
  `;
  const doc = parseHTML(content);

  console.log(doc.find('#text_input').val());
  console.log(doc.find('#select_one option[selected]').val());
  console.log(doc.find('#select_one').val());
  console.log(doc.find('#select_text').val());
  console.log(doc.find('#select_multi').val());
  console.log(doc.find('#textarea').val());

  sleep(1);
}
```

{{< /code >}}
