import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { generateSEO, getPageSEO } from '../utils/seo';
import Process from '../components/services/process';
import ServicesHeroComponent from '../components/services/hero';
import ServicesInfo from '../components/services/services-info';

// Styled components
const ServicesPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;


// Page component
const Services: React.FC = () => {
  const seo = generateSEO(getPageSEO('services'));
  
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <ServicesPage>
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
      
    <ServicesHeroComponent />
    <ServicesInfo />
      <Process />
    </ServicesPage>
  );
};

export default Services;