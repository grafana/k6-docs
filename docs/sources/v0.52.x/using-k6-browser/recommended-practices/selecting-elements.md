---
title: 'Selecting elements'
description: 'A guide on how to select elements with the browser module.'
weight: 03
---

# Selecting elements

Selectors are strings that represents a specific DOM element on the page. When writing browser-level tests, it's recommended to use selectors that are robust to avoid test flakiness when the DOM structure changes.

Currently, the browser module supports the standard **CSS and XPath selectors**.

{{% admonition type="note" %}}

Text-based selectors are currently not supported. This will be supported in future releases.

{{% /admonition %}}

## Recommended practices

The selectors that you choose should not be tightly coupled to any behaviour or styling changes. If your application is prone to changes frequently, it's recommended to use user-facing attributes or custom data attributes as these are not tightly coupled to the element.

| Selector                                       | Notes                                                                                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ `page.locator('[aria-label="Login"]')`      | User-facing attributes such as ARIA labels are rarely changed so these are great candidates.                                                            |
| ✅ `page.locator('[data-test="login"]')`       | Custom data attributes are not tightly coupled to the element.                                                                                          |
| ✅ `page.locator('//button[text()="Submit"]')` | Text selectors are also great as text content rarely changes. While we don't support text-based selectors as of yet, xpath can be used as a workaround. |
| ⚠️ `page.locator('#login-btn')`                | Selecting an element via its ID is also recommended if the ID doesn't change.                                                                           |
| ⚠️ `page.locator('.login-btn')`                | Selecting an element via its class name should be kept to a minimum as class names can be duplicated.                                                   |
| ❌ `page.locator('button')`                    | Generic elements are not recommended because this has no context.                                                                                       |
| ❌ `page.locator('/html[1]/body[1]/main[1]`    | Absolute paths are not recommended as these are tightly coupled to the DOM structure.                                                                   |
