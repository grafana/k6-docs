## 🐛 Known issues

### [mdx-js/mdx](https://github.com/mdx-js/mdx/)

- **Issue found on:** 22 November, 2022
- **Problematic version:** `2.1.5`
- **Last stable version:** `1.6.22`

We've encountered some problems with `JavaScript heap out of memory` – in some cases it's happen in others it isn't work correctly and failed with `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` (looks like this [issue](https://github.com/mdx-js/mdx/discussions/2071)). So at the time of the update we were using the stable version `1.6.22` of this package. We've not studied the problem in detail.

The last dependencies upgrade exclude the latest version of `React` (blocked by [@mdx-js/react](https://github.com/mdx-js/mdx/blob/c91b00c673bcf3e7c28b861fd692b69016026c45/packages/react/package.json#L35)) and `Gatsby` (blocked by [React](https://github.com/gatsbyjs/gatsby/blob/a259ff8e9c08b169cc767ea4f450ce3e509877bc/packages/gatsby/package.json#L250))