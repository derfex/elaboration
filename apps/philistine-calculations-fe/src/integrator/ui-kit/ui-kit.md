# UI kit

The `ui-kit` folder contains helpers for building the UI kit and, consequently, the application's UI.
It stores:
- CSS custom properties
- SASS mixins
- Components

## Explicit use

To make usage explicit, the contents of the files are wrapped in mixins,
which are explicitly called in the consuming files.

## Naming

### `*-foundation.sass`

Files with the `*-foundation.sass` postfix are loaded once at the application start.
They contain fundamental definitions such as CSS custom properties and basic CSS rules.
