import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: ${({ theme }) => theme.space[12]} 0 ${({ theme }) => theme.space[6]};
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[8]};
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const LogoBracket = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: linear-gradient(
    90deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const FooterDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const FooterHeading = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateX(3px);
  }
`;

const FooterBottom = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[6]} ${({ theme }) => theme.space[4]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Company Column */}
        <FooterColumn>
          <FooterLogo>
            <LogoBracket>{'<'}</LogoBracket>
            <LogoText>Orbit-Ops</LogoText>
            <LogoBracket>{'/>'}</LogoBracket>
          </FooterLogo>
          <FooterDescription>
            Elevating digital experiences through innovative web design, 
            graphic design, and automation solutions with a unique 
            space-themed approach.
          </FooterDescription>
          <SocialLinks>
            {/* Social Media Icons */}
            <SocialLink href="https://twitter.com" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </SocialLink>
            <SocialLink href="https://instagram.com" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>

        {/* Quick Links Column */}
        <FooterColumn>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/services">Services</FooterLink>
          <FooterLink href="/portfolio">Portfolio</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        {/* Services Column */}
        <FooterColumn>
          <FooterHeading>Services</FooterHeading>
          <FooterLink href="/services/web-design">Web Design</FooterLink>
          <FooterLink href="/services/graphic-design">Graphic Design</FooterLink>
          <FooterLink href="/services/automation">Automation</FooterLink>
          <FooterLink href="/services/consulting">Consulting</FooterLink>
        </FooterColumn>

        {/* Contact Column */}
        <FooterColumn>
          <FooterHeading>Contact</FooterHeading>
          <FooterLink href="mailto:hello@orbit-ops.com">hello@orbit-ops.com</FooterLink>
          <FooterLink href="tel:+1234567890">+1 (234) 567-890</FooterLink>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <FooterDescription>
          © {new Date().getFullYear()} Orbit-Ops. All Rights Reserved.
        </FooterDescription>
        <FooterBottomLinks>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;