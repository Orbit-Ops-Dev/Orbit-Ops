import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft, fadeInRight } from '../../styles/animation';
import ParallaxBackground, { ParallaxLayerType } from '../common/parallax/parallax-background';
import { useNavigate } from 'react-router-dom';

// Types
interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

// Additional keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-grow: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const HeroText = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.space[8]};
  animation: ${fadeInLeft} 0.8s ease-out;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[4]};
  line-height: 1.1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
  }
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${({ theme }) => theme.colors.secondary};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s ease-out;
    }
  }
  
  &:hover span::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  flex-wrap: wrap;
`;

const CtaButton = styled.button`
  background: linear-gradient(
    135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[6]}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(110, 68, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: ${({ theme }) => theme.transitions.default};
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(110, 68, 255, 0.5);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const SecondaryCtaButton = styled(CtaButton)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 8px 30px rgba(18, 216, 250, 0.2);
  
  &:hover {
    background: rgba(18, 216, 250, 0.1);
    box-shadow: 0 12px 40px rgba(18, 216, 250, 0.3);
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  animation: ${fadeInRight} 0.8s ease-out, ${float} 6s ease-in-out infinite;
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  overflow: hidden;
  background: rgba(10, 14, 23, 0.5);
  padding: ${({ theme }) => theme.space[2]};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const CodeContainer = styled.div`
  z-index: 2;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const CodeLine = styled.div<{ $delay?: number }>`
  display: flex;
  display: block; 
  white-space: pre;
  margin-bottom: ${({ theme }) => theme.space[1]};
  animation: ${fadeInLeft} 0.2s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay || 0}s;
  opacity: 0;
`;

const CodeLineNumber = styled.span`
  color: ${({ theme }) => theme.colors.textDark};
  margin-right: ${({ theme }) => theme.space[3]};
  user-select: none;
`;

const CodeComment = styled.span`
  color: ${({ theme }) => theme.colors.textDark};
`;

const CodeKeyword = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const CodeString = styled.span`
  color: ${({ theme }) => theme.colors.accent2};
`;

const CodeFunction = styled.span`
  color: ${({ theme }) => theme.colors.accent1};
`;

const CodeProperty = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

// Half-orbit decorative elements
const HalfOrbitContainer = styled.div`
  position: absolute;
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 150%;
  height: 100%;
  z-index: 1;
  opacity: 0.4;
  pointer-events: none;
`;

const OrbitRing = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  border-radius: 50%;
  border: 1px solid rgba(18, 216, 250, 0.2);
  transform: translateX(-50%);
`;

const LargeOrbitRing = styled(OrbitRing)`
  width: 1200px;
  height: 1200px;
`;

const MediumOrbitRing = styled(OrbitRing)`
  width: 900px;
  height: 900px;
`;

const SmallOrbitRing = styled(OrbitRing)`
  width: 600px;
  height: 600px;
`;

// Hero Component
const Hero: React.FC<HeroProps> = ({ 
  title = "The Only Limit Is Your Mind", 
  subtitle = "Orbit-Ops delivers cutting-edge web solutions, stunning design, and powerful automation to help your business reach new heights in the digital universe.",
  primaryCtaText = "Explore Services",
  secondaryCtaText = "Get in Touch",
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  
  // Define parallax layers
  const parallaxLayers: ParallaxLayerType[] = [
    { 
      speed: 0.05, 
      direction: 'y', 
      type: 'space', 
      starsCount: 150,
      twinkleSpeed: 3,
    },
    { 
      speed: 0.1, 
      direction: 'x', 
      type: 'cyber',
      opacity: 0.7,
    },
    { 
      speed: 0.03,
      direction: 'y',
      type: 'easing',
    }
  ];
  
  return (
    <ParallaxBackground layers={parallaxLayers}>
      <HeroContainer>
        {/* Half-orbit background decoration */}
        <HalfOrbitContainer>
          <SmallOrbitRing />
          <MediumOrbitRing />
          <LargeOrbitRing />
        </HalfOrbitContainer>
        
        <HeroContent>
          <HeroText>
            <HeroTitle>
              {title.split(' ').slice(0, -2).join(' ')} <br/>
              <span>{title.split(' ').slice(-2).join(' ')}</span>
            </HeroTitle>
            <HeroSubtitle>
              {subtitle}
            </HeroSubtitle>
            
            <HeroActions>
              <CtaButton onClick={() => {navigate('/services')}}>{primaryCtaText}</CtaButton>
              <SecondaryCtaButton onClick={() => {navigate('/contact')}}>{secondaryCtaText}</SecondaryCtaButton>
            </HeroActions>
          </HeroText>
          
          <HeroImageContainer ref={imageRef}>
            <HeroImage>
              <CodeContainer>
                <CodeLine $delay={0.2}>
                  <CodeLineNumber>01</CodeLineNumber>
                  <CodeComment>// Welcome to Orbit-Ops</CodeComment>
                </CodeLine>
                <CodeLine $delay={0.4}>
                  <CodeLineNumber>02</CodeLineNumber>
                  <CodeKeyword>class</CodeKeyword> <CodeFunction>OrbitOps</CodeFunction> {'{'}
                </CodeLine>
                <CodeLine $delay={0.6}>
                  <CodeLineNumber>03</CodeLineNumber>
                  {'  '}<CodeKeyword>constructor</CodeKeyword>() {'{'}
                </CodeLine>
                <CodeLine $delay={0.8}>
                  <CodeLineNumber>04</CodeLineNumber>
                  {'    '}<CodeKeyword>this</CodeKeyword>.<CodeProperty>webDesign</CodeProperty> = <CodeString>"cutting-edge"</CodeString>;
                </CodeLine>
                <CodeLine $delay={1.0}>
                  <CodeLineNumber>05</CodeLineNumber>
                  {'    '}<CodeKeyword>this</CodeKeyword>.<CodeProperty>graphicDesign</CodeProperty> = <CodeString>"stunning"</CodeString>;
                </CodeLine>
                <CodeLine $delay={1.2}>
                  <CodeLineNumber>06</CodeLineNumber>
                  {'    '}<CodeKeyword>this</CodeKeyword>.<CodeProperty>automation</CodeProperty> = <CodeString>"powerful"</CodeString>;
                </CodeLine>
                <CodeLine $delay={1.4}>
                  <CodeLineNumber>07</CodeLineNumber>
                  {'    '}<CodeKeyword>this</CodeKeyword>.<CodeProperty>innovation</CodeProperty> = <CodeString>"limitless"</CodeString>;
                </CodeLine>
                <CodeLine $delay={1.6}>
                  <CodeLineNumber>08</CodeLineNumber>
                  {'  }'}</CodeLine>
                <CodeLine $delay={1.8}>
                  <CodeLineNumber>09</CodeLineNumber>
                  {'  '}</CodeLine>
                <CodeLine $delay={2.0}>
                  <CodeLineNumber>10</CodeLineNumber>
                  {'  '}<CodeFunction>launchBusiness</CodeFunction>() {'{'}
                </CodeLine>
                <CodeLine $delay={2.2}>
                  <CodeLineNumber>11</CodeLineNumber>
                  {'    '}<CodeKeyword>return</CodeKeyword> <CodeString>"Ready for liftoff!"</CodeString>;
                </CodeLine>
                <CodeLine $delay={2.4}>
                  <CodeLineNumber>12</CodeLineNumber>
                  {'  }'}</CodeLine>
                <CodeLine $delay={2.6}>
                  <CodeLineNumber>13</CodeLineNumber>
                  {'}'}</CodeLine>
              </CodeContainer>
            </HeroImage>
          </HeroImageContainer>
        </HeroContent>
      </HeroContainer>
    </ParallaxBackground>
  );
};

export default Hero;