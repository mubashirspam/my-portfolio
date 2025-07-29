# Theme System Documentation

## Overview

This theme system provides a centralized way to manage colors throughout the portfolio application. You can easily change the primary color and all components will automatically update.

## Quick Start

### Changing the Primary Color

To change the primary color of the entire application:

1. Open `src/theme/colors.ts`
2. Change the `primary` color value:

```typescript
export const colors = {
  // Change this line to update the primary color everywhere
  primary: '#0EA5E9', // Current: Sky Blue
  
  // Other options (uncomment one):
  // primary: '#3B82F6', // Blue
  // primary: '#8B5CF6', // Purple  
  // primary: '#10B981', // Emerald
  // primary: '#F59E0B', // Amber
  // primary: '#EF4444', // Red
  // primary: '#EC4899', // Pink
  // primary: '#6366F1', // Indigo
  
  // ... rest of the colors
}
```

3. Save the file - all components will automatically use the new color!

## Usage in Components

### Method 1: Direct Import (Recommended)

```typescript
import colors from '../../theme/colors';

// Use in JSX
<span style={{ color: colors.primary }}>Text</span>
<div style={{ backgroundColor: colors.primary }}>Content</div>
```

### Method 2: Using the getColor utility

```typescript
import { getColor } from '../../theme/colors';

// Access nested colors
const primaryColor = getColor('primary');
const textColor = getColor('text.secondary');
```

## Color Structure

```typescript
colors = {
  primary: '#0EA5E9',           // Main brand color
  
  background: {
    primary: '#000000',         // Main background
    secondary: 'rgba(...)',     // Secondary background
    card: 'rgba(...)',         // Card backgrounds
  },
  
  text: {
    primary: '#FFFFFF',         // Main text
    secondary: '#D1D5DB',       // Secondary text
    muted: '#9CA3AF',          // Muted text
    accent: '#6B7280',         // Accent text
  },
  
  border: {
    primary: 'rgba(...)',       // Main borders
    secondary: 'rgba(...)',     // Secondary borders
    accent: 'rgba(...)',        // Accent borders
  },
  
  states: {
    hover: 'rgba(...)',         // Hover states
    focus: '#0EA5E9',          // Focus states
    success: '#10B981',        // Success states
    warning: '#F59E0B',        // Warning states
    error: '#EF4444',          // Error states
  }
}
```

## Examples

### Button with Theme Colors

```typescript
<button 
  style={{ 
    backgroundColor: colors.primary,
    borderColor: colors.primary 
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = colors.primary;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = colors.primary;
    e.currentTarget.style.color = 'white';
  }}
>
  Click me
</button>
```

### Input with Focus States

```typescript
<input
  onFocus={(e) => {
    e.currentTarget.style.borderColor = colors.primary;
  }}
  onBlur={(e) => {
    e.currentTarget.style.borderColor = colors.border.primary;
  }}
/>
```

## Components Updated

All the following components now use the theme system:

- ✅ Navigation
- ✅ HeroSection  
- ✅ AboutSection
- ✅ SkillsSection
- ✅ ProjectsSection
- ✅ ContactSection
- ✅ Background

## Benefits

1. **Centralized Control**: Change one value to update the entire app
2. **Consistency**: All components use the same color values
3. **Easy Theming**: Simple to create different color schemes
4. **Type Safety**: TypeScript ensures color paths are valid
5. **Maintainability**: Easy to update and maintain colors

## Future Enhancements

- Add dark/light mode support
- Create multiple theme presets
- Add CSS custom properties integration
- Support for dynamic theme switching
