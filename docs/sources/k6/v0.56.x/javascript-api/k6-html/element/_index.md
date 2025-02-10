---
title: 'Element'
description: 'An HTML DOM element as returned by the Selection API.'
description: 'An HTML DOM element as returned by the Selection API.'
weight: 20
---

# Element

Represents a DOM element matched by a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection),
and provides an API to inspect the element content.

Use [Selection.get(index)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-get) to return an Element object.

The Element object provides a similar API to the [DOM Element API](https://developer.mozilla.org/en-US/Web/API/Element) to retrieve element information.

| Method                                                                                                 | Description                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element/element-selection) | The selection matching the element.                                                                                                                                      |
| nodeName                                                                                               | The name of the element.                                                                                                                                                 |
| nodeType                                                                                               | The type of the element.                                                                                                                                                 |
| nodeValue                                                                                              | The element value.                                                                                                                                                       |
| id                                                                                                     | The id of the element.                                                                                                                                                   |
| innerHTML                                                                                              | Is a DOMString representing the markup of the element's content.                                                                                                         |
| textContent                                                                                            | The element content.                                                                                                                                                     |
| ownerDocument                                                                                          | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| attributes                                                                                             | An array of attributes.                                                                                                                                                  |
| firstChild                                                                                             | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| lastChild                                                                                              | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| childElementCount                                                                                      | The number of children elements.                                                                                                                                         |
| firstElementChild                                                                                      | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| lastElementChild                                                                                       | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| previousSibling                                                                                        | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| nextSibling                                                                                            | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| previousElementSibling                                                                                 | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| nextElementSibling                                                                                     | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| parentElement                                                                                          | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| parentNode                                                                                             | [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                                       |
| childNodes                                                                                             | Array of [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                              |
| children                                                                                               | Array of [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)                                                                              |
| classList                                                                                              | An array of class names.                                                                                                                                                 |
| className                                                                                              | The class name string                                                                                                                                                    |
| lang                                                                                                   | The value of the lang attribute.                                                                                                                                         |
| toString                                                                                               | The element string representation.                                                                                                                                       |
| hasAttribute                                                                                           | Boolean                                                                                                                                                                  |
| getAttribute                                                                                           | getAttributeNode                                                                                                                                                         |
| hasAttributes                                                                                          | Boolean                                                                                                                                                                  |
| hasChildNodes                                                                                          | Boolean                                                                                                                                                                  |
| isSameNode                                                                                             | Boolean                                                                                                                                                                  |
| isEqualNode                                                                                            | Boolean                                                                                                                                                                  |
| getElementsByClassName                                                                                 | Return an array of [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element).                                                                   |
| getElementsByTagName                                                                                   | Return an array of [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element).                                                                   |
| querySelector                                                                                          | Returns the first [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element) which matches the specified selector string relative to the element |
| querySelectorAll                                                                                       | Returns all the [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element) which matches the specified selector string relative to the element   |
| contains                                                                                               |                                                                                                                                                                          |
| matches                                                                                                | Returns a Boolean indicating whether or not the element would be selected by the specified selector string                                                               |
| namespaceURI                                                                                           | The namespace URI of the element.                                                                                                                                        |
| isDefaultNamespace                                                                                     | Returns a Boolean indicating whether the element has the default namespace.                                                                                              |

Additionally, Element can provide more methods depending on the Element type.

- **AnchorElement**: hash, host, hostname, port, username, password, origin, pathname, protocol, relist, search, text.

- **ButtonElement**: form, formAction, formEnctype, formMethod, formNoValidate, formTarget, labels, name, value.

- **CanvasElement**: width, height

- **DataListElement**: options

- **FieldSetElement**: elements, type, form

- **FormElement**: elements, length, method

- **InputElement**: form

- **LabelElement**: control, form

- **LegendElement**: form

- **LinkElement**: relList

- **MapElement**: areas, images

- **ObjectElement**: form

- **OptionElement**: disabled, form, index, label, text, value

- **OutputElement**: value, labels

- **ProgressElement**: max, value, position

- **ScriptElement**: text

- **SelectElement**: form, length, options, selectedOptions, selectedIndex, value

- **StyleElement**: text

- **TableElement**: caption, thead, tbody, tfoot, rows

- **TableCellElement**: cellIndex, colSpan, rowSpan, headers

- **TableRowElement**: cells, colSpan, sectionRowIndex, rowIndex

- **VideoElement**: textTracks

- **TitleElement**: text

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
<dl>
  <dt id="term-1">Value term 1</dt>
  <dt id="term-2">Value term 2</dt>
</dl>
  `;
  const sel = parseHTML(content).find('dl').children();

  const el1 = sel.get(0);
  const el2 = sel.get(1);

  console.log(el1.nodeName());
  console.log(el1.id());
  console.log(el1.textContent());

  console.log(el2.nodeName());
  console.log(el2.id());
  console.log(el2.textContent());

  sleep(1);
}
```

{{< /code >}}

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
\t<a href="http://username:password@example.com:80" rel="prev next" target="_self" type="rare" accesskey="q" hreflang="en-US" media="print">6</a>
  `;
  const el = parseHTML(content).find('a').get(0);

  console.log(el.nodeName());
  console.log(el.innerHTML());
  console.log(el.host());
  console.log(el.hostname());
  console.log(el.protocol());

  sleep(1);
}
```

{{< /code >}}
