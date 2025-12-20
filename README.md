# Design Tokens - Alkhwarizmi Design System

This repository contains the design tokens for the Alkhwarizmi Design System, structured to mirror the Figma variable collections: **Primitive**, **Alias**, **Component-Specific**, and **Universal**.

## Structure

The design tokens are organized into four collections that mirror the Figma variable structure:

```
tokens/
├── primitive/          # Raw design values (colors, spacing, typography)
├── alias/              # Semantic tokens referencing Primitive
├── component-specific/ # Component-level tokens referencing Alias
└── universal/          # Universal tokens aggregating from all collections
```

### Collection Hierarchy

```
Primitive (Raw Values)
    ↓ referenced by
Alias (Semantic Tokens)
    ↓ referenced by
Component-Specific (Component Tokens)
    ↓ aggregated into
Universal (Universal Access - ALL_SCOPES)
```

## Collections

### 1. Primitive Collection

**Location**: `tokens/primitive/`

Contains raw, unprocessed design values with no semantic meaning:
- **Colors**: Raw color values (hex codes)
- **Spacing**: Raw spacing values (pixels)
- **Typography**: Font sizes, line heights, font families, font weights
- **Border Radius**: Raw border radius values
- **Opacity**: Raw opacity values

**Example**:
```json
{
  "colors": {
    "blue": {
      "500": { "value": "#3B82F6", "type": "color" }
    }
  }
}
```

### 2. Alias Collection

**Location**: `tokens/alias/`

Contains semantic tokens that reference Primitive tokens:
- **Colors**: Semantic color references (primary, secondary, text colors, etc.)
- **Spacing**: Semantic spacing references (xs, sm, md, lg, etc.)
- **Typography**: Semantic typography references (headings, body text, etc.)
- **Border Radius**: Semantic border radius references

**Example**:
```json
{
  "colors": {
    "primary": {
      "$value": "{primitive.colors.blue.500}",
      "$type": "color"
    }
  }
}
```

### 3. Component-Specific Collection

**Location**: `tokens/component-specific/`

Contains tokens specific to individual components:
- **Button**: Button-specific tokens (backgrounds, text, padding, etc.)
- **Card**: Card-specific tokens (background, border, shadow, etc.)
- **Input**: Input-specific tokens (background, border, padding, etc.)

**Example**:
```json
{
  "button": {
    "primary": {
      "background": {
        "default": { "$value": "{alias.colors.primary}", "$type": "color" }
      }
    }
  }
}
```

### 4. Universal Collection

**Location**: `tokens/universal/`

Aggregates commonly used tokens from all collections for universal access (equivalent to `ALL_SCOPES` in Figma):
- References frequently used tokens from Primitive, Alias, and Component-Specific collections
- Provides one-stop access to common design tokens
- Simplifies designer and developer workflows

**Example**:
```json
{
  "universal": {
    "colors": {
      "primary": {
        "$value": "{alias.colors.primary}",
        "$type": "color"
      }
    }
  }
}
```

## Usage

### Generating CSS Variables

Generate CSS custom properties from design tokens:

```bash
npm run generate:css
```

This creates `dist/design-tokens.css` with CSS variables like:
```css
:root {
  --token-primitive-colors-blue-500: #3B82F6;
  --token-alias-colors-primary: #3B82F6;
  --token-component-button-primary-background-default: #3B82F6;
}
```

### Generating TypeScript Types

Generate TypeScript type definitions:

```bash
npm run generate:types
```

This creates `dist/design-tokens.d.ts` with type-safe interfaces.

### Generate All

Generate both CSS variables and TypeScript types:

```bash
npm run generate
```

## Integration with Angular

### 1. Import CSS Variables

In your Angular application's `styles.scss` or `angular.json`:

```scss
@import '~@alkhwarizmi/design-tokens/dist/design-tokens.css';
```

Or in `angular.json`:
```json
{
  "styles": [
    "node_modules/@alkhwarizmi/design-tokens/dist/design-tokens.css"
  ]
}
```

### 2. Use CSS Variables in Components

```scss
.my-component {
  background-color: var(--token-alias-colors-primary);
  padding: var(--token-alias-spacing-md);
  border-radius: var(--token-alias-border-radius-base);
}
```

### 3. Use TypeScript Types (Optional)

```typescript
import { AliasTokens } from '@alkhwarizmi/design-tokens/dist/design-tokens';

const primaryColor: string = 'var(--token-alias-colors-primary)';
```

## Token Reference Syntax

Tokens use a reference syntax to connect collections:

- `{primitive.colors.blue.500}` - References a Primitive token
- `{alias.colors.primary}` - References an Alias token
- `{component.button.primary.background.default}` - References a Component-Specific token

## Syncing with Figma

### Manual Sync Process

1. Export variables from Figma using Figma's Variables API or manual export
2. Update the corresponding JSON files in the `tokens/` directory
3. Run `npm run generate` to regenerate CSS and TypeScript files

### Automated Sync (Future)

Future integration with Figma API for automatic token synchronization.

## File Structure

```
.
├── tokens/                    # Design token JSON files
│   ├── primitive/            # Primitive collection
│   │   ├── colors.json
│   │   ├── spacing.json
│   │   ├── typography.json
│   │   ├── border-radius.json
│   │   ├── opacity.json
│   │   └── index.json
│   ├── alias/                 # Alias collection
│   │   ├── colors.json
│   │   ├── spacing.json
│   │   ├── typography.json
│   │   ├── border-radius.json
│   │   └── index.json
│   ├── component-specific/   # Component-Specific collection
│   │   ├── button.json
│   │   ├── card.json
│   │   ├── input.json
│   │   └── index.json
│   ├── universal/             # Universal collection
│   │   └── index.json
│   └── index.json            # Main index
├── scripts/                   # Build scripts
│   ├── generate-css-variables.js
│   └── generate-typescript-types.ts
├── dist/                      # Generated output (gitignored)
│   ├── design-tokens.css
│   └── design-tokens.d.ts
├── package.json
└── README.md
```

## Best Practices

### 1. Token Naming

- Use descriptive, semantic names in Alias collection
- Use consistent naming conventions across collections
- Follow kebab-case for CSS variable names

### 2. Token References

- Always reference tokens from the appropriate collection level
- Primitive → Alias → Component-Specific → Universal
- Never create circular references

### 3. Adding New Tokens

1. **Primitive**: Add raw values to `tokens/primitive/`
2. **Alias**: Reference Primitive tokens in `tokens/alias/`
3. **Component-Specific**: Reference Alias tokens in `tokens/component-specific/`
4. **Universal**: Add commonly used tokens to `tokens/universal/`

### 4. Maintaining Consistency

- Keep token values synchronized with Figma
- Update all references when changing Primitive values
- Run `npm run generate` after making changes

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

## Connection Points

The design token structure maintains clear connection points between collections:

1. **Primitive → Alias**: Alias tokens reference Primitive tokens using `{primitive.*}` syntax
2. **Alias → Component-Specific**: Component tokens reference Alias tokens using `{alias.*}` syntax
3. **Universal → All**: Universal tokens aggregate from all collections using `{primitive.*}`, `{alias.*}`, and `{component.*}` syntax

This structure ensures:
- Single source of truth (Primitive collection)
- Automatic cascading updates through references
- Clear separation of concerns
- Scalable and maintainable design system

## License

MIT

