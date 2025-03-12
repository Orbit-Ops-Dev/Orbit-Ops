import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled, { keyframes } from 'styled-components';
import { blink, fadeInUp, gradientShift, pulse } from '../../../styles/animation';
import { generateSEO, getPageSEO } from '../../../utils/seo';

// Styled Components
const UnderConstructionPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
  text-align: center;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.lg};
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const ContentWrapper = styled.div`
  background: rgba(20, 27, 43, 0.7);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid rgba(110, 68, 255, 0.2);
  padding: ${({ theme }) => theme.space[10]};
  margin-top: ${({ theme }) => theme.space[12]};
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(18, 216, 250, 0.1),
      transparent
    );
    animation: ${gradientShift} 8s linear infinite;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[16]};
  }
`;


const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: ${gradientShift} 6s linear infinite;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto ${({ theme }) => theme.space[8]};
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  border-radius: ${({ theme }) => theme.radii.full};
  position: relative;
  transition: width 1s ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;


// Animated decorations
const orbitRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const OrbitRing = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border: 1px dashed rgba(18, 216, 250, 0.3);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${orbitRing} 60s linear infinite;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 500px;
    height: 500px;
  }
`;

const Satellite = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.secondary};
  animation: ${pulse} 2s ease-in-out infinite;
`;


const TerminalText = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const Terminal = styled.div`
  width: 100%;
  max-width: 480px;
  margin: ${({ theme }) => theme.space[8]} auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[4]};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;
  overflow: hidden;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TerminalDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  
  &:nth-child(1) {
    background-color: #ff5f56;
  }
  
  &:nth-child(2) {
    background-color: #ffbd2e;
  }
  
  &:nth-child(3) {
    background-color: #27c93f;
  }
`;

const TerminalTitle = styled.div`
  flex-grow: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const TerminalContent = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`;

const TerminalLine = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const TerminalPrompt = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: ${({ theme }) => theme.space[2]};
`;

const AnimatedText = styled.div<{ $delay?: number }>`
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid ${({ theme }) => theme.colors.secondary};
  animation: 
    ${TerminalText} 2s steps(40, end) forwards,
    ${blink} 1s step-end infinite;
  animation-delay: ${({ $delay }) => $delay || 0}s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const DelayedSpan = styled.span<{ $delay: number }>`
  opacity: 0;
  animation: ${fadeInUp} 0.3s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;

// Component
const UnderConstruction: React.FC = () => {
  const seo = generateSEO(getPageSEO('under-construction'));
  const [progress, setProgress] = useState(0);

  // Set the progress percentage
  useEffect(() => {
    setTimeout(() => {
      setProgress(68);
    }, 500);
  }, []);
  
  return (
      <UnderConstructionPage>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          {seo.keywords && <meta name="keywords" content={seo.keywords.join(', ')} />}
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
          <meta property="og:type" content="website" />
          <link rel="canonical" href={seo.canonicalUrl} />
        </Helmet>
        
        <Container>
          
          <ContentWrapper>
            {/* Animation elements */}
            <OrbitRing>
              <Satellite />
            </OrbitRing>
            
            <Title>Under Construction</Title>
            <Subtitle>
              We're building something awesome! Our mission control is working hard to launch this page into orbit soon.
            </Subtitle>
            
            <ProgressContainer>
              <ProgressLabel>
                <span>Development Progress</span>
                <span>{progress}%</span>
              </ProgressLabel>
              <ProgressBar>
                <ProgressFill $progress={progress} />
              </ProgressBar>
            </ProgressContainer>
            
            <Terminal>
              <TerminalHeader>
                <TerminalDot />
                <TerminalDot />
                <TerminalDot />
                <TerminalTitle>orbit-ops-terminal</TerminalTitle>
              </TerminalHeader>
              <TerminalContent>
                <TerminalLine>
                  <TerminalPrompt>$</TerminalPrompt>
                  <AnimatedText>npm install @orbit-ops/website</AnimatedText>
                </TerminalLine>
                <TerminalLine>
                  <TerminalPrompt>$</TerminalPrompt>
                  <AnimatedText $delay={2}>npm run build</AnimatedText>
                </TerminalLine>
                <TerminalLine>
                  <TerminalPrompt>$</TerminalPrompt>
                  <AnimatedText $delay={4}>npm run deploy</AnimatedText>
                </TerminalLine>
                <TerminalLine>
                  <DelayedSpan $delay={6}>
                    <TerminalPrompt>[INFO]</TerminalPrompt> Building... {progress}% complete
                  </DelayedSpan>
                </TerminalLine>
              </TerminalContent>
            </Terminal>
            
          </ContentWrapper>
        </Container>
      </UnderConstructionPage>
  );
};

export default UnderConstruction;