---
title: SharedArray
---

`SharedArray` is an array-like object that shares the underlying memory between VUs. It constructor
takes a name for the `SharedArray` and a function which needs to return an array object itself. The
function will be executed only once and it's result will be then be saved in memory once and copies
of the elements will be given when requested. The name is needed as VUs are completely separate js
VMs and k6 needs some way to identify the `SharedArray`s that it needs to return. 

This does mean that you can have multiple such ones and even only load some of them for given VUs, although that is
unlikely to have any performance benefit.

Everything about `SharedArray` is read-only once it is constructed, so it is not possible to
communicate between VUs using it.

Supported operations include:
1. getting the number of elements with `length`
2. getting an element by it's index using the normal syntax `array[index]`
3. using `for-of` loops

Which means that for the most part if you currently have an array data structure that you want to
take less memory you can just wrap it in `SharedArray` and it should work for most cases.

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import { SharedArray } from "k6/data";

var data = new SharedArray("some name", function() {
    // here you can open files, and then do additional processing on them or just generate the data dynamically 
    var f = JSON.parse(open("./somefile.json")).;
    return f; // f must be an array
});

export default () => {
    var element = data[Math.floor(Math.random() * data.length)]
    // do something with element
}
```

</div>
