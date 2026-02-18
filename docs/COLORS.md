# Brand Colors & Customization Guide

This guide covers the brand colors and how to customize them.

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Brand Primary | `#1E3A8A` | Headers, primary text, main brand color |
| Brand Light | `#3B82F6` | Hover states, links |
| Brand Dark | `#1E293B` | Footer, dark sections |
| Accent | `#F97316` | CTAs, buttons, highlights |

## Tailwind Configuration

Colors are defined in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: "#1E3A8A",
        light: "#3B82F6",
        dark: "#1E293B",
      },
      accent: {
        DEFAULT: "#F97316",
      },
    },
  },
}
```

## CSS Custom Properties

Also available in `src/app/globals.css`:

```css
:root {
  --brand: #1E3A8A;
  --brand-light: #3B82F6;
  --brand-dark: #1E293B;
  --accent: #F97316;
}
```

## Changing Colors

### Step 1: Update Tailwind Config

Edit `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    DEFAULT: "#BRAND_COLOR",  // Primary brand color
    light: "#BRAND_COLOR",    // Lighter variant
    dark: "#BRAND_COLOR",     // Darker variant
  },
  accent: {
    DEFAULT: "#BRAND_COLOR",  // Call-to-action color
  },
}
```

### Step 2: Update CSS Variables

Edit `src/app/globals.css`:

```css
:root {
  --brand: #BRAND_COLOR;
  --brand-light: #BRAND_COLOR;
  --brand-dark: #BRAND_COLOR;
  --accent: #BRAND_COLOR;
}
```

### Step 3: Update Theme Color

Edit `src/app/layout.tsx`:

```typescript
export const viewport: Viewport = {
  themeColor: "#BRAND_COLOR", // Mobile browser theme color
};
```

## Color Usage Guidelines

### Brand Color (`brand`)
- Navigation text
- Headings
- Section backgrounds
- Footer backgrounds

### Accent Color (`accent`)
- Primary buttons
- Call-to-action elements
- Highlighted numbers/stats
- Process step numbers

### Supporting Colors

These Tailwind colors are used throughout:
- `slate-50` through `slate-900` - Backgrounds and text
- `white` - Card backgrounds
- `green-*` - Success messages
- `red-*` - Error messages

## Accessibility

Ensure color contrast meets WCAG 2.1 AA standards:

- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum contrast ratio

Test at: https://webaim.org/resources/contrastchecker/

## Example Color Schemes

### Blue & Orange (Current)
```
brand: #1E3A8A
accent: #F97316
```

### Green & Gold
```
brand: #166534
accent: #CA8A04
```

### Teal & Coral
```
brand: #0D9488
accent: #F97316
```

### Navy & Red
```
brand: #1E293B
accent: #DC2626
```
