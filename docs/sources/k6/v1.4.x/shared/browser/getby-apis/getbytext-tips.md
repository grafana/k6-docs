---
title: browser/getby-apis/getbytext-tips
---

## Text matching behavior

**Whitespace normalization**: Text matching automatically normalizes whitespace, meaning:

- Multiple spaces become single spaces
- Line breaks become spaces
- Leading and trailing whitespace is ignored

Consider the following DOM structure:

<!-- md-k6:skip -->
<!-- eslint-skip -->

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

<!-- md-k6:skip -->
<!-- eslint-skip -->

```js
// Matches <span>
page.getByText('world');
// Matches first <div>
page.getByText('Hello world');
// Matches second <div>
page.getByText('Hello', { exact: true });
// Matches both <div>s
page.getByText(/Hello/);
// Matches second <div>
page.getByText(/^hello$/i);
```

## Common use cases

- **Button interactions**: Submit, Cancel, Delete, Edit buttons
- **Navigation**: Menu items, breadcrumbs, pagination links
- **Content verification**: Success messages, error messages, headings
- **Form interactions**: Checkbox labels, radio button options
- **Status indicators**: Active, Inactive, Pending states

## Best practices

1. **User-focused testing**: Using `getByText()` ensures your tests interact with content as users see it.
1. **Avoid brittle text**: Be cautious with exact text that might change frequently (like dates, counts, or user-generated content).
1. **Use meaningful text**: Prefer descriptive button text and labels over generic terms like "Click here" or "Button".
1. **Handle dynamic content**: Use regular expressions for text that contains variable parts (timestamps, user names, counts).
1. **Consider accessibility**: Text-based selection encourages better accessibility practices in your application.
1. **Internationalization**: For multi-language applications, consider using test IDs or roles instead of text for critical interactions.