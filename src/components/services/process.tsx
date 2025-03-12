import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import SectionHeading from "../common/section-heading";
import { float, twinkle, orbit, glow, pulse } from "../../styles/animation";

// Process Section
const ProcessSection = styled.section`
  padding: ${({ theme }) => theme.space[16]} 0;
  position: relative;
  overflow: hidden;
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
  position: relative;
  z-index: 2;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space[6]};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProcessPath = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${({ theme }) => theme.colors.primary} 10%,
    ${({ theme }) => theme.colors.secondary} 90%,
    transparent 100%
  );
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.8s ease-out;
  z-index: 1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary};
    animation: ${twinkle} 2s ease-in-out infinite;
  }
  
  &::before {
    top: 10%;
  }
  
  &::after {
    bottom: 10%;
  }
`;

const ProcessOrbit = styled.div<{ $visible: boolean }>`
  display: none;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 80%;
    border: 1px dashed rgba(110, 68, 255, 0.3);
    border-radius: 50%;
    opacity: ${({ $visible }) => ($visible ? 0.5 : 0)};
    transition: opacity 0.8s ease-out;
    z-index: 1;
  }
`;

const OrbitPoint = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  animation: ${twinkle} 3s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 10%;
    left: 50%;
  }
  
  &:nth-child(2) {
    top: 30%;
    right: 10%;
  }
  
  &:nth-child(3) {
    bottom: 30%;
    right: 10%;
  }
  
  &:nth-child(4) {
    bottom: 10%;
    left: 50%;
  }
  
  &:nth-child(5) {
    bottom: 30%;
    left: 10%;
  }
  
  &:nth-child(6) {
    top: 30%;
    left: 10%;
  }
`;

const ProcessStep = styled.div<{ $visible: boolean; $delay: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space[6]};
  background: linear-gradient(
    145deg,
    rgba(30, 42, 69, 0.6),
    rgba(20, 27, 43, 0.8)
  );
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid rgba(110, 68, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.9)}) 
             translateY(${({ $visible }) => ($visible ? 0 : '30px')});
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: ${({ $delay }) => $delay * 0.15}s;
  margin-bottom: ${({ theme }) => theme.space[6]};
  z-index: 2;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(18, 216, 250, 0.05),
      transparent
    );
    z-index: -1;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay * 0.5}s;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    border-color: rgba(110, 68, 255, 0.3);
  }
`;

const ProcessStepGlow = styled.div`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(18, 216, 250, 0.2) 0%,
    transparent 70%
  );
  animation: ${pulse} 3s ease-in-out infinite;
  z-index: -1;
`;

const ProcessNumber = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
  box-shadow: inset 0 0 15px rgba(110, 68, 255, 0.3);
  animation: ${glow} 3s ease-in-out infinite;
  border: 1px solid rgba(18, 216, 250, 0.3);
  user-select: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: conic-gradient(
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    z-index: -1;
    opacity: 0.3;
    animation: ${orbit} 10s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid rgba(18, 216, 250, 0.5);
    z-index: -1;
  }
`;

const NumberSpan = styled.span`
  position: relative;
  display: inline-block;
`;

const ProcessStepTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  }
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


  return (
    <ProcessSection>
        <ProcessContainer>
          <SectionHeading 
            title="Our [Process]"
            subtitle="We follow a proven methodology to ensure the success of every project from start to finish."
          />
          
          <ProcessOrbit $visible={processInView}>
            {[...Array(6)].map((_, index) => (
              <OrbitPoint key={index} />
            ))}
          </ProcessOrbit>
          
          <ProcessPath $visible={processInView} />
          
          <ProcessSteps ref={processRef}>
            {processSteps.map((step, index) => (
              <ProcessStep 
                key={index} 
                $visible={processInView} 
                $delay={index}
              >
                <ProcessStepGlow />
                <ProcessNumber>
                  <NumberSpan>{step.number}</NumberSpan>
                </ProcessNumber>
                <ProcessStepTitle>{step.title}</ProcessStepTitle>
                <ProcessStepDescription>{step.description}</ProcessStepDescription>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessContainer>
    </ProcessSection>
  );
};

export default Process;