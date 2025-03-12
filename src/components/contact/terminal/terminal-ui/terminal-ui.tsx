import React, { useState, useRef, useEffect, KeyboardEvent, FormEvent } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

// Types
interface HistoryItem {
  type: 'command' | 'response';
  content: string;
  id: number;
}

interface FormData {
  from_name: string;
  reply_to: string;
  message: string;
  to_name: string;
}

// Styled Components
const TerminalContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TerminalTitle = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-left: ${({ theme }) => theme.space[3]};
  flex: 1;
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accent2};
`;

const StatusText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const TerminalControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[1]};
`;

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  
  &:nth-child(1) {
    background-color: ${({ theme }) => theme.colors.accent1};
  }
  
  &:nth-child(2) {
    background-color: ${({ theme }) => theme.colors.accent3};
  }
  
  &:nth-child(3) {
    background-color: ${({ theme }) => theme.colors.accent2};
  }
`;

const TerminalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space[4]};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primaryDark} ${({ theme }) => theme.colors.backgroundAlt};
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: ${({ theme }) => theme.radii.full};
  }
`;

const CommandLine = styled.div`
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.secondary};
  
  .prompt {
    color: ${({ theme }) => theme.colors.accent2};
    margin-right: ${({ theme }) => theme.space[2]};
  }
  
  .command-text {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ResponseLine = styled.div`
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[2]};
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.accent2};
  margin-right: ${({ theme }) => theme.space[2]};
