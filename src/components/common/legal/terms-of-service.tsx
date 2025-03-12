import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { fadeInUp } from '../../../styles/animation';
import { generateSEO, getPageSEO } from '../../../utils/seo';
import ParallaxBackground from '../parallax/parallax-background';

// Styled components
const TermsOfServicePage = styled.div`
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

const TermsOfService: React.FC = () => {
  const seo = generateSEO(getPageSEO('terms-of-service'));
  
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
      <TermsOfServicePage>
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
          <PageTitle>Terms of <span>Service</span></PageTitle>
          <LastUpdated>Last Updated: March 12, 2025</LastUpdated>
          
          <ContentSection>
            <SectionTitle>1. Agreement to Terms</SectionTitle>
            <Paragraph>
              These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Orbit-Ops ("we," "us," or "our"), concerning your access to and use of our website [orbitopsdev.com] and services.
            </Paragraph>
            <Paragraph>
              By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of these Terms, then you may not access the website or use our services.
            </Paragraph>
            <Paragraph>
              We reserve the right to change or modify these Terms at any time. If we make changes to these Terms, we will provide notice of such changes, such as by updating the "Last Updated" date at the top of these Terms. By continuing to access or use our website and services after any revisions become effective, you agree to be bound by the revised Terms.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>2. Intellectual Property Rights</SectionTitle>
            
            <SubsectionTitle>2.1 Our Intellectual Property</SubsectionTitle>
            <Paragraph>
              Unless otherwise indicated, our website and all its content, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, and the design, selection, and arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </Paragraph>
            
            <SubsectionTitle>2.2 Your Use of Our Intellectual Property</SubsectionTitle>
            <Paragraph>
              These Terms permit you to use our website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as follows:
            </Paragraph>
            <List>
              <ListItem>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</ListItem>
              <ListItem>You may store files that are automatically cached by your Web browser for display enhancement purposes.</ListItem>
              <ListItem>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</ListItem>
              <ListItem>If we provide social media features with certain content, you may take such actions as are enabled by such features.</ListItem>
            </List>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>3. User Representations</SectionTitle>
            <Paragraph>
              By using our website and services, you represent and warrant that:
            </Paragraph>
            <List>
              <ListItem>All registration information you submit will be true, accurate, current, and complete.</ListItem>
              <ListItem>You will maintain the accuracy of such information and promptly update such registration information as necessary.</ListItem>
              <ListItem>You have the legal capacity and you agree to comply with these Terms.</ListItem>
              <ListItem>You are not under the age of 13.</ListItem>
              <ListItem>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the website.</ListItem>
              <ListItem>You will not access the website through automated or non-human means, whether through a bot, script, or otherwise.</ListItem>
              <ListItem>You will not use the website for any illegal or unauthorized purpose.</ListItem>
              <ListItem>Your use of the website will not violate any applicable law or regulation.</ListItem>
            </List>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>4. User Registration</SectionTitle>
            <Paragraph>
              You may be required to register with us to access certain areas of the website or use certain services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>5. Products and Services</SectionTitle>
            
            <SubsectionTitle>5.1 Product and Service Offerings</SubsectionTitle>
            <Paragraph>
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products and services available on our website. However, we do not guarantee that the colors, features, specifications, and details of the products and services will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products and services.
            </Paragraph>
            
            <SubsectionTitle>5.2 Availability, Errors, and Inaccuracies</SubsectionTitle>
            <Paragraph>
              We are constantly updating product and service offerings on our website. We may experience delays in updating information on the website and in our advertising on other websites. The information found on the website may contain errors or inaccuracies and may not be complete or current. Products or services may be mispriced, described inaccurately, or unavailable on the website, and we cannot guarantee the accuracy or completeness of any information found on the website.
            </Paragraph>
            <Paragraph>
              We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>6. Purchases and Payment</SectionTitle>
            
            <SubsectionTitle>6.1 Payment Processing</SubsectionTitle>
            <Paragraph>
              We accept various payment methods for products and services. You represent and warrant that (i) the credit card information you supply to us is true, correct, and complete, (ii) you are duly authorized to use such credit card for the purchase, (iii) charges incurred by you will be honored by your credit card company, and (iv) you will pay charges incurred by you at the posted prices, including all applicable taxes, if any.
            </Paragraph>
            
            <SubsectionTitle>6.2 Pricing and Billing</SubsectionTitle>
            <Paragraph>
              All prices are shown in U.S. dollars and applicable taxes and fees are added at checkout. We reserve the right to adjust prices as we may determine in our sole discretion, at any time and without notice. We will not, however, be able to notify you of changes in any applicable taxes.
            </Paragraph>
            <Paragraph>
              The price applicable to a product or service will be the price in effect at the time of the order. If there is a conflict between the price listed on the website and the actual price, we have the right to refuse or cancel any such orders, whether or not the order has been confirmed and your credit card charged.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>7. Refund and Cancellation Policy</SectionTitle>
            <Paragraph>
              All sales are final and no refunds will be issued, except in our sole and absolute discretion. If we decide to issue a refund, we will process the refund within thirty (30) days of our decision.
            </Paragraph>
            <Paragraph>
              For subscription or recurring payment services, you may cancel your subscription at any time by contacting us. Upon cancellation, you will retain access to the service until the end of your billing cycle, at which point no further charges will be made.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>8. Prohibited Activities</SectionTitle>
            <Paragraph>
              You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </Paragraph>
            <Paragraph>
              As a user of the website, you agree not to:
            </Paragraph>
            <List>
              <ListItem>Systematically retrieve data or other content from the website to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</ListItem>
              <ListItem>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</ListItem>
              <ListItem>Circumvent, disable, or otherwise interfere with security-related features of the website, including features that prevent or restrict the use or copying of any content or enforce limitations on the use of the website and/or the content contained therein.</ListItem>
              <ListItem>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the website.</ListItem>
              <ListItem>Use any information obtained from the website in order to harass, abuse, or harm another person.</ListItem>
              <ListItem>Make improper use of our support services or submit false reports of abuse or misconduct.</ListItem>
              <ListItem>Use the website in a manner inconsistent with any applicable laws or regulations.</ListItem>
              <ListItem>Engage in unauthorized framing of or linking to the website.</ListItem>
              <ListItem>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming, that interferes with any party's uninterrupted use and enjoyment of the website or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the website.</ListItem>
              <ListItem>Delete the copyright or other proprietary rights notice from any content.</ListItem>
              <ListItem>Attempt to impersonate another user or person or use the username of another user.</ListItem>
              <ListItem>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism.</ListItem>
              <ListItem>Interfere with, disrupt, or create an undue burden on the website or the networks or services connected to the website.</ListItem>
              <ListItem>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the website to you.</ListItem>
              <ListItem>Attempt to bypass any measures of the website designed to prevent or restrict access to the website, or any portion of the website.</ListItem>
            </List>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>9. User Generated Contributions</SectionTitle>
            <Paragraph>
              The website does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the website, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the website and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the website Privacy Policy.
            </Paragraph>
            <Paragraph>
              By creating or making available any Contributions, you represent and warrant that:
            </Paragraph>
            <List>
              <ListItem>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</ListItem>
              <ListItem>Your Contributions are not false, inaccurate, or misleading.</ListItem>
              <ListItem>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</ListItem>
              <ListItem>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</ListItem>
              <ListItem>Your Contributions do not violate any applicable law, regulation, or rule.</ListItem>
              <ListItem>Your Contributions do not violate the privacy or publicity rights of any third party.</ListItem>
            </List>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>10. Contribution License</SectionTitle>
            <Paragraph>
              By posting your Contributions to any part of the website, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>11. Third-Party Websites and Content</SectionTitle>
            <Paragraph>
              The website may contain links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the website or any Third-Party Content posted on, available through, or installed from the website.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>12. Site Management</SectionTitle>
            <Paragraph>
              We reserve the right, but not the obligation, to: (1) monitor the website for violations of these Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the website or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the website in a manner designed to protect our rights and property and to facilitate the proper functioning of the website.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>13. Term and Termination</SectionTitle>
            <Paragraph>
              These Terms shall remain in full force and effect while you use the website. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE WEBSITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE WEBSITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>14. Disclaimer</SectionTitle>
            <Paragraph>
              THE WEBSITE IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. YOU AGREE THAT YOUR USE OF THE WEBSITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE WEBSITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE WEBSITE'S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE WEBSITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE WEBSITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE WEBSITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE WEBSITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE WEBSITE.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>15. Limitation of Liability</SectionTitle>
            <Paragraph>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>16. Indemnification</SectionTitle>
            <Paragraph>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the website; (3) breach of these Terms; (4) any breach of your representations and warranties set forth in these Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the website with whom you connected via the website. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>17. User Data</SectionTitle>
            <Paragraph>
              We will maintain certain data that you transmit to the website for the purpose of managing the website, as well as data relating to your use of the website. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the website. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>18. Electronic Communications, Transactions, and Signatures</SectionTitle>
            <Paragraph>
              Visiting the website, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the website, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE WEBSITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>19. Miscellaneous</SectionTitle>
            <Paragraph>
              These Terms and any policies or operating rules posted by us on the website constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. These Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms or use of the website. You agree that these Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms and the lack of signing by the parties hereto to execute these Terms.
            </Paragraph>
          </ContentSection>
          
          <ContentSection>
            <SectionTitle>20. Contact Us</SectionTitle>
            <Paragraph>
              In order to resolve a complaint regarding the website or to receive further information regarding use of the website, please contact us at:
            </Paragraph>
            <ContactInfo>
              <p>Orbit-Ops</p>
              <p>Email: orbitopsdev@gmail.com</p>
            </ContactInfo>
          </ContentSection>
        </Container>
      </TermsOfServicePage>
    </ParallaxBackground>
  );
};

export default TermsOfService;