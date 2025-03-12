import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { fadeInUp } from '../../../styles/animation';
import { generateSEO, getPageSEO } from '../../../utils/seo';
import ParallaxBackground from '../parallax/parallax-background';

// Styled components
const PrivacyPolicyPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  padding-bottom: ${({ theme }) => theme.space[16]};
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.lg};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.space[8]};
  text-align: center;
  
  span {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const LastUpdated = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const ContentSection = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.space[8]};
  margin-bottom: ${({ theme }) => theme.space[8]};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[10]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
  position: relative;
  padding-bottom: ${({ theme }) => theme.space[3]};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  }
`;

const SubsectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.space[4]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const List = styled.ul`
  margin-bottom: ${({ theme }) => theme.space[6]};
  padding-left: ${({ theme }) => theme.space[6]};
`;

const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space[3]};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  
  &::marker {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ContactInfo = styled.div`
  margin-top: ${({ theme }) => theme.space[8]};
  padding: ${({ theme }) => theme.space[6]};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.radii.xl};
  text-align: center;
`;

const PrivacyPolicy: React.FC = () => {
  const seo = generateSEO(getPageSEO('privacy-policy'));
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <ParallaxBackground
      layers={[
        { speed: 0.05, direction: 'y', type: 'space', starsCount: 100, opacity: 0.3 }
      ]}
    >
      <PrivacyPolicyPage>
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
          <PageTitle>Privacy <span>Policy</span></PageTitle>
          <LastUpdated>Last Updated: March 12, 2025</LastUpdated>
          
          <ContentSection>
            <SectionTitle>1. Introduction</SectionTitle>
            <Paragraph>
              Welcome to Orbit-Ops ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [orbitopsdev.com] and use our services.
            </Paragraph>
            <Paragraph>
              Please read this Privacy Policy carefully. By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy. If you do not agree with our policies and practices, please do not use our website or services.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>2. Information We Collect</SectionTitle>
            
            <SubsectionTitle>2.1 Personal Information</SubsectionTitle>
            <Paragraph>
              We may collect personal information that you voluntarily provide to us when you:
            </Paragraph>
            <List>
              <ListItem>Register for an account</ListItem>
              <ListItem>Fill out a contact form</ListItem>
              <ListItem>Subscribe to our newsletter</ListItem>
              <ListItem>Request a quote or consultation</ListItem>
              <ListItem>Participate in surveys or promotions</ListItem>
              <ListItem>Communicate with us via email, phone, or social media</ListItem>
            </List>
            <Paragraph>
              This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
            </Paragraph>
            
            <SubsectionTitle>2.2 Automatically Collected Information</SubsectionTitle>
            <Paragraph>
              When you visit our website, our servers may automatically log standard information such as:
            </Paragraph>
            <List>
              <ListItem>IP address</ListItem>
              <ListItem>Browser type and version</ListItem>
              <ListItem>Operating system</ListItem>
              <ListItem>Referring website</ListItem>
              <ListItem>Pages visited</ListItem>
              <ListItem>Time and date of visits</ListItem>
              <ListItem>Time spent on pages</ListItem>
              <ListItem>Other statistics</ListItem>
            </List>
            
            <SubsectionTitle>2.3 Cookies and Tracking Technologies</SubsectionTitle>
            <Paragraph>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. They are sent to your browser from a website and stored on your device.
            </Paragraph>
            <Paragraph>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>3. How We Use Your Information</SectionTitle>
            <Paragraph>
              We may use the information we collect for various purposes, including to:
            </Paragraph>
            <List>
              <ListItem>Provide, maintain, and improve our website and services</ListItem>
              <ListItem>Process and complete transactions</ListItem>
              <ListItem>Send administrative information, such as updates, security alerts, and support messages</ListItem>
              <ListItem>Respond to your comments, questions, and requests</ListItem>
              <ListItem>Communicate with you about products, services, offers, promotions, and events</ListItem>
              <ListItem>Monitor and analyze trends, usage, and activities in connection with our website</ListItem>
              <ListItem>Detect, prevent, and address technical issues</ListItem>
              <ListItem>Protect against harmful, unauthorized, or illegal activity</ListItem>
            </List>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>4. How We Share Your Information</SectionTitle>
            <Paragraph>
              We may share your personal information in the following situations:
            </Paragraph>
            
            <SubsectionTitle>4.1 Third-Party Service Providers</SubsectionTitle>
            <Paragraph>
              We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. These may include payment processing, data analysis, email delivery, hosting services, customer service, and marketing efforts.
            </Paragraph>
            
            <SubsectionTitle>4.2 Business Transfers</SubsectionTitle>
            <Paragraph>
              If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your information may be transferred as part of such a transaction.
            </Paragraph>
            
            <SubsectionTitle>4.3 Legal Requirements</SubsectionTitle>
            <Paragraph>
              We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
            </Paragraph>
            
            <SubsectionTitle>4.4 Protect Rights and Safety</SubsectionTitle>
            <Paragraph>
              We may disclose your information when we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person, or as evidence in litigation.
            </Paragraph>
            
            <SubsectionTitle>4.5 With Your Consent</SubsectionTitle>
            <Paragraph>
              We may share your information with your consent or at your direction.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>5. Data Security</SectionTitle>
            <Paragraph>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>6. Data Retention</SectionTitle>
            <Paragraph>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>7. Your Privacy Rights</SectionTitle>
            
            <SubsectionTitle>7.1 Access, Update, or Delete</SubsectionTitle>
            <Paragraph>
              You have the right to access, update, or delete the personal information we have on you. You can do this by contacting us directly. We will respond to your request within a reasonable timeframe.
            </Paragraph>
            
            <SubsectionTitle>7.2 Right to Object</SubsectionTitle>
            <Paragraph>
              You have the right to object to our processing of your personal information.
            </Paragraph>
            
            <SubsectionTitle>7.3 Data Portability</SubsectionTitle>
            <Paragraph>
              You have the right to receive a copy of your personal information in a structured, commonly used, and machine-readable format.
            </Paragraph>
            
            <SubsectionTitle>7.4 California Privacy Rights</SubsectionTitle>
            <Paragraph>
              If you are a California resident, you have specific rights regarding access to your personal information under the California Consumer Privacy Act (CCPA).
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>8. Children's Privacy</SectionTitle>
            <Paragraph>
              Our website and services are not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children under 13. If you are under 13, please do not provide any information on our website. If we learn we have collected personal information from a child under 13 without verification of parental consent, we will delete that information as quickly as possible.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>9. Changes to This Privacy Policy</SectionTitle>
            <Paragraph>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>10. Third-Party Links</SectionTitle>
            <Paragraph>
              Our website may contain links to third-party websites and services. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. We advise you to read the privacy policy of each website you visit.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>11. Contact Us</SectionTitle>
            <Paragraph>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </Paragraph>
            <ContactInfo>
              <p>Email: orbitopsdev@gmail.com</p>
            </ContactInfo>
          </ContentSection>
        </Container>
      </PrivacyPolicyPage>
    </ParallaxBackground>
  );
};

export default PrivacyPolicy;