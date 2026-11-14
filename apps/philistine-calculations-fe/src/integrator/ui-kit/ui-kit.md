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

## Hierarchy

### Foundation

- [ui-kit-foundation.sass](ui-kit-foundation.sass)
  - [reset-foundation.sass](reset-foundation.sass)
  - identity/[identity-foundation.sass](identity/identity-foundation.sass)
    - identity/[color-palette-foundation.sass](identity/color-palette-foundation.sass)
    - identity/[fonts-foundation.sass](identity/fonts-foundation.sass)
    - identity/[transitions-foundation.sass](identity/transitions-foundation.sass)
  - interactive/[buttons-foundation.sass](interactive/buttons-foundation.sass)
  - interactive/[outline-foundation.sass](interactive/outline-foundation.sass)
  - theming/[theming-foundation.sass](theming/theming-foundation.sass)
  - [ui-kit-utility.sass](ui-kit-utility.sass)

### On demand

- [reset.sass](reset.sass)
- [ui-kit.sass](ui-kit.sass)
  - interactive/form/[form.sass](interactive/form/form.sass)
  - typography/[typography.sass](typography/typography.sass)
    - identity/[fonts.sass](identity/fonts.sass)
- [ui-kit-utility.sass](ui-kit-utility.sass)
- interactive/[buttons.sass](interactive/buttons.sass)
    - identity/[transitions.sass](identity/transitions.sass)
    - interactive/[focus.sass](interactive/focus.sass)
- interactive/form/[form.sass](interactive/form/form.sass)
    - interactive/[focus.sass](interactive/focus.sass)
- layout/[layout.sass](layout/layout.sass)
