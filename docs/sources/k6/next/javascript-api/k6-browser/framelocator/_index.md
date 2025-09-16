---
title: "FrameLocator"
description: "Browser module: FrameLocator Class"
weight: 09
---

# FrameLocator

FrameLocator represents a way to find element(s) in an `iframe`. Frames can be nested, and this locator supports selecting a frame element and then working with it.

A FrameLocator can be created with the `locator.contentFrame()` method.

| Method                                                                                                                                                 | Description                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [locator(selector[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/locator)                             | Returns a new chained `locator` for the given `selector` within the frame.                                             |