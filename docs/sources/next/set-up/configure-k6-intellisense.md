---
aliases:
  - ./intellisense
  - ../misc/intellisense # docs/k6/<K6_VERSION>/misc/intellisense
title: 'Configure k6 IntelliSense'
description: 'k6 has its TypeScript Type Definition that you can configure with your editor to unlock code editing features.'
weight: 100
---

# Configure k6 IntelliSense

[IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) refers to code editing features like **intelligent code completion** and **quick access to documentation**. These features can significantly improve the developer experience and productivity when working on k6 scripts in your editor of choice. Notable features are:

- Auto-completion of k6 functions, methods, and classes.
- Auto imports of k6 modules.
- Access to k6 documentation when writing and hovering code.

![Intellisense enabled in a code editor, showing autocompletion of k6 libraries](/media/docs/k6-oss/intellisense-k6-demo.gif)

## VS Code & IntelliJ

k6 has its [TypeScript Type Definition](https://www.npmjs.com/package/@types/k6) that you can configure with your editor to unlock code editing features.

In Visual Studio Code and IntelliJ IDEA Ultimate, you can configure IntelliSense to recognize the [k6 JavaScript API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api) by installing the k6 Types with a package manager.

```bash
# create a `package.json` file
$ npm init --yes

# install the k6 types as dev dependency
$ npm install --save-dev @types/k6
```

## Read more

- [Visual Studio Code - k6 Extension](https://marketplace.visualstudio.com/items?itemName=k6.k6)
- [IntelliJ IDEA - k6 Plugin](https://plugins.jetbrains.com/plugin/16141-k6)
- [TypeScript Editor Support](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)