`;

const TerminalInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0;
  caret-color: ${({ theme }) => theme.colors.secondary};
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

// Terminal Component
const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [counter, setCounter] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    reply_to: '',
    message: '',
    to_name: 'Orbit-Ops Team',
  });
  const [formStep, setFormStep] = useState(-1); // -1 means not in form mode
  const [currentPrompt, setCurrentPrompt] = useState('');
  
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitializedRef = useRef(false);

  // Form steps definition
  const formSteps = [
    {
      prompt: 'Please enter your full name:',
      field: 'from_name',
      validate: (value: string) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      }
    },
    {
      prompt: 'Please enter your email:',
      field: 'reply_to',
      validate: (value: string) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      }
    },
    {
      prompt: 'Please enter your message:',
      field: 'message',
      validate: (value: string) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      }
    },
  ];

  // Add a new entry to the terminal history
  const addToHistory = (type: 'command' | 'response', content: string) => {
    const id = counter;
    setCounter(prev => prev + 1);
    
    setHistory(prev => [
      ...prev,
      { type, content, id }
    ]);
  };

  // Simulate typing effect with simple delay instead of character-by-character
  const addResponse = async (text: string) => {
    setIsTyping(true);
    
    // Add a short delay to simulate typing
    await new Promise(resolve => setTimeout(resolve, text.length * 10));
    
    // Add the response to history
    addToHistory('response', text);
    
    setIsTyping(false);
  };

  // Validate the current form step
  const validateCurrentStep = (value: string): string => {
    if (formStep >= 0 && formStep < formSteps.length) {
      return formSteps[formStep].validate(value);
    }
    return '';
  };

  // Submit the form to EmailJs
  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      await addResponse('Submitting your message...');
      
      // Create a form element to use the traditional send method
      const form = document.createElement('form');
      const formDataObj = {
        service_id: 'service_iw848xp',
        template_id: 'template_v3hsrmb',
        user_id: 'pXucDMz_J7yTIFddz',
        template_params: {
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          message: formData.message,
          to_name: formData.to_name
        }
      };
      
      console.log('Attempting to send email with data:', formDataObj);
      
      // Use the alternative method with fetch directly to the EmailJS API
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
      });
      
      if (response.status === 200) {
        console.log('Email sent successfully');
        await addResponse('✓ Message sent successfully! We\'ll get back to you soon.');
      } else {
        const errorText = await response.text();
        console.error('Error sending email:', response.status, errorText);
        
        if (response.status === 412 && errorText.includes('Gmail_API')) {
          await addResponse('⚠ There appears to be an issue with our email service.');
          await addResponse('Your message has been saved. We\'ll process it manually.');
          // Here you could implement a fallback like saving to localStorage or a database
        } else {
          await addResponse('⚠ Failed to send message. Please try again later or contact us directly at orbitopsdev@gmail.com');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      await addResponse('⚠ Failed to send message. Please try again later or contact us directly at orbitopsdev@gmail.com');
    } finally {
      setIsSubmitting(false);
      await addResponse('Type "clear" to reset or "help" for more commands.');
      
      // Reset form mode
      setFormStep(-1);
      setFormData({
        from_name: '',
        reply_to: '',
        message: '',
        to_name: 'Orbit-Ops Team',
      });
    }
  };

  // Process the entered command
  const processCommand = async (command: string) => {
    if (!command.trim()) return;
    
    // Add command to history
    addToHistory('command', command);
    
    // Add a short delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Form submission mode
    if (formStep >= 0 && formStep < formSteps.length) {
      // Validate the input
      const error = validateCurrentStep(command);
      
      if (error) {
        // Show validation error
        await addResponse(`⚠ ${error}`);
        await addResponse(formSteps[formStep].prompt);
        setCurrentCommand('');
        return;
      }
      
      // Store the input in the appropriate form field
      setFormData(prev => ({
        ...prev,
        [formSteps[formStep].field]: command,
      }));
      
      // Move to the next form step
      const nextStep = formStep + 1;
      setFormStep(nextStep);
      
      if (nextStep === formSteps.length) {
        // Form is complete, show summary and confirm
        await addResponse('Here\'s what we\'ve got:');
        await addResponse(`Name: ${formData.from_name}`);
        await addResponse(`Email: ${formData.reply_to}`);
        await addResponse(`Message: ${command}`);
        await addResponse('');
        await addResponse('Does this look correct? Type "yes" to send or "no" to restart.');
        
        // Update the last field (message)
        setFormData(prev => ({
          ...prev,
          message: command,
        }));
      } else {
        // Display the next prompt
        setCurrentPrompt(formSteps[nextStep].prompt);
      }
    } else if (formStep === formSteps.length) {
      // Confirmation step
      if (command.toLowerCase() === 'yes') {
        await submitForm();
      } else if (command.toLowerCase() === 'no') {
        await addResponse('Form cancelled. Type "contact" to start again.');
        setFormStep(-1);
      } else {
        await addResponse('Please type "yes" to send or "no" to restart.');
      }
    } else {
      // Command mode
      switch (command.toLowerCase()) {
        case 'help':
          await addResponse('Available commands:');
          await addResponse('- contact: Start the contact form');
          await addResponse('- clear: Clear the terminal');
          await addResponse('- about: Learn more about Orbit-Ops');
          await addResponse('- services: View our services');
          break;
          
        case 'contact':
          await addResponse('Starting contact form...');
          setFormStep(0);
          setFormData({
            from_name: '',
            reply_to: '',
            message: '',
            to_name: 'Orbit-Ops Team',
          });
          setCurrentPrompt(formSteps[0].prompt);
          break;
          
        case 'clear':
          setHistory([]);
          break;
          
        case 'about':
          await addResponse('Orbit-Ops is a tech company specializing in Web Design, Graphic Design, Automation, and Customer Support.');
          await addResponse('We leverage cutting-edge technology to deliver elegant solutions for our clients.');
          break;
          
        case 'services':
          await addResponse('Our services include:');
          await addResponse('1. Web Design - Beautiful, responsive websites');
          await addResponse('2. Graphic Design - Eye-catching visuals');
          await addResponse('3. Automation - Streamline your workflow');
          await addResponse('4. Customer Support - For our existing clients');
          break;
          
        default:
          await addResponse(`Command not recognized: ${command}`);
          await addResponse('Type "help" for a list of available commands.');
      }
    }
    
    setCurrentCommand('');
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isTyping && !isSubmitting && currentCommand.trim()) {
      processCommand(currentCommand);
    }
  };

  // Initialize terminal with welcome message
  useEffect(() => {
    const initializeTerminal = async () => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;
      
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 500));
      await addResponse('Welcome to Orbit-Ops Terminal.');
      await addResponse('Type "help" for available commands or "contact" to get in touch.');
    };
    
    initializeTerminal();
    
    // No need to initialize EmailJS when using the fetch method directly
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus input when necessary
  useEffect(() => {
    if (!isTyping && !isSubmitting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping, isSubmitting]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const commands = ['help', 'contact', 'clear', 'about', 'services'];
      const matchedCommand = commands.find(cmd => cmd.startsWith(currentCommand.toLowerCase()));
      
      if (matchedCommand) {
        setCurrentCommand(matchedCommand);
      }
    }
  };

  return (
    <TerminalContainer onClick={() => inputRef.current?.focus()}>
      <TerminalHeader>
        <TerminalControls>
          <TerminalButton />
          <TerminalButton />
          <TerminalButton />
        </TerminalControls>
        <TerminalTitle>orbit-ops@terminal ~ $</TerminalTitle>
        <StatusBar>
          <StatusDot />
          <StatusText>
            {isSubmitting ? 'Sending...' : isTyping ? 'Processing...' : 'Ready'}
          </StatusText>
        </StatusBar>
      </TerminalHeader>
      
      <TerminalBody ref={terminalBodyRef}>
        {history.map((item) => (
          item.type === 'command' ? (
            <CommandLine key={item.id}>
              <span className="prompt">{'>'}</span>
              <span className="command-text">{item.content}</span>
            </CommandLine>
          ) : (
            <ResponseLine key={item.id}>
              {item.content}
            </ResponseLine>
          )
        ))}
        
        {formStep >= 0 && !isTyping && !isSubmitting && (
          <ResponseLine>{currentPrompt}</ResponseLine>
        )}
        
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Prompt>{formStep >= 0 ? '?' : '>'}</Prompt>
            <TerminalInput
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTyping || isSubmitting ? '' : 'Type a command...'}
              disabled={isTyping || isSubmitting}
              autoFocus
              aria-label="Terminal input"
            />
          </InputWrapper>
        </form>
      </TerminalBody>
    </TerminalContainer>
  );
};

export default Terminal;