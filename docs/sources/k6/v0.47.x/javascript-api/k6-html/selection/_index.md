---
title: 'Selection'
description: 'A jQuery-like API for accessing HTML DOM elements.'
description: 'A jQuery-like API for accessing HTML DOM elements.'
weight: 50
weight: 50
---

# Selection

Represents a set of nodes in a DOM tree.

Selections have a jQuery-compatible API, but with two caveats:

- CSS and screen layout are not processed, thus calls like css() and offset() are unavailable.
- DOM trees are read-only, you can't set attributes or otherwise modify nodes.

(Note that the read-only nature of the DOM trees is purely to avoid a maintenance burden on code with seemingly no practical use - if a compelling use case is presented, modification can easily be implemented.)

| Method                                                                                                                                           | Description                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Selection.attr(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-attr)                                 | Get the value of an attribute for the first element in the Selection.                                                                                  |
| [Selection.children([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-children)                   | Get the children of each element in the set of matched elements, optionally filtered by a selector.                                                    |
| [Selection.closest(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-closest)                       | Get the first element that matches the selector by testing the element itself and traversing up through its ancestors                                  |
| [Selection.contents()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-contents)                             | Get the children of each element in the set of matched elements, including text and comment nodes.                                                     |
| [Selection.data([key])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-data)                                | Return the value at the named data store for the first element in the set of matched elements.                                                         |
| [Selection.each(fn)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-each)                                   | Iterate and execute a function for each matched element.                                                                                               |
| [Selection.eq(index)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-eq)                                    | Reduce the set of matched elements to the one at the specified index.                                                                                  |
| [Selection.filter(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-filter)                         | Reduce the set of matched elements to those that match the selector or pass the function's test.                                                       |
| [Selection.find(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-find)                             | Find the selection descendants, filtered by a selector.                                                                                                |
| [Selection.first()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-first)                                   | Reduce the set of matched elements to the first in the set.                                                                                            |
| [Selection.get(index)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-get)                                  | Retrieve the [Element (k6/html)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element) matched by the selector                      |
| [Selection.has(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-has)                               | Reduce the set of matched elements to those that have a descendant that matches the selector                                                           |
| [Selection.html()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-html)                                     | Get the HTML contents of the first element in the set of matched elements                                                                              |
| [Selection.is(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-is)                                 | Check the current matched set of elements against a selector or element and return true if at least one of these elements matches the given arguments. |
| [Selection.last()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-last)                                     | Reduce the set of matched elements to the final one in the set.                                                                                        |
| [Selection.map(fn)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-map)                                     | Pass each selection in the current matched set through a function, producing a new Array containing the return values.                                 |
| [Selection.nextAll([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-nextall)                     | Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.                                          |
| [Selection.next([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-next)                           | Get the immediately following sibling of each element in the set of matched element                                                                    |
| [Selection.nextUntil([selector], [filter])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-nextuntil)       | Get all following siblings of each element up to but not including the element matched by the selector.                                                |
| [Selection.not(selector)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-not)                               | Remove elements from the set of matched elements                                                                                                       |
| [Selection.parent([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-parent)                       | Get the parent of each element in the current set of matched elements, optionally filtered by a selector.                                              |
| [Selection.parents([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-parents)                     | Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.                                           |
| [Selection.parentsUntil([selector], [filter])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-parentsuntil) | Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector.                 |
| [Selection.prevAll([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-prevall)                     | Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.                                          |
| [Selection.prev([selector])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-prev)                           | Get the immediately preceding sibling of each element in the set of matched elements.                                                                  |
| [Selection.prevUntil([selector], [filter])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-prevuntil)       | Get all preceding siblings of each element up to but not including the element matched by the selector.                                                |
| [Selection.serialize()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-serialize)                           | Encode a set of form elements as a string in standard URL-encoded notation for submission.                                                             |
| [Selection.serializeArray()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-serializearray)                 | Encode a set of form elements as an array of names and values.                                                                                         |
| [Selection.serializeObject()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-serializeobject)               | Encode a set of form elements as an object.                                                                                                            |
| [Selection.size()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-size)                                     | Return the number of elements in the Selection.                                                                                                        |
| [Selection.slice(start [, end])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-slice)                      | Reduce the set of matched elements to a subset specified by a range of indices.                                                                        |
| [Selection.text()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-text)                                     | Get the text content of the selection.                                                                                                                 |
| [Selection.toArray()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-toarray)                               | Retrieve all the elements contained in the Selection, as an array.                                                                                     |
| [Selection.val()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-val)                                       | Get the current value of the first element in the set of matched elements.                                                                             |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body);
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
}
```

{{< /code >}}
