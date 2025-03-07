import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import ServicesOverview from '../components/home/services-overview';
import Hero from '../components/home/hero';
import { generateSEO, getPageSEO } from '../utils/seo';
import Reviews from '../components/home/review';

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home: React.FC = () => {
  const seo = generateSEO(getPageSEO('home'));
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <HomePage>
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
      
      <Hero />
      <ServicesOverview />
      <Reviews />
    </HomePage>
  );
};

export default Home;