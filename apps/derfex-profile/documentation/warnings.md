# `derfex` profile front-end

## Warnings

What to pay attention to during development.

### Responsive design, mobile first

The recommended supported minimum width for browser tab content is `320px`.
Please take into account the presence of a vertical scrollbar.

Pay attention to text loaded via the back-end API: long words are one of the causes of a horizontal scrollbar.
In such situations, it is recommended to use soft hyphens: `\u00AD`.

### Angular

Pay attention to setting the `style` attribute value, collected from a value in JSON.

`[style]="…"`
