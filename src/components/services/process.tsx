import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import SectionHeading from "../common/section-heading";

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
  


const Process = () => {

      // Process section ref
  const [processRef, processInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  

    return(
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
    )
}

export default Process;