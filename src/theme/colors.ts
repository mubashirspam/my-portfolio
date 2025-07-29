// Theme Colors Configuration
// Change the primary color here to update it throughout the entire application

export const colors = {
  // Primary brand color - Change this to update the main theme color
  primary: '#FF4F22', // Sky Blue (current)
  // primary: '#3B82F6', // Blue
  // primary: '#8B5CF6', // Purple  
  // primary: '#10B981', // Emerald
  // primary: '#F59E0B', // Amber
  // primary: '#EF4444', // Red
  // primary: '#EC4899', // Pink
  // primary: '#6366F1', // Indigo

  // Background colors
  background: {
    primary: '#000000',
    secondary: 'rgba(17, 24, 39, 0.2)', // gray-900/20
    card: 'rgba(0, 0, 0, 0.8)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#D1D5DB', // gray-300
    muted: '#9CA3AF', // gray-400
    accent: '#6B7280', // gray-500
  },

  // Border colors
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',
    secondary: 'rgba(255, 255, 255, 0.2)',
    accent: 'rgba(255, 255, 255, 0.15)',
  },

  // State colors
  states: {
    hover: 'rgba(14, 165, 233, 0.3)', // primary with opacity
    focus: '#0EA5E9', // same as primary
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  }
} as const;

// CSS custom properties for Tailwind CSS
export const cssVariables = {
  '--color-primary': colors.primary,
  '--color-background-primary': colors.background.primary,
  '--color-background-secondary': colors.background.secondary,
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-border-primary': colors.border.primary,
} as const;

// Utility function to get color values
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let value: unknown = colors;
  
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      console.warn(`Color path "${colorPath}" not found`);
      return colors.primary; // fallback
    }
  }
  
  return typeof value === 'string' ? value : colors.primary;
};

export default colors;
