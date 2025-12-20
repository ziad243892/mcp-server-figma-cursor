# Quick Start Guide

## Setup Steps

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

4. **Open browser**:
   Navigate to `http://localhost:4200`

## Project Structure

```
├── tokens/                    # Design tokens (Primitive, Alias, Component-Specific, Universal)
├── scripts/                   # Token generation scripts
├── src/
│   ├── app/
│   │   ├── components/        # Angular components (Button, Card, Input)
│   │   └── app.component.*    # Root component
│   └── styles.scss            # Global styles with token imports
├── angular.json               # Angular configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Key Commands

- `npm start` - Start dev server
- `npm run build` - Build for production
- `npm run generate:tokens` - Generate CSS/TypeScript from tokens
- `npm test` - Run tests

## Design Token Usage

Components use CSS variables from design tokens:

```scss
.my-component {
  background: var(--token-alias-colors-primary);
  padding: var(--token-alias-spacing-md);
}
```

## Next Steps

1. Import actual tokens from Figma
2. Build additional components
3. Customize component styles

