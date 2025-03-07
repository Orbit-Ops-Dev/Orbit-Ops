import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { fadeInUp } from '../styles/animation';
import ParallaxBackground, { ParallaxLayerType } from '../components/common/parallax/parallax-background';
import { generateSEO, getPageSEO } from '../utils/seo';
import Values from '../components/about/values';
import TeamSectionComponent from '../components/about/team-section';

// Styled components
const AboutPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.space[20]} 0 ${({ theme }) => theme.space[12]};
`;

const HeroContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[4]};
  animation: ${fadeInUp} 0.5s ease-out;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.space[6]};
  animation: ${fadeInUp} 0.5s ease-out;
  animation-delay: 0.1s;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;


// Page component
const About: React.FC = () => {
  const seo = generateSEO(getPageSEO('about'));
  
  // Define parallax layers for hero section
  const heroParallaxLayers: ParallaxLayerType[] = [
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

  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <AboutPage>
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
      
      {/* Hero Section with Parallax Background */}
      <ParallaxBackground layers={heroParallaxLayers}>
        <HeroSection>
          <HeroContainer>
            <HeroTitle>About <span>Orbit-Ops</span></HeroTitle>
            <HeroDescription>
              We are a passionate team of designers, developers, and digital strategists with a mission to elevate your digital presence through innovative space-themed solutions.
            </HeroDescription>
          </HeroContainer>
        </HeroSection>
      </ParallaxBackground>
      
      <Values />
      <TeamSectionComponent />
    </AboutPage>
  );
};

export default About;