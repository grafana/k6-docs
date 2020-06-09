---
title: "IntelliSense"
excerpt: ""
---

IntelliSense refers to code editing features like **intelligent code completion** and **quick access to documentation**. These features can significantly improve the developer experience and productivity when working on k6 scripts in your editor of choice.

k6 has its [TypeScript Type Definition](https://www.npmjs.com/package/@types/k6) that you can configure with your editor to unlock code editing features. 

## Visual Studio Code

In Visual Studio Code, [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) can provide with:

- Auto-completion of k6 functions, methods, and classes.
- Auto imports of k6 modules.
- Access to k6 documentation when writing and hovering code.

![](./images/intellisense-k6-demo.gif)

### Setup

A way to configure IntelliSense in VS Code to recognize the [k6 Javascript API](/javascript-api) is to install the k6 Types with a package manager. For example:

```shell
# create a `package.json` file
$ npm init --yes

# install the k6 types as dev dependency
$ npm install --save-dev @types/k6
```




## See also

- [Visual Studio Code - k6 Extension](https://marketplace.visualstudio.com/items?itemName=k6.k6)
- [TypeScript Editor Support](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)