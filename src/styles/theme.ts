import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    // Primary colors
    primary: '#6E44FF', // Vibrant purple for main elements
    primaryDark: '#4B2AB7', // Darker purple for hover states
    primaryLight: '#A78BFF', // Lighter purple for accents
    
    // Secondary colors
    secondary: '#12D8FA', // Bright cyan for accents and highlights
    secondaryDark: '#0CAACC', // Darker cyan for hover states
    secondaryLight: '#6CF1FF', // Lighter cyan for subtle highlights
    
    // Background colors
    background: '#0A0E17', // Deep space background (almost black)
    backgroundAlt: '#141B2B', // Slightly lighter for card backgrounds
    backgroundLight: '#1E2A45', // Even lighter for hover states
    
    // Text colors
    text: '#F1F1F3', // Nearly white for main text
    textMuted: '#A8A9BC', // Muted text for secondary information
    textDark: '#686978', // Dark text for placeholders or disabled states
    
    // Accent colors
    accent1: '#FF5470', // Pinkish red for important UI elements
    accent2: '#00E980', // Neon green for success indicators
    accent3: '#F7B538', // Orange/yellow for warnings
    
    // UI colors
    border: 'rgba(255, 255, 255, 0.1)', // Subtle border color
    overlay: 'rgba(10, 14, 23, 0.8)', // Overlay for modals
    shadow: 'rgba(0, 0, 0, 0.3)', // Shadow for elements
  },
  
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Space Grotesk', 'Inter', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  space: {
    0: '0',
    1: '0.25rem',     // 4px
    2: '0.5rem',      // 8px
    3: '0.75rem',     // 12px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    8: '2rem',        // 32px
    10: '2.5rem',     // 40px
    12: '3rem',       // 48px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    32: '8rem',       // 128px
  },
  
  sizes: {
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  
  radii: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.25rem',    // 4px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',   // Fully rounded (circle for square aspect ratio)
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.2)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    glow: '0 0 15px',
    neon: '0 0 10px',
  },
  
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default theme;