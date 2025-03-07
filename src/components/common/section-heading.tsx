import React from 'react';
import styled from 'styled-components';
import { fadeInUp } from '../../styles/animation';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  showLine?: boolean;
  className?: string;
}

const HeadingContainer = styled.div<{ $align: string }>`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space[8]};
  text-align: ${({ $align }) => $align};
  animation: ${fadeInUp} 0.5s ease-out;
`;

const HeadingTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const HeadingAccent = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const HeadingLine = styled.div<{ $align: string }>`
  position: relative;
  width: 80px;
  height: 3px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  margin: ${({ $align }) => {
    if ($align === 'center') return '0 auto';
    if ($align === 'right') return '0 0 0 auto';
    return '0'; // left
  }};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const HeadingSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 800px;
  margin: ${({ theme }) => `0 auto ${theme.space[4]} auto`};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  showLine = true,
  className,
}) => {
  // Function to add accent color to text within square brackets
  const formatTitle = (text: string) => {
    const parts = text.split(/(\[.*?\])/);
    
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        // Remove brackets and wrap content in accent span
        const content = part.substring(1, part.length - 1);
        return <HeadingAccent key={index}>{content}</HeadingAccent>;
      }
      return part;
    });
  };
  
  return (
    <HeadingContainer $align={align} className={className}>
      <HeadingTitle>{formatTitle(title)}</HeadingTitle>
      {showLine && <HeadingLine $align={align} />}
      {subtitle && <HeadingSubtitle>{subtitle}</HeadingSubtitle>}
    </HeadingContainer>
  );
};

export default SectionHeading;