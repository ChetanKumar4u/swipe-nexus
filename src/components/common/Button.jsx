import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
  DANGER: 'danger',
  GHOST: 'ghost',
};

const ButtonSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size, theme }) => {
    switch (size) {
      case ButtonSizes.SMALL:
        return `${theme.spacing.xs} ${theme.spacing.md}`;
      case ButtonSizes.LARGE:
        return `${theme.spacing.md} ${theme.spacing.xl}`;
      default:
        return `${theme.spacing.sm} ${theme.spacing.lg}`;
    }
  }};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case ButtonSizes.SMALL:
        return theme.fontSizes.sm;
      case ButtonSizes.LARGE:
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.md;
    }
  }};
  font-family: ${({ theme }) => theme.fonts.secondary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};
  overflow: hidden;
  cursor: pointer;
  outline: none;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case ButtonVariants.SECONDARY:
        return css`
          background: ${theme.colors.secondary};
          color: ${theme.colors.white};
          &:before {
            background: ${theme.colors.neonPurple};
          }
        `;
      case ButtonVariants.ACCENT:
        return css`
          background: transparent;
          color: ${theme.colors.accent};
          border: 2px solid ${theme.colors.accent};
          box-shadow: 0 0 10px ${theme.colors.accent};
          &:hover {
            background: ${theme.colors.accent};
            color: ${theme.colors.background};
            box-shadow: 0 0 15px ${theme.colors.accent}, 0 0 30px ${theme.colors.accent};
          }
        `;
      case ButtonVariants.DANGER:
        return css`
          background: ${theme.colors.danger};
          color: ${theme.colors.white};
          &:before {
            background: ${theme.colors.neonPink};
          }
        `;
      case ButtonVariants.GHOST:
        return css`
          background: transparent;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.gray};
          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:before {
            background: ${theme.colors.neonBlue};
          }
        `;
    }
  }}
  
  ${({ isFullWidth }) => isFullWidth && css`
    width: 100%;
  `}
  
  ${({ isDisabled, theme }) => isDisabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    &:hover {
      transform: translateY(0);
      box-shadow: none;
    }
  `}
  
  /* Glow effect for primary, secondary and danger buttons */
  ${({ variant, theme }) => 
    (variant === ButtonVariants.PRIMARY || 
     variant === ButtonVariants.SECONDARY || 
     variant === ButtonVariants.DANGER) && 
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity ${theme.transitions.normal};
      }
      
      &:hover:before {
        opacity: 0.3;
      }
      
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 200%;
        height: 200%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 0) 50%
        );
        opacity: 0;
        transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      }
      
      &:active:after {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
        transition: 0s;
      }
    `}
`;

const Button = ({
  children,
  variant = ButtonVariants.PRIMARY,
  size = ButtonSizes.MEDIUM,
  isFullWidth = false,
  isDisabled = false,
  onClick,
  ...props
}) => {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export { Button, ButtonVariants, ButtonSizes };
export default Button; 