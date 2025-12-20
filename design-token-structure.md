# Design Token Structure Summary
## Design System - Alkhwarizmi

This document summarizes the design token structure from the Figma file, with particular attention to the connection points between variable collections: **Primitive**, **Alias**, **Component-Specific**, and **Universal** collections.

---

## Overview

The design system uses a four-tier collection hierarchy that creates a clear separation of concerns and enables scalable token management. Each collection serves a specific purpose and connects to others through variable references (aliases).

---

## The Four Core Collections

### 1. Primitive Collection

**Purpose**: Foundation layer containing raw, unprocessed design values.

**Characteristics**:
- Contains the most basic design values (raw colors, spacing numbers, typography scales)
- No semantic meaning attached to values
- Single source of truth for all primitive values
- Values are typically numeric or color codes (hex, RGB, etc.)

**Examples**:
- `blue-500` (color value: #3B82F6)
- `spacing-16` (numeric value: 16)
- `font-size-14` (numeric value: 14)
- `border-radius-8` (numeric value: 8)

**Scope**: Typically scoped to specific contexts or has limited scope

---

### 2. Alias Collection

**Purpose**: Semantic layer that provides meaning and context to primitive values.

**Characteristics**:
- Contains semantic tokens that **reference** variables from the Primitive collection
- Provides contextual meaning (e.g., "primary color", "text size")
- Acts as a bridge between raw values and design intent
- Enables easier maintenance and theme switching

**Connection to Primitive**:
- Variables in Alias collection **directly reference** variables from Primitive collection
- Example: `primary-color` (Alias) → references → `blue-500` (Primitive)
- Example: `heading-text-size` (Alias) → references → `font-size-24` (Primitive)

**Examples**:
- `primary-color` → references `blue-500` from Primitive
- `secondary-color` → references `gray-600` from Primitive
- `text-primary` → references `gray-900` from Primitive
- `spacing-medium` → references `spacing-16` from Primitive

**Scope**: Can be scoped to specific contexts or made more broadly available

---

### 3. Component-Specific Collection

**Purpose**: Component-level tokens that define design properties for specific UI components.

**Characteristics**:
- Contains tokens specific to individual components or component groups
- References variables from both Primitive and Alias collections
- Encapsulates component-level design decisions
- Enables component theming and customization

**Connection Points**:
- **Primary Connection**: References variables from **Alias collection** (semantic tokens)
- **Secondary Connection**: Can directly reference **Primitive collection** when needed
- Example: `button-primary-bg` (Component-Specific) → references → `primary-color` (Alias) → references → `blue-500` (Primitive)

**Examples**:
- `button-primary-background` → references `primary-color` from Alias
- `button-primary-text` → references `text-on-primary` from Alias
- `card-border-radius` → references `border-radius-large` from Alias
- `input-padding` → references `spacing-medium` from Alias

**Scope**: Typically scoped to specific components or component groups

---

### 4. Universal Collection

**Purpose**: Comprehensive collection that aggregates commonly used tokens from all other collections for universal access.

**Characteristics**:
- Contains variables with `ALL_SCOPES` scope, making them accessible everywhere
- Aggregates frequently used tokens from Primitive, Alias, and Component-Specific collections
- Serves as the **primary connection hub** between all collections
- Simplifies designer workflow by providing one-stop access to common tokens

**Connection Points**:
- **References Primitive Collection**: For commonly used primitive values
- **References Alias Collection**: For frequently used semantic tokens
- **References Component-Specific Collection**: For reusable component tokens
- Acts as a **central aggregation point** that connects all three other collections

**Examples**:
- `universal-primary-color` → references `primary-color` from Alias
- `universal-spacing-base` → references `spacing-medium` from Alias
- `universal-button-style` → references `button-primary-background` from Component-Specific
- `universal-border-radius` → references `border-radius-8` from Primitive

**Scope**: `ALL_SCOPES` - accessible everywhere in Figma

---

## Connection Flow Diagram

The connection flow between collections follows this pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRIMITIVE COLLECTION                     │
│  (Raw values: colors, spacing, typography foundations)      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ (referenced by)
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                      ALIAS COLLECTION                        │
│  (Semantic tokens: primary-color, text-primary, etc.)      │
└───────────────┬───────────────────────────────┬─────────────┘
                │                               │
                │ (referenced by)               │ (referenced by)
                ↓                               ↓
┌───────────────────────────────┐  ┌──────────────────────────┐
│   COMPONENT-SPECIFIC          │  │   UNIVERSAL COLLECTION   │
│   COLLECTION                  │  │   (ALL_SCOPES - Hub)     │
│   (button-primary-bg, etc.)   │  │                          │
└───────────────┬───────────────┘  └───────────┬──────────────┘
                │                               │
                │ (aggregated into)             │
                └───────────────┬───────────────┘
                                │
                                ↓
                    ┌───────────────────────┐
                    │   UNIVERSAL COLLECTION│
                    │   (Central Hub)       │
                    └───────────────────────┘
```

---

## Detailed Connection Points

### Connection Point 1: Primitive → Alias

**How it works**:
- Variables in Alias collection create aliases (references) to Primitive variables
- When a Primitive value changes, all Alias variables referencing it update automatically
- This creates a one-way dependency: Alias depends on Primitive

**Example Flow**:
```
Primitive: blue-500 = #3B82F6
    ↓
Alias: primary-color → references → blue-500
```

**Benefits**:
- Single source of truth for color values
- Easy theme updates (change Primitive, Alias updates automatically)
- Clear separation between raw values and semantic meaning

---

### Connection Point 2: Alias → Component-Specific

**How it works**:
- Component-Specific variables reference Alias variables for semantic meaning
- Components use semantic tokens rather than raw values
- Enables component theming without touching component code

**Example Flow**:
```
Alias: primary-color → references → blue-500 (Primitive)
    ↓
Component-Specific: button-primary-background → references → primary-color (Alias)
```

**Benefits**:
- Components are themeable through Alias changes
- Consistent semantic meaning across components
- Easier maintenance (change Alias, components update)

---

### Connection Point 3: Universal Collection as Central Hub

**How it works**:
- Universal collection references variables from **all three** other collections
- Variables in Universal have `ALL_SCOPES` scope
- Acts as an aggregation layer that makes tokens universally accessible

**Connection Pattern**:
```
Universal Collection connects to:

1. Primitive Collection
   └─> For commonly used raw values
   └─> Example: universal-spacing-base → spacing-16 (Primitive)

2. Alias Collection  
   └─> For frequently used semantic tokens
   └─> Example: universal-primary → primary-color (Alias)

3. Component-Specific Collection
   └─> For reusable component tokens
   └─> Example: universal-button-style → button-primary-background (Component-Specific)
```

**Benefits**:
- Single collection for designers to access common tokens
- No need to know which collection a token belongs to
- Universal accessibility reduces workflow friction
- Centralized access point for cross-collection tokens

---

## Modes and Theme Support

### Mode Structure Across Collections

Each collection can have multiple **modes** (e.g., Light, Dark, Mobile, Desktop):

**Mode Alignment**:
- Modes are typically synchronized across collections
- When switching modes, all referenced variables update together
- Example: Switching to "Dark" mode updates:
  - Primitive collection dark mode values
  - Alias collection references update to dark mode primitives
  - Component-Specific references update through Alias
  - Universal collection reflects all changes

**Mode Inheritance Flow**:
```
Primitive (Dark Mode)
    ↓
Alias (Dark Mode) → references Primitive (Dark Mode)
    ↓
Component-Specific (Dark Mode) → references Alias (Dark Mode)
    ↓
Universal (Dark Mode) → aggregates all above
```

---

## Variable Types in Each Collection

### Primitive Collection
- **Colors**: Raw hex/RGB values
- **Numbers**: Spacing, sizes, border radius, opacity
- **Strings**: Font family names (if applicable)

### Alias Collection
- **Colors**: Semantic color references
- **Numbers**: Semantic size/spacing references
- **Strings**: Semantic typography references

### Component-Specific Collection
- **Colors**: Component background, text, border colors
- **Numbers**: Component-specific spacing, sizes, radii
- **Strings**: Component-specific typography

### Universal Collection
- **All Types**: Aggregates all variable types from other collections
- Focuses on commonly used tokens across the design system

---

## Best Practices in This Structure

### 1. Clear Separation of Concerns
- **Primitive**: Raw values only
- **Alias**: Semantic meaning only
- **Component-Specific**: Component logic only
- **Universal**: Aggregation and access only

### 2. One-Way Dependencies
- Dependencies flow downward: Primitive → Alias → Component-Specific
- Universal aggregates from all but doesn't create new dependencies
- Prevents circular references and maintains clarity

### 3. Single Source of Truth
- Each value exists once in Primitive collection
- Changes propagate automatically through references
- No value duplication across collections

### 4. Scalability
- New tokens can be added to any collection without breaking existing references
- New components can reference existing Alias tokens
- Universal collection can grow organically as needs arise

---

## Usage Guidelines

### When to Use Each Collection

**Use Primitive Collection**:
- When defining raw design values
- For foundational colors, spacing scales, typography scales
- Never reference Primitive directly in components (use Alias instead)

**Use Alias Collection**:
- When creating semantic tokens
- For tokens that provide contextual meaning
- As the bridge between raw values and design intent

**Use Component-Specific Collection**:
- For tokens specific to a single component or component group
- When component needs override or extend semantic tokens
- For component-level theming

**Use Universal Collection**:
- For tokens used across multiple components
- For commonly accessed semantic tokens
- When you need `ALL_SCOPES` accessibility
- As a convenience layer for frequently used tokens

---

## Connection Point Summary

### Key Connection Points:

1. **Primitive → Alias**
   - Alias variables reference Primitive variables
   - Creates semantic meaning from raw values
   - Enables theme switching at the foundation level

2. **Alias → Component-Specific**
   - Component tokens reference Alias tokens
   - Components use semantic tokens, not raw values
   - Enables component theming through Alias changes

3. **Universal → All Collections**
   - Universal references Primitive, Alias, and Component-Specific
   - Acts as central hub for cross-collection access
   - Provides `ALL_SCOPES` for universal accessibility

### Connection Benefits:

- **Maintainability**: Changes cascade automatically through references
- **Consistency**: Single source of truth prevents value conflicts
- **Flexibility**: Easy to add new tokens or modify existing ones
- **Accessibility**: Universal collection provides easy access to common tokens
- **Scalability**: Structure supports growth without breaking existing references

---

## Notes

- This four-collection structure provides a robust foundation for a scalable design system
- The connection points create a clear dependency hierarchy
- The Universal collection serves as the primary access point while maintaining connections to all other collections
- Variable references ensure automatic propagation of changes throughout the system

---

*This structure follows Figma's best practices for variable organization and enables efficient design token management across the Alkhwarizmi design system.*
