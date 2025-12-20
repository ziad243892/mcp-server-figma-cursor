# Angular Project Setup

## Overview

This Angular project is configured to use the design tokens from the Figma variable structure. The project includes example components (Button, Card, Input) that demonstrate how to use design tokens in Angular components.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── button/          # Button component using design tokens
│   │   ├── card/            # Card component using design tokens
│   │   └── input/           # Input component using design tokens
│   ├── app.component.*      # Root app component
│   └── app.module.ts        # Root Angular module
├── assets/                  # Static assets
├── styles.scss              # Global styles with design token imports
├── index.html               # HTML entry point
└── main.ts                  # Application bootstrap
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+ (installed globally or via npx)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate design tokens** (CSS variables and TypeScript types):
   ```bash
   npm run generate:tokens
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200`

### Build Scripts

- `npm start` - Start development server
- `npm run build` - Build for production (generates tokens first)
- `npm run generate:tokens` - Generate CSS variables and TypeScript types
- `npm test` - Run unit tests

## Design Token Integration

### CSS Variables

Design tokens are automatically imported via `src/styles.scss`:

```scss
@import '../dist/design-tokens.css';
```

This makes all design token CSS variables available throughout the application.

### Using Tokens in Components

Components use CSS variables from design tokens:

```scss
.my-component {
  background-color: var(--token-alias-colors-primary);
  padding: var(--token-alias-spacing-md);
  border-radius: var(--token-alias-border-radius-base);
}
```

### Token Naming Convention

CSS variables follow this pattern:
- `--token-{collection}-{category}-{name}`

Examples:
- `--token-primitive-colors-blue-500`
- `--token-alias-colors-primary`
- `--token-component-button-primary-background-default`

## Components

### Button Component

**Selector**: `<alk-button>`

**Inputs**:
- `variant`: 'primary' | 'secondary' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Usage**:
```html
<alk-button variant="primary" size="md">Click Me</alk-button>
<alk-button variant="secondary" size="sm" [disabled]="true">Disabled</alk-button>
```

### Card Component

**Selector**: `<alk-card>`

**Usage**:
```html
<alk-card>
  <h4>Card Title</h4>
  <p>Card content goes here.</p>
</alk-card>
```

### Input Component

**Selector**: `<alk-input>`

**Inputs**:
- `label`: string (optional)
- `placeholder`: string (default: '')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `type`: string (default: 'text')
- `value`: string (default: '')

**Usage**:
```html
<alk-input 
  label="Email" 
  placeholder="Enter your email"
  size="md"
  type="email">
</alk-input>
```

## Design Token Collections

The application uses tokens from four collections:

1. **Primitive** - Raw design values
2. **Alias** - Semantic tokens (most commonly used)
3. **Component-Specific** - Component-level tokens
4. **Universal** - Universal access tokens

Components primarily use tokens from:
- **Alias collection** for semantic values (colors, spacing, etc.)
- **Component-Specific collection** for component-specific styling
- **Primitive collection** for direct raw values when needed

## Development Workflow

1. **Update design tokens** in `tokens/` directory
2. **Generate CSS/TypeScript** from tokens:
   ```bash
   npm run generate:tokens
   ```
3. **Use tokens in components** via CSS variables
4. **Test components** in the application

## Building Components from Figma

When importing components from Figma:

1. **Extract design tokens** from Figma variables
2. **Update token files** in `tokens/` directory
3. **Regenerate CSS variables**:
   ```bash
   npm run generate:tokens
   ```
4. **Create Angular component** using the tokens
5. **Reference Figma component** for structure and styling

## Best Practices

1. **Always use Alias tokens** in components (not Primitive directly)
2. **Use Component-Specific tokens** for component-specific styling
3. **Reference Universal tokens** for commonly used values
4. **Keep token references consistent** across components
5. **Update tokens before building** components

## Troubleshooting

### CSS Variables Not Found

If CSS variables are not available:
1. Run `npm run generate:tokens` to generate CSS file
2. Ensure `dist/design-tokens.css` exists
3. Check that `src/styles.scss` imports the CSS file

### Component Styles Not Applying

1. Check that CSS variables are correctly referenced
2. Verify token names match generated CSS variables
3. Use browser DevTools to inspect computed CSS variable values

### Build Errors

1. Ensure design tokens are generated before building:
   ```bash
   npm run generate:tokens
   npm run build
   ```

## Next Steps

- Import actual design tokens from Figma
- Build additional components using the token system
- Set up automated Figma token sync
- Add component documentation
- Create component library package

