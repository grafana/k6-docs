---
title: browser/getby-apis/getbyrole-tips
---

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
await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
await page.getByRole('searchbox', { name: 'Search products' }).fill('laptop');

// Selections
await page.getByRole('checkbox', { name: 'Agree to terms' }).check();
await page.getByRole('radio', { name: 'Standard shipping' }).check();
await page.getByRole('combobox', { name: 'Country' }).selectOption('US');

// Interactive controls
await page.getByRole('slider', { name: 'Volume' }).fill('75');
await page.getByRole('switch', { name: 'Enable notifications' }).click();
```

- **Navigation Testing:**

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
// Tabs
await page.getByRole('tab', { name: 'Overview' }).click();
await expect(page.getByRole('tabpanel', { name: 'Overview' })).toBeVisible();
```

- **Content Verification:**

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
// Structure
await expect(page.getByRole('article')).toHaveCount(5);
await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome');

// Status and feedback
await expect(page.getByRole('alert')).toHaveText('Form submitted successfully');
await expect(page.getByRole('status')).toHaveText('3 items selected');
```

## Best practices

1. **Prefer role-based selection**: `getByRole()` is the preferred method for locating elements as it closely mirrors how users and assistive technology interact with your page.
1. **Use accessible names**: Always try to use the `name` option to make your tests more specific and reliable.
1. **Consider accessibility**: Using `getByRole()` encourages better accessibility practices in your application by ensuring elements have proper ARIA roles.