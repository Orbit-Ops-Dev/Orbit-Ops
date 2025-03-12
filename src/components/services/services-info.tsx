import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import Button from "../common/button";

// Service data
const services = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Create a stunning, responsive website that captivates your audience and drives engagement with our space-themed design approach.',
    features: [
      'Custom, responsive website design',
      'User experience (UX) optimization',
      'Interactive elements and animations',
      'Mobile-first approach',
      'SEO-friendly structure',
      'Cross-browser compatibility',
    ],
    image: '/img/services/web-design.jpg',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Elevate your brand with eye-catching logos, marketing materials, and visual assets that make you stand out from competitors.',
    features: [
      'Logo and brand identity design',
      'Marketing and promotional materials',
      'Social media graphics and templates',
      'Infographics and data visualization',
      'Print-ready designs',
      'Packaging and merchandise design',
    ],
    image: '/img/services/graphic-design.jpg',
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Streamline your workflow and boost productivity with custom automation solutions that handle repetitive tasks with precision.',
    features: [
      'Business process automation',
      'Workflow optimization',
      'Custom script development',
      'System integration',
      'Data processing and reporting',
      'Scheduled task management',
    ],
    image: '/img/services/automation.jpg',
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    description: 'Dedicated assistance for existing clients, ensuring your digital solutions continue to evolve with your business needs.',
    features: [
      'Technical troubleshooting',
      'Regular maintenance and updates',
      'Performance optimization',
      'Training and documentation',
      'Security monitoring',
      'Strategic growth consultation',
    ],
    image: '/img/services/customer-support.jpg',
  },
];

const ServiceAction = styled.div`
  margin-top: ${({ theme }) => theme.space[6]};
`;


const ServiceImageContainer = styled.div<{ $visible: boolean }>`
  flex: 1;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  transition-delay: 0.2s;
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  border-radius: ${({ theme }) => theme.radii.xl};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const ServiceDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ServiceFeatures = styled.ul`
  margin-bottom: ${({ theme }) => theme.space[6]};
  padding-left: ${({ theme }) => theme.space[6]};
`;

const ServiceFeature = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[2]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  &::marker {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[10]};
  margin-top: ${({ theme }) => theme.space[10]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: center;
  }
`;

const ServiceContentReverse = styled(ServiceContent)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row-reverse;
  }
`;

const ServiceText = styled.div<{ $visible: boolean }>`
  flex: 1;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const ServiceTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[4]};
  position: relative;
  display: inline-block;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  }
`;

// Service Detail Section
const ServiceSection = styled.section`
  padding: ${({ theme }) => theme.space[16]} 0;
  position: relative;
  overflow: hidden;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const ServiceContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;





const ServicesInfo = () => {
      // Service section refs
  const serviceRefs = services.map(() => useInView({
    threshold: 0.2,
    triggerOnce: true,
  }));

    return(
        <>
                  {/* Service Sections */}
      {services.map((service, index) => {
  const [ref, inView] = serviceRefs[index];

  return (
    <ServiceSection key={service.id} id={service.id}>
      <ServiceContainer>
        {index % 2 === 0 ? (
          <ServiceContent ref={ref}>
            <ServiceText $visible={inView}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <ServiceFeature key={idx}>{feature}</ServiceFeature>
                ))}
              </ServiceFeatures>
              <ServiceAction>
                <Button to="/contact" size="lg">Get Started</Button>
              </ServiceAction>
            </ServiceText>
            
            <ServiceImageContainer $visible={inView}>
              <ServiceImage />
            </ServiceImageContainer>
          </ServiceContent>
        ) : (
          <ServiceContentReverse ref={ref}>
            <ServiceText $visible={inView}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <ServiceFeature key={idx}>{feature}</ServiceFeature>
                ))}
              </ServiceFeatures>
              <ServiceAction>
                <Button to="/contact" size="lg">Get Started</Button>
              </ServiceAction>
            </ServiceText>
            
            <ServiceImageContainer $visible={inView}>
              <ServiceImage />
            </ServiceImageContainer>
          </ServiceContentReverse>
        )}
      </ServiceContainer>
    </ServiceSection>
  );
})}
        </>
    )
}

export default ServicesInfo;