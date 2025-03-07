import { keyframes } from 'styled-components';

// Fade in animation
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Fade in from bottom
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade in from top
export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade in from left
export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Fade in from right
export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Scale in
export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Pulse animation
export const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Floating animation
export const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Glow animation
export const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(18, 216, 250, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(18, 216, 250, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(18, 216, 250, 0.3);
  }
`;

// Gradient animation
export const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Typewriter effect
export const typewriterCursor = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: ${props => props.theme.colors.secondary};
  }
`;

// Star twinkle animation
export const twinkle = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

// Orbit animation
export const orbit = keyframes`
  from {
    transform: rotate(0deg) translateX(10px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(10px) rotate(-360deg);
  }
`;

// For the terminal cursor blinking
export const blink = keyframes`
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

// For background particles movement
export const particlesMovement = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-5px) translateX(5px);
  }
  50% {
    transform: translateY(-10px) translateX(0);
  }
  75% {
    transform: translateY(-5px) translateX(-5px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
`;

// Animation for the space dust particles
export const spaceDust = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
`;