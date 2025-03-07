import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

import theme from '../styles/theme';
import { fadeInUp } from '../styles/animation';
import { generateSEO, getPageSEO } from '../utils/seo';
import Button from '../components/common/button';
import SectionHeading from '../components/common/section-heading';

// Styled components
const ServicesPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.space[20]} 0 ${({ theme }) => theme.space[12]};
  background-color: ${({ theme }) => theme.colors.background};
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

const ServiceAction = styled.div`
  margin-top: ${({ theme }) => theme.space[6]};
`;

// Process Section
const ProcessSection = styled.section`
  padding: ${({ theme }) => theme.space[16]} 0;
  background-color: ${({ theme }) => theme.colors.background};
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
      circle at 70% 30%,
      rgba(18, 216, 250, 0.1) 0%,
      transparent 50%
    );
    z-index: 0;
  }
`;

const ProcessContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space[10]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({ theme }) => theme.space[6]};
  }
`;

const ProcessStep = styled.div<{ $visible: boolean; $delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space[6]};
  flex: 0 1 250px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ $delay }) => $delay}s;
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

const ProcessNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: rgba(110, 68, 255, 0.2);
    border-radius: 50%;
    z-index: -1;
  }
`;

const ProcessStepTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
`;

const ProcessStepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
`;

// Pricing Section
const PricingSection = styled.section`
  padding: ${({ theme }) => theme.space[16]} 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;
  overflow: hidden;
`;

const PricingContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[10]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PricingCard = styled.div<{ $visible: boolean; $delay: number; $featured?: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.space[6]};
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ $delay }) => $delay}s;
  overflow: hidden;
  border: ${({ theme, $featured }) => $featured ? `2px solid ${theme.colors.primary}` : 'none'};
  transform: ${({ $featured }) => $featured ? 'scale(1.05)' : 'scale(1)'};
  z-index: ${({ $featured }) => $featured ? 2 : 1};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: scale(1);
    margin-top: ${({ $featured }) => $featured ? theme.space[6] : 0};
    margin-bottom: ${({ $featured }) => $featured ? theme.space[6] : 0};
  }
  
  &:hover {
    transform: translateY(-10px) ${({ $featured }) => $featured ? 'scale(1.05)' : 'scale(1)'};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      transform: translateY(-10px) scale(1);
    }
  }
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const PricingType = styled.h3<{ $featured?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme, $featured }) => $featured ? theme.colors.primary : theme.colors.text};
`;

const PricingPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const PricingDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.space[6]};
  flex-grow: 1;
`;

const PricingFeature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[3]};
  
  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const PricingAction = styled.div`
  margin-top: auto;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 20px;
  right: -30px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[4]}`};
  transform: rotate(45deg);
  width: 150px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;


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

// Process steps
const processSteps = [
  {
    number: 1,
    title: 'Discovery',
    description: 'We begin by understanding your goals, requirements, and vision to create a clear roadmap for your project.',
  },
  {
    number: 2,
    title: 'Planning',
    description: 'Our team develops a detailed strategy and timeline, outlining each phase of the project for maximum efficiency.',
  },
  {
    number: 3,
    title: 'Design',
    description: 'We create stunning visual concepts that align with your brand and engage your target audience.',
  },
  {
    number: 4,
    title: 'Development',
    description: 'Our developers bring the designs to life with clean, efficient code and cutting-edge technologies.',
  },
  {
    number: 5,
    title: 'Testing',
    description: 'Rigorous quality assurance ensures everything works flawlessly across all platforms and devices.',
  },
  {
    number: 6,
    title: 'Launch',
    description: 'We deploy your project and provide the support needed to ensure a successful launch.',
  },
];

// Pricing plans
const pricingPlans = [
  {
    type: 'Basic',
    price: '$899',
    description: 'Perfect for small businesses just starting out',
    features: [
      'Responsive website design',
      '5 pages included',
      'Basic SEO setup',
      'Contact form integration',
      '1 round of revisions',
      '30 days of support',
    ],
    featured: false,
  },
  {
    type: 'Professional',
    price: '$1,899',
    description: 'Ideal for growing businesses seeking more features',
    features: [
      'Everything in Basic',
      '10 pages included',
      'Advanced SEO optimization',
      'Blog/news section',
      'Social media integration',
      'Basic e-commerce (up to 10 products)',
      '3 rounds of revisions',
      '60 days of support',
    ],
    featured: true,
  },
  {
    type: 'Enterprise',
    price: '$3,499',
    description: 'Comprehensive solution for established businesses',
    features: [
      'Everything in Professional',
      'Unlimited pages',
      'Full e-commerce capabilities',
      'Custom animations and effects',
      'Advanced analytics setup',
      'Priority support',
      'Unlimited revisions',
      '90 days of support',
      'Monthly maintenance package',
    ],
    featured: false,
  },
];

// Page component
const Services: React.FC = () => {
  const seo = generateSEO(getPageSEO('services'));
  
  // Service section refs
  const serviceRefs = services.map(() => useInView({
    threshold: 0.2,
    triggerOnce: true,
  }));
  
  // Process section ref
  const [processRef, processInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Pricing section ref
  const [pricingRef, pricingInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
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
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          <HeroTitle>Our <span>Services</span></HeroTitle>
          <HeroDescription>
            We offer a comprehensive range of digital solutions to help your business thrive in the online universe, from stunning web design to powerful automation tools.
          </HeroDescription>
        </HeroContainer>
      </HeroSection>
      
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

      
      {/* Process Section */}
      <ProcessSection>
        <ProcessContainer>
          <SectionHeading 
            title="Our [Process]"
            subtitle="We follow a proven methodology to ensure the success of every project from start to finish."
          />
          
          <ProcessSteps ref={processRef}>
            {processSteps.map((step, index) => (
              <ProcessStep key={index} $visible={processInView} $delay={0.1 * index}>
                <ProcessNumber>{step.number}</ProcessNumber>
                <ProcessStepTitle>{step.title}</ProcessStepTitle>
                <ProcessStepDescription>{step.description}</ProcessStepDescription>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessContainer>
      </ProcessSection>
      
      {/* Pricing Section */}
      <PricingSection>
        <PricingContainer>
          <SectionHeading 
            title="Pricing [Plans]"
            subtitle="Transparent pricing options tailored to fit the needs and budget of your business."
          />
          
          <PricingGrid ref={pricingRef}>
            {pricingPlans.map((plan, index) => (
              <PricingCard 
                key={index} 
                $visible={pricingInView} 
                $delay={0.1 * index}
                $featured={plan.featured}
              >
                {plan.featured && <FeaturedBadge>Popular</FeaturedBadge>}
                
                <PricingHeader>
                  <PricingType $featured={plan.featured}>{plan.type}</PricingType>
                  <PricingPrice>{plan.price}</PricingPrice>
                  <PricingDescription>{plan.description}</PricingDescription>
                </PricingHeader>
                
                <PricingFeatures>
                  {plan.features.map((feature, idx) => (
                    <PricingFeature key={idx}>{feature}</PricingFeature>
                  ))}
                </PricingFeatures>
                
                <PricingAction>
                  <Button 
                    to="/contact" 
                    variant={plan.featured ? 'primary' : 'outline'} 
                    fullWidth
                  >
                    Get Started
                  </Button>
                </PricingAction>
              </PricingCard>
            ))}
          </PricingGrid>
        </PricingContainer>
      </PricingSection>
    </ServicesPage>
  );
};

export default Services;