import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { generateSEO, getPageSEO } from '../utils/seo';
import AlternativeContact from '../components/contact/alternative-contact';
import TerminalContainerSection from '../components/contact/terminal/terminal-container';

const ContactPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

// Page component
const Contact: React.FC = () => {
  const seo = generateSEO(getPageSEO('contact'));
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <ContactPage>
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
      

      <TerminalContainerSection />
      <AlternativeContact />
    </ContactPage>
  );
};

export default Contact;