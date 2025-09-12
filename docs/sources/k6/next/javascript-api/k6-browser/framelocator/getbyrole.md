---
title: 'getByRole(role[, options])'
description: 'Browser module: frameLocator.getByRole(role[, options]) method'
---

# getByRole(role[, options])

Returns a locator for elements with the specified ARIA role. This is the preferred way to locate elements as it most closely resembles how users and assistive technology perceive the page.

| Parameter               | Type           | Default | Description                                                                                                                       |
| ----------------------- | -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `role`                  | string         | -       | Required. The ARIA role to search for. For example, `'button'`, `'link'`, `'heading'`, or `'textbox'`.                            |
| options                 | object         | `null`  |                                                                                                                                   |
| `options.checked`       | boolean        | `null`  | Filter elements by their checked state. Only applicable for roles like `checkbox`, `radio`, `menuitemcheckbox`.                   |
| `options.disabled`      | boolean        | `null`  | Filter elements by their disabled state.                                                                                          |
| `options.exact`         | boolean        | `false` | Whether to match the accessible name exactly with case sensitivity. When `true`, performs a case-sensitive match.                 |
| `options.expanded`      | boolean        | `null`  | Filter elements by their expanded state. Only applicable for roles that support the `aria-expanded` attribute.                    |
| `options.includeHidden` | boolean        | `false` | Whether to include elements that are normally excluded from the accessibility tree in the search.                                 |
| `options.level`         | number         | `null`  | Filter headings by their level 1 to 6. Only applicable for `heading` role.                                                        |
| `options.name`          | string\|RegExp | `null`  | Filter elements by their accessible name. The accessible name is typically the text content, label text, or aria-label attribute. |
| `options.pressed`       | boolean        | `null`  | Filter elements by their pressed state. Only applicable for roles like `button` with toggle behavior.                             |
| `options.selected`      | boolean        | `null`  | Filter elements by their selected state. Only applicable for roles like `option`, `tab`.                                          |

## Returns

| Type                                                                                   | Description                                                                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the elements matching the specified role and options. |

## Examples

### Basic role selection

