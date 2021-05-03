---
title: 'Selection'
description: 'A jQuery-like API for accessing HTML DOM elements.'
excerpt: 'A jQuery-like API for accessing HTML DOM elements.'
---

Represents a set of nodes in a DOM tree.

Selections have a jQuery-compatible API, but with two caveats:

- CSS and screen layout are not processed, thus calls like css() and offset() are unavailable.
- DOM trees are read-only, you can't set attributes or otherwise modify nodes.

(Note that the read-only nature of the DOM trees is purely to avoid a maintenance burden on code with seemingly no practical use - if a compelling use case is presented, modification can easily be implemented.)

| Method                                                                                                                   | Description                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Selection.attr(name)](/javascript-api/k6-html/selection/selection-attr-name)                                            | Get the value of an attribute for the first element in the Selection.                                                                                  |
| [Selection.children([selector])](/javascript-api/k6-html/selection/selection-children-selector)                          | Get the children of each element in the set of matched elements, optionally filtered by a selector.                                                    |
| [Selection.closest(selector)](/javascript-api/k6-html/selection/selection-closest-selector)                              | Get the first element that matches the selector by testing the element itself and traversing up through its ancestors                                  |
| [Selection.contents()](/javascript-api/k6-html/selection/selection-contents)                                             | Get the children of each element in the set of matched elements, including text and comment nodes.                                                     |
| [Selection.data([key])](/javascript-api/k6-html/selection/selection-data-key)                                            | Return the value at the named data store for the first element in the set of matched elements.                                                         |
| [Selection.each(fn)](/javascript-api/k6-html/selection/selection-each-fn)                                                | Iterate and execute a function for each matched element.                                                                                               |
| [Selection.eq(index)](/javascript-api/k6-html/selection/selection-eq-index)                                              | Reduce the set of matched elements to the one at the specified index.                                                                                  |
| [Selection.filter(selector)](/javascript-api/k6-html/selection/selection-filter-selector)                                | Reduce the set of matched elements to those that match the selector or pass the function's test.                                                       |
| [Selection.find(selector)](/javascript-api/k6-html/selection/selection-find-selector)                                    | Find the selection descendants, filtered by a selector.                                                                                                |
| [Selection.first()](/javascript-api/k6-html/selection/selection-first)                                                   | Reduce the set of matched elements to the first in the set.                                                                                            |
| [Selection.get(index)](/javascript-api/k6-html/selection/selection-get-index)                                            | Retrieve the [Element (k6/html)](/javascript-api/k6-html/element) matched by the selector                                                              |
| [Selection.has(selector)](/javascript-api/k6-html/selection/selection-has-selector)                                      | Reduce the set of matched elements to those that have a descendant that matches the selector                                                           |
| [Selection.html()](/javascript-api/k6-html/selection/selection-html)                                                     | Get the HTML contents of the first element in the set of matched elements                                                                              |
| [Selection.is(selector)](/javascript-api/k6-html/selection/selection-is-selector)                                        | Check the current matched set of elements against a selector or element and return true if at least one of these elements matches the given arguments. |
| [Selection.last()](/javascript-api/k6-html/selection/selection-last)                                                     | Reduce the set of matched elements to the final one in the set.                                                                                        |
| [Selection.map(fn)](/javascript-api/k6-html/selection/selection-map-fn)                                                  | Pass each element in the current matched set through a function, producing a new Array containing the return values.                                   |
| [Selection.nextAll([selector])](/javascript-api/k6-html/selection/selection-nextall-selector)                            | Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.                                          |
| [Selection.next([selector])](/javascript-api/k6-html/selection/selection-next-selector)                                  | Get the immediately following sibling of each element in the set of matched element                                                                    |
| [Selection.nextUntil([selector], [filter])](/javascript-api/k6-html/selection/selection-nextuntil-selector-filter)       | Get all following siblings of each element up to but not including the element matched by the selector.                                                |
| [Selection.not(selector)](/javascript-api/k6-html/selection/selection-not-selector)                                      | Remove elements from the set of matched elements                                                                                                       |
| [Selection.parent([selector])](/javascript-api/k6-html/selection/selection-parent-selector)                              | Get the parent of each element in the current set of matched elements, optionally filtered by a selector.                                              |
| [Selection.parents([selector])](/javascript-api/k6-html/selection/selection-parents-selector)                            | Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.                                           |
| [Selection.parentsUntil([selector], [filter])](/javascript-api/k6-html/selection/selection-parentsuntil-selector-filter) | Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector.                 |
| [Selection.prevAll([selector])](/javascript-api/k6-html/selection/selection-prevall-selector)                            | Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.                                          |
| [Selection.prev([selector])](/javascript-api/k6-html/selection/selection-prev-selector)                                  | Get the immediately preceding sibling of each element in the set of matched elements.                                                                  |
| [Selection.prevUntil([selector], [filter])](/javascript-api/k6-html/selection/selection-prevuntil-selector-filter)       | Get all preceding siblings of each element up to but not including the element matched by the selector.                                                |
| [Selection.size()](/javascript-api/k6-html/selection/selection-size)                                                     | Return the number of elements in the Selection.                                                                                                        |
| [Selection.serialize()](/javascript-api/k6-html/selection/selection-size)                                                | Encode a set of form elements as a string in standard URL-encoded notation for submission.                                                             |
| [Selection.serializeArray()](/javascript-api/k6-html/selection/selection-size)                                           | Encode a set of form elements as an array of names and values.                                                                                         |
| [Selection.serializeObject()](/javascript-api/k6-html/selection/selection-serializeobject)                               | Encode a set of form elements as an object.                                                                                                            |
| [Selection.slice(start [, end])](/javascript-api/k6-html/selection/selection-slice-start-end)                            | Reduce the set of matched elements to a subset specified by a range of indices.                                                                        |
| [Selection.text()](/javascript-api/k6-html/selection/selection-text)                                                     | Get the text content of the selection.                                                                                                                 |
| [Selection.toArray()](/javascript-api/k6-html/selection/selection-toarray)                                               | Retrieve all the elements contained in the Selection, as an array.                                                                                     |
| [Selection.val()](/javascript-api/k6-html/selection/selection-val)                                                       | Get the current value of the first element in the set of matched elements.                                                                             |

### Example

<CodeGroup labels={[]}>

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

</CodeGroup>
