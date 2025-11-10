---
title: browser/getby-apis/getbylabel-tips
---

## Label association patterns

The `getByLabel()` method works with several HTML patterns for associating labels with form controls:

1. Explicit association with `for` attribute:

   <!-- eslint-skip -->

   ```html
   <label for="username">Username</label> <input type="text" id="username" name="username" />
   ```

1. ARIA labeling:

   <!-- eslint-skip -->

   ```html
   <span id="username-label">Username</span> <input type="text" aria-labelledby="username-label" />
   ```

1. ARIA label attribute:

   <!-- eslint-skip -->

   ```html
   <input type="text" aria-label="Username" />
   ```

## Common use cases

- **Form testing**: Login forms, registration forms, contact forms
- **E-commerce**: Checkout forms, shipping information, payment details
- **Settings pages**: User preferences, account settings, configuration forms
- **Accessibility testing**: Ensuring proper label association and screen reader compatibility

## Best practices

1. **Accessibility-first approach**: Using `getByLabel()` ensures your tests work the same way users with assistive technology interact with forms.
1. **Meaningful labels**: Encourage developers to use descriptive, unique label text that clearly identifies the form control's purpose.
1. **Required field indicators**: When testing required fields, include any visual indicators (like asterisks) in your label text matching.
1. **Form validation testing**: Use labels to test form validation scenarios, as they provide a stable way to identify fields regardless of styling changes.