import { styled } from "styled-components";
import { fadeInUp } from "../../styles/animation";

const HeroSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.space[20]} 0 ${({ theme }) => theme.space[12]};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(110, 68, 255, 0.1) 0%,
      transparent 50%
    );
    z-index: 0;
  }
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

const HeroContactSection = () => {
    return(
              <HeroSection>
        <HeroContainer>
          <HeroTitle>Get in <span>Touch</span></HeroTitle>
          <HeroDescription>
            Ready to launch your next project? Have questions about our services? Use our command-line terminal below to reach out, or explore alternative contact methods.
          </HeroDescription>
        </HeroContainer>
      </HeroSection>
    )
}

export default HeroContactSection;