import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../common/section-heading';

// Styled components
const ServicesSection = styled.section`
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

const ServicesContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[10]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ServiceCard = styled.div<{ $visible: boolean; $delay: number }>`
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

const ServiceIcon = styled.div`
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

const ServiceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex-grow: 1;
`;

const ServiceLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondaryLight};
    gap: ${({ theme }) => theme.space[3]};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;


// Service data
const services = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Create stunning, responsive websites that captivate users and drive engagement with our space-themed design approach.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
        <line x1="12" y1="22" x2="12" y2="15.5"></line>
        <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
        <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
        <line x1="12" y1="2" x2="12" y2="8.5"></line>
      </svg>
    ),
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Elevate your brand with eye-catching logos, marketing materials, and visual assets that make you stand out from competitors.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    ),
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Streamline your workflow and boost productivity with custom automation solutions that handle repetitive tasks with precision.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    description: 'Dedicated assistance for existing clients, ensuring your digital solutions continue to evolve with your business needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 10h.01"></path>
        <path d="M12 10h.01"></path>
        <path d="M16 10h.01"></path>
      </svg>
    ),
  },
];

// Arrow icon
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Component
const ServicesOverview: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <ServicesSection id="services">
      <ServicesContainer>
        <SectionHeading
          title="Our [Services]"
          subtitle="We offer a comprehensive range of digital solutions to help your business thrive in the online universe."
        />
        
        <ServicesGrid ref={ref}>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              $visible={inView} 
              $delay={0.1 * index}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceLink to={`/services#${service.id}`}>
                Learn more <ArrowRightIcon />
              </ServiceLink>
            </ServiceCard>
          ))}
        </ServicesGrid>

      </ServicesContainer>
    </ServicesSection>
  );
};

export default ServicesOverview;