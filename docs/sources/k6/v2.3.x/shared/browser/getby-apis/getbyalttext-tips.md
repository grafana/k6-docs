---
title: browser/getby-apis/getbyalttext-tips
---

## Common use cases

- **Image testing:**
  - Testing image alt text for accessibility compliance
  - Interacting with clickable images/banners
- **Accessibility testing:**
  - Ensuring all images have meaningful alt text
  - Testing screen reader compatibility
  - Validating WCAG compliance
- **UI interaction:**
  - Clicking on logo images to navigate home
  - Selecting images in galleries or carousels
  - Interacting with image-based buttons

## Best practices

1. **Use descriptive alt text**: When creating tests, ensure your application uses meaningful alt text that describes the image content or function.
1. **Prefer exact matches**: Use `exact: true` when you need precise matching to avoid false positives.
1. **Accessibility-first**: Using `getByAltText()` encourages better accessibility practices by ensuring images have proper alt attributes.
1. **Regular expressions for patterns**: Use RegExp for flexible matching when dealing with dynamic or numbered content.
1. **Combine with assertions**: Always verify that the located elements behave as expected using assertions.
