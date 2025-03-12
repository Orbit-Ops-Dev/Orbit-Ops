import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeInUp, scaleIn } from '../../styles/animation';
import ParallaxBackground, { ParallaxLayerType } from '../common/parallax/parallax-background';
import { Star } from 'lucide-react';

// Types
interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
}

// Styled Components
const ReviewsSection = styled.section`
  position: relative;
  padding: ${props => props.theme.space[16]} ${props => props.theme.space[4]};
  min-height: 500px;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.space[12]};
  animation: ${fadeInUp} 0.6s ease-out;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes['3xl']};
  margin-bottom: ${props => props.theme.space[4]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }

  span {
    color: ${props => props.theme.colors.secondary};
  }
`;

const SectionDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
`;

const ReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.space[6]};
  width: 100%;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    gap: ${props => props.theme.space[8]};
  }
`;

const ReviewCard = styled.div<{ $active?: boolean }>`
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.backgroundLight} 0%,
    ${props => props.theme.colors.backgroundAlt} 100%
  );
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.space[6]};
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.default};
  position: relative;
  overflow: hidden;
  animation: ${scaleIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  ${props => props.$active && `
    border: 1px solid ${props.theme.colors.primary};
    box-shadow: 0 0 15px rgba(110, 68, 255, 0.2);
  `}
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.space[4]};
`;

const AvatarContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${props => props.theme.radii.full};
  overflow: hidden;
  margin-right: ${props => props.theme.space[4]};
  border: 2px solid ${props => props.theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewerInfo = styled.div`
  flex: 1;
`;

const ReviewerName = styled.h4`
  margin: 0 0 ${props => props.theme.space[1]};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
`;

const ReviewerRole = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
`;

const RatingContainer = styled.div`
  display: flex;
  margin: ${props => props.theme.space[3]} 0;
`;

const StarIcon = styled(Star)<{ $filled?: boolean }>`
  color: ${props => props.$filled ? props.theme.colors.accent3 : props.theme.colors.textDark};
  fill: ${props => props.$filled ? props.theme.colors.accent3 : 'transparent'};
  margin-right: 2px;
  width: 18px;
  height: 18px;
`;

const ReviewText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.fontSizes.md};
  line-height: ${props => props.theme.lineHeights.relaxed};
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: ${props => props.theme.space[4]};
  right: ${props => props.theme.space[4]};
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primaryLight};
  opacity: 0.1;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.space[8]};
`;

const PageIndicator = styled.button<{ $active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: ${props => props.theme.radii.full};
  margin: 0 ${props => props.theme.space[1]};
  background-color: ${props => props.$active 
    ? props.theme.colors.secondary 
    : props.theme.colors.backgroundLight};
  border: none;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.$active 
      ? props.theme.colors.secondary 
      : props.theme.colors.secondaryDark};
  }
`;

// Main Component
const Reviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Define parallax layers
  const parallaxLayers: ParallaxLayerType[] = [
    { 
      speed: 0.05, 
      type: 'cyber', 
      direction: 'y' 
    },
    { 
      speed: 0.03, 
      type: 'linear', 
      opacity: 0.2 
    }
  ];

  // Sample reviews data (you would replace this with your actual data source)
  const sampleReviews: Review[] = [
    {
      id: '1',
      name: 'Jovita G.',
      role: 'CEO',
      company: 'Jovitas Cleaning Services',
      rating: 5,
      text: 'Perfect 🤩 You have done beautiful work Franky. Thank you'
    },
    {
      id: '2',
      name: 'Frank N.',
      role: 'Manager',
      company: 'Safelite',
      rating: 5,
      text: 'Awesome!! You were able to automate something i hated doing, and now i dont have to worry about it ever again.'
    }
  ];

  // Calculate reviews to display (for pagination if needed)
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(sampleReviews.length / reviewsPerPage);
  const displayedReviews = sampleReviews.slice(
    currentPage * reviewsPerPage, 
    (currentPage + 1) * reviewsPerPage
  );

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <StarIcon 
        key={index} 
        $filled={index < rating} 
        size={16}
      />
    ));
  };


  return (
    <ParallaxBackground layers={parallaxLayers}>
      <ReviewsSection>
        <ContentWrapper>
          <SectionHeader>
            <SectionTitle>What Our <span>Clients</span> Say</SectionTitle>
            <SectionDescription>
              Discover how we've helped businesses transform their digital experiences 
              and achieve remarkable results.
            </SectionDescription>
          </SectionHeader>
          
          <ReviewsContainer>
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id}>
                <QuoteIcon>"</QuoteIcon>
                <ReviewHeader>
                    <AvatarContainer>
                      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#4285F4" d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"></path><path fill="#34A853" d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"></path><path fill="#FBBC04" d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"></path><path fill="#EA4335" d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"></path></g></svg>
                    </AvatarContainer>
                  <ReviewerInfo>
                    <ReviewerName>{review.name}</ReviewerName>
                    <ReviewerRole>
                      {review.role}, {review.company}
                    </ReviewerRole>
                  </ReviewerInfo>
                </ReviewHeader>
                <RatingContainer>
                  {renderStars(review.rating)}
                </RatingContainer>
                <ReviewText>{review.text}</ReviewText>
              </ReviewCard>
            ))}
          </ReviewsContainer>
          
          {totalPages > 1 && (
            <Controls>
              {Array(totalPages).fill(0).map((_, index) => (
                <PageIndicator 
                  key={index} 
                  $active={index === currentPage}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </Controls>
          )}
        </ContentWrapper>
      </ReviewsSection>
    </ParallaxBackground>
  );
};

export default Reviews;