import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { generateSEO, getPageSEO } from '../utils/seo';
import Values from '../components/about/values';
import TeamSectionComponent from '../components/about/team-section';
import AboutHeroSection from '../components/about/hero';

// Styled components
const AboutPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

// Page component
const About: React.FC = () => {
  const seo = generateSEO(getPageSEO('about'));

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
      
      <AboutHeroSection />
      <Values />
      <TeamSectionComponent />
    </AboutPage>
  );
};

export default About;