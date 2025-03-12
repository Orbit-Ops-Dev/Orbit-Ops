import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  hasIcon?: boolean;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  as?: unknown;
  to?: string;
  href?: string;
  className?: string;
}

// Define styled component props with $ prefix
interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $hasIcon?: boolean;
  $iconPosition?: 'left' | 'right';
  $isLoading?: boolean;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

// Styles based on call-to-action.tsx
const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    
    &:hover:not(:disabled) {
      color: ${props => props.theme.colors.text};

      background-color: ${({ theme }) => theme.colors.primaryDark};
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  secondary: css`
    background-color: transparent;
    color: ${props => props.theme.colors.secondary};
    border: 2px solid ${props => props.theme.colors.secondary};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.background};
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.md};
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background: rgba(110, 68, 255, 0.1);
      border-color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: none;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  link: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    border: none;
    padding: 0;
    
    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.secondaryLight};
      text-decoration: underline;
    }
  `,
};

const buttonSizes = {
  sm: css`
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  
  md: css`
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  
  lg: css`
    padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[8]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};

// Base button styles - updated to match call-to-action.tsx
const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  white-space: nowrap;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  position: relative;
  overflow: hidden;
  
  /* Shimmer effect from call-to-action.tsx */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg, 
      transparent, 
      rgba(255,255,255,0.1), 
      transparent
    );
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover::before {
    left: 100%;
  }
  
  /* Apply variant styles */
  ${({ $variant = 'primary' }) => buttonVariants[$variant]}
  
  /* Apply size styles */
  ${({ $size = 'md' }) => buttonSizes[$size]}
  
  /* Icon position */
  flex-direction: ${({ $iconPosition }) =>
    $iconPosition === 'right' ? 'row-reverse' : 'row'};
  
  /* Disabled styles */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Loading state */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      opacity: 0.8;
      cursor: wait;
      
      &::after {
        content: '';
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 0.8s linear infinite;
        margin-left: ${({ theme }) => theme.space[2]};
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;

// Create styled links that look like buttons
const StyledAnchor = styled(StyledButton).attrs({ as: 'a' })`
  text-decoration: none;
`;

// Component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  hasIcon = false,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  as,
  to,
  href,
  className,
  ...props
}) => {
  // If 'to' prop is provided, render as Link
  if (to) {
    return (
      <StyledButton
        as={Link}
        to={to}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $hasIcon={hasIcon}
        $iconPosition={iconPosition}
        disabled={disabled || isLoading}
        $isLoading={isLoading}
        className={className}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }

  // If 'href' prop is provided, render as anchor
  if (href) {
    return (
      <StyledAnchor
        href={href}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $hasIcon={hasIcon}
        $iconPosition={iconPosition}
        disabled={disabled || isLoading}
        $isLoading={isLoading}
        className={className}
        {...props}
      >
        {children}
      </StyledAnchor>
    );
  }

  // Otherwise render as button
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $hasIcon={hasIcon}
      $iconPosition={iconPosition}
      disabled={disabled || isLoading}
      $isLoading={isLoading}
      as={as}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;