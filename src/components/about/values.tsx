import React from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../common/section-heading';

// Styled components
const ValuesSection = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.space[20]} 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 70% 80%,
      rgba(18, 216, 250, 0.1) 0%,
      transparent 60%
    );
    z-index: 0;
  }
`;

const ValuesContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[10]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ValueCard = styled.div<{ $visible: boolean; $delay: number }>`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.space[6]};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ $delay }) => $delay}s;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  }
`;

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(110, 68, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  
  svg {
    width: 30px;
    height: 30px;
  }
`;

const ValueTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex-grow: 1;
`;


// Values data
const values = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies and creative thinking to deliver forward-looking solutions that keep you ahead of the curve.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'We are committed to delivering exceptional quality in everything we do, setting high standards and exceeding expectations consistently.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'We operate with honesty, transparency, and strong ethical principles, building trust through every interaction and relationship.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
        <path d="M9 18h6"></path>
        <path d="M10 22h4"></path>
      </svg>
    ),
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and partnership, working closely with our clients to create solutions that truly address their needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    id: 'adaptability',
    title: 'Adaptability',
    description: 'We embrace change and remain flexible, evolving our approaches and solutions to meet the dynamic demands of the digital landscape.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'We design solutions with longevity in mind, creating digital assets that grow with your business and minimize environmental impact.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
  },
];

// Component
const Values: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <ValuesSection id="values">
      <ValuesContainer>
        <SectionHeading
          title="Our [Values]"
          subtitle="The core principles that guide our work and define our commitment to excellence in every project."
        />
        
        <ValuesGrid ref={ref}>
          {values.map((value, index) => (
            <ValueCard 
              key={value.id} 
              $visible={inView} 
              $delay={0.1 * index}
            >
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
        
      </ValuesContainer>
    </ValuesSection>
  );
};

export default Values;