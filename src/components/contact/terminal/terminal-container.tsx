import { FC } from "react";
import { styled } from "styled-components";
import SectionHeading from "../../common/section-heading";
import Terminal from "./terminal-ui/terminal-ui";

const TerminalSection = styled.section`
  padding: ${({ theme }) => theme.space[12]} 0 ${({ theme }) => theme.space[20]};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
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

const TerminalContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
`;

const TerminalInstructions = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const InstructionsList = styled.div`
  display: inline-block;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[4]};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Instruction = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Command = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const Description = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;


// Terminal commands - we still need these for the instructions display
const commands = [
  { command: 'help', description: 'Show available commands' },
  { command: 'contact', description: 'Start the contact form' },
  { command: 'about', description: 'Learn more about Orbit-Ops' },
  { command: 'services', description: 'View our services' },
  { command: 'clear', description: 'Clear the terminal' },
];


const TerminalContainerSection:FC = () => {
    return(
      <TerminalSection>
        <TerminalContainer>
          <TerminalInstructions>
            <SectionHeading 
              title="Terminal [Interface]"
              subtitle="Experience our space-themed approach with this interactive command-line terminal. Simply type a command to get started."
            />
            
            <InstructionsList>
              {commands.map((cmd, index) => (
                <Instruction key={index}>
                  <Command>{cmd.command}</Command>
                  <Description>{cmd.description}</Description>
                </Instruction>
              ))}
            </InstructionsList>
          </TerminalInstructions>
          
          <Terminal />
        </TerminalContainer>
      </TerminalSection>
    )
}
export default TerminalContainerSection;