Find and click a button by its role:

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.setContent(`
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const frameLocator = page.locator('#my_frame').contentFrame();
    await frameLocator.getByRole('button', { name: 'Pizza, Please!' }).click();
  } finally {
    page.close();
  }
}
```

## Complete ARIA roles reference

The following roles are supported and can be used with `getByRole()`, organized by category:

### Widgets & Inputs

- `button` - Buttons and clickable elements
- `checkbox` - Checkable boxes that can be on/off
- `combobox` - Editable drop-down menu combining input and list box
- `listbox` - Container for selectable list options
- `menu` - Menu of actions or navigation
- `menubar` - Container for top-level menus
- `menuitem` - Option within a menu
- `menuitemcheckbox` - Checkable menu item
- `menuitemradio` - Mutually exclusive menu item
- `meter` - Scalar measurement within a known range
- `option` - Selectable option in a list box or combo box
- `progressbar` - Progress indicator of an operation
- `radio` - Single-select option in a group
- `radiogroup` - Grouping of related radio buttons
- `scrollbar` - Control for scrolling content
- `searchbox` - Text field for search input
- `separator` - Divider that separates content or controls
- `slider` - Adjustable value control within a range
- `spinbutton` - Numeric input with increment/decrement controls
- `status` - Advisory status information (non-alert)
- `switch` - On/off toggle control
- `tab` - A tab in a tabbed interface
- `tablist` - Container for a set of tabs
- `tabpanel` - Content panel associated with a tab
- `textbox` - Input field for free-form text
- `timer` - Running time display that updates
- `toolbar` - Group of interactive controls
- `tooltip` - Contextual help popup
- `tree` - Hierarchical list of items
- `treeitem` - Item in a tree

### Tables & Grids

- `table` - Tabular data with rows and columns.
- `rowgroup` - Section that groups rows. For example, `thead`, `tbody`, `tfoot`.
- `row` - A row of cells within a table or grid.
- `rowheader` - Header cell for a row.
- `columnheader` - Header cell for a column.
- `cell` - Data cell in a table.
- `grid` - Interactive, tabular widget, such as a spreadsheet.
- `gridcell` - Cell within a grid.
- `treegrid` - Tree-structured grid with expandable rows.

### Document Structure & Semantics

- `article` - Self-contained composition (article)
- `blockquote` - Quotation from another source
- `caption` - Caption for a figure, table, or media
- `code` - Fragment of computer code
- `definition` - Definition of a term
- `deletion` - Content removed from a document
- `directory` - List of references
- `document` - Standalone document content
- `emphasis` - Content with emphatic stress
- `feed` - Stream of articles or entries
- `figure` - Figure with optional caption
- `generic` - Generic container with no specific semantics
- `img` - Image treated as a single graphic
- `insertion` - Content added to a document
- `link` - Hyperlink to another location
- `list` - List of items
- `listitem` - A single item within a list
- `mark` - Highlighted or marked content
- `marquee` - Scrolling region of text
- `math` - Mathematical expression
- `note` - An aside or annotation
- `none` - No semantic role; remove semantics
- `paragraph` - Paragraph of text
- `presentation` - Presentational only; ignore semantics
- `strong` - Content of strong importance
- `subscript` - Subscripted text
- `superscript` - Superscripted text
- `term` - A term being defined
- `time` - A time or date

### Landmarks & Regions

- `banner` - Site header landmark
- `complementary` - Complementary content (sidebar)
- `contentinfo` - Page footer information
- `form` - Region containing a form
- `main` - Main content landmark
- `navigation` - Navigation region of links
- `region` - Generic region of the page
- `search` - Search region
- `application` - Application container widget

### Usage Examples by Category

- **Form Testing:**

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
// Text inputs
await frameLocator.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
await frameLocator.getByRole('searchbox', { name: 'Search products' }).fill('laptop');

// Selections
await frameLocator.getByRole('checkbox', { name: 'Agree to terms' }).check();
await frameLocator.getByRole('radio', { name: 'Standard shipping' }).check();
await frameLocator.getByRole('combobox', { name: 'Country' }).selectOption('US');

// Interactive controls
await frameLocator.getByRole('slider', { name: 'Volume' }).fill('75');
await frameLocator.getByRole('switch', { name: 'Enable notifications' }).click();
```

- **Navigation Testing:**

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
// Tabs
await frameLocator.getByRole('tab', { name: 'Overview' }).click();
await expect(frameLocator.getByRole('tabpanel', { name: 'Overview' })).toBeVisible();
```

- **Content Verification:**

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
// Structure
await expect(frameLocator.getByRole('article')).toHaveCount(5);
await expect(frameLocator.getByRole('heading', { level: 1 })).toHaveText('Welcome');

// Status and feedback
await expect(frameLocator.getByRole('alert')).toHaveText('Form submitted successfully');
await expect(frameLocator.getByRole('status')).toHaveText('3 items selected');
```

## Best practices

1. **Prefer role-based selection**: `getByRole()` is the preferred method for locating elements as it closely mirrors how users and assistive technology interact with your page.
1. **Use accessible names**: Always try to use the `name` option to make your tests more specific and reliable.
1. **Consider accessibility**: Using `getByRole()` encourages better accessibility practices in your application by ensuring elements have proper ARIA roles.

## Related

- [frameLocator.getByAltText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyalttext/) - Locate by alt text
- [frameLocator.getByLabel()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbylabel/) - Locate by form labels
- [frameLocator.getByPlaceholder()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbyplaceholder/) - Locate by placeholder text
- [frameLocator.getByTestId()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytestid/) - Locate by test ID
- [frameLocator.getByText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytext/) - Locate by text content
- [frameLocator.getByTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/getbytitle/) - Locate by title attribute
