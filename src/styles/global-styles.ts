import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  /* Custom properties for stars and particles */
  :root {
    --star-color: rgba(255, 255, 255, 0.8);
    --star-size-small: 1px;
    --star-size-medium: 2px;
    --star-size-large: 3px;
    --scroll-speed: 1;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.normal};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(30, 42, 69, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(110, 68, 255, 0.15) 0%, transparent 50%);
    background-attachment: fixed;
    background-size: 100% 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    transition: background-color 0.3s ease;
    
    /* Star field effect */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(var(--star-size-small) var(--star-size-small) at 20px 30px, var(--star-color), transparent),
        radial-gradient(var(--star-size-small) var(--star-size-small) at 40px 70px, var(--star-color), transparent),
        radial-gradient(var(--star-size-small) var(--star-size-small) at 50px 160px, var(--star-color), transparent),
        radial-gradient(var(--star-size-small) var(--star-size-small) at 90px 40px, var(--star-color), transparent),
        radial-gradient(var(--star-size-small) var(--star-size-small) at 130px 80px, var(--star-color), transparent),
        radial-gradient(var(--star-size-small) var(--star-size-small) at 160px 120px, var(--star-color), transparent),
        radial-gradient(var(--star-size-medium) var(--star-size-medium) at 200px 20px, var(--star-color), transparent),
        radial-gradient(var(--star-size-medium) var(--star-size-medium) at 260px 40px, var(--star-color), transparent),
        radial-gradient(var(--star-size-medium) var(--star-size-medium) at 300px 60px, var(--star-color), transparent),
        radial-gradient(var(--star-size-large) var(--star-size-large) at 150px 220px, var(--star-color), transparent),
        radial-gradient(var(--star-size-large) var(--star-size-large) at 350px 180px, var(--star-color), transparent);
      background-repeat: repeat;
      background-size: 400px 400px;
      opacity: 0.4;
      z-index: -1;
      animation: starsAnimation 100s linear infinite;
    }
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.semibold};
    line-height: ${theme.lineHeights.tight};
    color: ${theme.colors.text};
    margin-bottom: ${theme.space[4]};
  }
  
  h1 {
    font-size: ${theme.fontSizes['4xl']};
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['5xl']};
    }
    
    @media (min-width: ${theme.breakpoints.lg}) {
      font-size: ${theme.fontSizes['6xl']};
    }
  }
  
  h2 {
    font-size: ${theme.fontSizes['3xl']};
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['4xl']};
    }
  }
  
  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }
  
  h4 {
    font-size: ${theme.fontSizes.xl};
  }
  
  h5 {
    font-size: ${theme.fontSizes.lg};
  }
  
  h6 {
    font-size: ${theme.fontSizes.md};
  }
  
  p {
    margin-bottom: ${theme.space[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover, &:focus {
      color: ${theme.colors.secondaryLight};
      text-decoration: none;
    }
  }
  
  /* Lists */
  ul, ol {
    margin-bottom: ${theme.space[4]};
    padding-left: ${theme.space[4]};
  }
  
  li {
    margin-bottom: ${theme.space[2]};
  }
  
  /* Form elements */
  button, input, textarea, select {
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
  }
  
  button {
    cursor: pointer;
  }
  
  /* Code blocks */
  code, pre {
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.sm};
    border-radius: ${theme.radii.md};
  }
  
  code {
    background-color: ${theme.colors.backgroundLight};
    padding: ${theme.space[1]} ${theme.space[2]};
  }
  
  pre {
    background-color: ${theme.colors.backgroundAlt};
    padding: ${theme.space[4]};
    overflow-x: auto;
    margin-bottom: ${theme.space[4]};
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundAlt};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primaryDark};
    border-radius: ${theme.radii.full};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary};
  }
  
  /* Selection */
  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  }
  
  /* Animations */
  @keyframes starsAnimation {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 400px 400px;
    }
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(110, 68, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(110, 68, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(110, 68, 255, 0);
    }
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Helper classes */
  .container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: ${theme.space[4]};
    padding-left: ${theme.space[4]};
    
    @media (min-width: ${theme.breakpoints.sm}) {
      max-width: ${theme.sizes.container.sm};
    }
    
    @media (min-width: ${theme.breakpoints.md}) {
      max-width: ${theme.sizes.container.md};
    }
    
    @media (min-width: ${theme.breakpoints.lg}) {
      max-width: ${theme.sizes.container.lg};
    }
    
    @media (min-width: ${theme.breakpoints.xl}) {
      max-width: ${theme.sizes.container.xl};
    }
    
    @media (min-width: ${theme.breakpoints['2xl']}) {
      max-width: ${theme.sizes.container['2xl']};
    }
  }
  
  .section {
    padding: ${theme.space[12]} 0;
    
    @media (min-width: ${theme.breakpoints.lg}) {
      padding: ${theme.space[16]} 0;
    }
  }
  
  .visible-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export default GlobalStyles;