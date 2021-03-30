---
title: 'IntelliSense'
excerpt: ''
---

IntelliSense se refiere a las características de edición de código como la finalización inteligente de código y el acceso rápido a la documentación. Estas características pueden mejorar significativamente la experiencia del desarrollador y la productividad cuando se trabaja con scripts de k6 en su editor de elección. Las características más destacadas son las siguientes:

- Autocompletado de funciones, métodos y clases de k6.
- Importación automática de módulos k6.
- Acceso a la documentación de k6 cuando se escribe y cuando deslizas el mouse por encima del código.

![](./images/intellisense-k6-demo.gif)

## VS Code e IntelliJ

k6 tiene un [TypeScript Type Definition](https://www.npmjs.com/package/@types/k6) que puedes configurar con tu editor para desbloquear las funciones de edición de código.

En Visual Studio Code e IntelliJ IDEA Ultimate, puedes configurar IntelliSense para que reconozca la API JavaScript de k6 instalando los tipos de k6 con un gestor de paquetes.

```bash
# create a `package.json` file
$ npm init --yes

# install the k6 types as dev dependency
$ npm install --save-dev @types/k6
```

## Véase también

- [Visual Studio Code - k6 Extension](https://marketplace.visualstudio.com/items?itemName=k6.k6)
- [IntelliJ IDEA - k6 Plugin](https://plugins.jetbrains.com/plugin/16141-k6)
- [TypeScript Editor Support](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)
