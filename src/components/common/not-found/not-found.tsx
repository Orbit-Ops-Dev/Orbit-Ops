import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet-async';
import Button from '../button';

// Animations
const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;


const twinkle = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
`;

const orbit = keyframes`
  from {
    transform: rotate(0deg) translateX(120px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(120px) rotate(-360deg);
  }
`;

// Styled components
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[4]};
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(110, 68, 255, 0.2) 0%,
      transparent 50%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 70% 30%,
      rgba(18, 216, 250, 0.15) 0%,
      transparent 50%
    );
  }
`;

const Star = styled.div<{ $size: number; $top: number; $left: number; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.text};
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  animation: ${twinkle} ${({ $delay }) => 2 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: ${({ theme }) => theme.sizes.container.lg};
`;

const AstronautContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto ${({ theme }) => theme.space[6]};
  animation: ${float} 6s ease-in-out infinite;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 300px;
    height: 300px;
  }
`;

const Astronaut = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  &::after {
    content: '404';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 3rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 5rem;
    }
  }
`;

const Planet = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  /* The issue is in these position values and the animation */
  /* Center the planet in the container */
  top: 50%;
  left: 50%;
  /* Ensure the planet is perfectly centered before the orbit transformation */
  transform: translate(-50%, -50%);
  /* Update the orbit animation with adjusted translateX value */
  animation: ${orbit} 20s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(30deg);
    border-radius: 50%;
  }
`;

const ErrorTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[4]};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.space[8]};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const OrbitCircle = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => `rgba(${theme.colors.border}, 0.3)`};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Comet = styled.div`
  position: absolute;
  top: 20%;
  right: 10%;
  width: 100px;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.primary}
  );
  transform: rotate(-30deg);
  
  &::before {
    content: '';
    position: absolute;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    transform: translateX(5px) translateY(-3px);
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.secondary};
  }
`;

const NotFoundPage: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Generate star positions
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2
  }));
  
  return (
    <NotFoundContainer>
      <Helmet>
        <title>404 - Page Not Found | Orbit-Ops</title>
        <meta name="description" content="Oops! The page you're looking for has drifted into deep space." />
      </Helmet>
      
      <BackgroundLayer>
          {stars.map(star => (
            <Star 
              key={star.id} 
              $size={star.size} 
              $top={star.top} 
              $left={star.left}
              $delay={star.delay}
            />
          ))}
          
          <OrbitCircle />
          <Comet />
      </BackgroundLayer>
      
      <ContentWrapper>
        <AstronautContainer>
          <Astronaut />
          <Planet />
        </AstronautContainer>
        
        <ErrorTitle>Houston, We Have a Problem</ErrorTitle>
        <ErrorMessage>
          The page you're looking for has drifted into deep space.
        </ErrorMessage>
        
        <ActionContainer>
          <Button to="/" size="lg">Return to Mission Control</Button>
          <Button to="/contact" variant="outline" size="lg">Contact Ground Team</Button>
        </ActionContainer>
      </ContentWrapper>
    </NotFoundContainer>
  );
};

export default NotFoundPage;