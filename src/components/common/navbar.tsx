import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fadeIn, twinkle, orbit } from '../../styles/animation';

// Logo components
const LogoBracket = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: linear-gradient(
    90deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

// Navigation container
const NavContainer = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  padding: ${({ theme, $scrolled }) => 
    $scrolled ? theme.space[3] : theme.space[6]} 0;
  background: ${({  $scrolled }) => 
    $scrolled 
      ? `rgba(10, 14, 23, 0.85)`
      : 'transparent'
  };
  backdrop-filter: ${({ $scrolled }) => 
    $scrolled ? 'blur(10px)' : 'none'
  };
  box-shadow: ${({ theme, $scrolled }) => 
    $scrolled ? `0 4px 20px ${theme.colors.shadow}` : 'none'
  };
  transition: ${({ theme }) => theme.transitions.default};
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

// Navigation items
const NavItems = styled.nav`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[8]};
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.secondary : theme.colors.text
  };
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme, $isActive }) => 
    $isActive ? theme.fontWeights.semibold : theme.fontWeights.medium
  };
  text-decoration: none;
  padding: ${({ theme }) => theme.space[2]} 0;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: ${({ theme }) => theme.transitions.default};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

// Mobile menu animations
const expandUniverse = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const collapseUniverse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const rotateIn = keyframes`
  0% {
    transform: rotate(-180deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
`;

const rotateOut = keyframes`
  0% {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(180deg) scale(0);
    opacity: 0;
  }
`;

// Mobile menu
const MenuButtonContainer = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.modal + 1};
  width: 40px;
  height: 40px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(110, 68, 255, 0.1);
    transition: transform 0.3s ease;
    transform: scale(0);
  }
  
  &:hover::before {
    transform: scale(1);
  }
`;

const MenuLineContainer = styled.div`
  position: relative;
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MenuLine = styled.span<{ $isOpen?: boolean; $position?: 'top' | 'middle' | 'bottom' }>`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};
  position: absolute;
  left: 0;
  
  ${({ $position }) => $position === 'top' && `
    top: 0;
  `}
  
  ${({ $position }) => $position === 'middle' && `
    top: 50%;
    transform: translateY(-50%);
  `}
  
  ${({ $position }) => $position === 'bottom' && `
    bottom: 0;
  `}
  
  ${({ $isOpen, $position }) => 
    $isOpen && $position === 'top' && `
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      background: ${({ theme }) => theme.colors.secondary};
    `}
  
  ${({ $isOpen, $position }) => 
    $isOpen && $position === 'middle' && `
      opacity: 0;
      transform: translateX(20px);
    `}
  
  ${({ $isOpen, $position }) => 
    $isOpen && $position === 'bottom' && `
      bottom: 50%;
      transform: translateY(50%) rotate(-45deg);
      background: ${({ theme }) => theme.colors.secondary};
    `}
`;

const MobileMenuContainer = styled.div<{ $isOpen: boolean; $animating: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  z-index: ${({ theme }) => theme.zIndices.overlay};
  display: ${({ $isOpen, $animating }) => ($isOpen || $animating ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${({ $isOpen, $animating }) => 
    $isOpen && $animating ? expandUniverse : 
    !$isOpen && $animating ? collapseUniverse : 'none'
  } 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top right;
  overflow-y: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 70% 30%,
      rgba(110, 68, 255, 0.15) 0%,
      transparent 60%
    );
    z-index: -1;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

// Stars for the mobile menu
const Star = styled.div<{ $size: number; $top: string; $left: string; $delay: number; $isOpen: boolean }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: #fff;
  border-radius: 50%;
  top: ${props => props.$top};
  left: ${props => props.$left};
  opacity: 0;
  animation: ${twinkle} ${props => 2 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  
  ${({ $isOpen }) => $isOpen && `
    opacity: 1;
  `}
`;

const Orbit = styled.div<{ $size: number; $isOpen: boolean }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 1px dashed rgba(18, 216, 250, 0.3);
  border-radius: 50%;
  opacity: 0;
  animation: ${orbit} 20s linear infinite;
  
  ${({ $isOpen }) => $isOpen && `
    opacity: 0.3;
  `}
`;

const Planet = styled.div<{ $size: number; $color: string; $top: string; $left: string; $delay: number; $isOpen: boolean }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: 50%;
  top: ${props => props.$top};
  left: ${props => props.$left};
  box-shadow: 0 0 10px ${props => props.$color + '80'};
  opacity: 0;
  transform: scale(0);
  animation: ${({ $isOpen }) => $isOpen ? rotateIn : rotateOut} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: ${props => props.$delay}s;
`;

const MobileNavItems = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
  opacity: 0;
  transform: translateY(20px);
  
  ${({ $isOpen }) => $isOpen && `
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s;
  `}
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean; $delay: number; $isOpen: boolean }>`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.secondary : theme.colors.text
  };
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  padding: ${({ theme }) => theme.space[2]} 0;
  opacity: 0;
  transform: translateY(20px);
  
  ${({ $isOpen, $delay }) => $isOpen && `
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.4s ease-out ${0.4 + $delay * 0.1}s, transform 0.4s ease-out ${0.4 + $delay * 0.1}s;
  `}
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${({ $isActive }) => ($isActive ? '80%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: ${({ theme }) => theme.transitions.default};
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 80%;
  }
`;

// Generate random stars
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
    });
  }
  return stars;
};

// Generate planets
const generatePlanets = () => {
  return [
    {
      id: 1,
      size: 20,
      color: '#6E44FF',
      top: '20%',
      left: '15%',
      delay: 0.1,
    },
    {
      id: 2,
      size: 15,
      color: '#12D8FA',
      top: '70%',
      left: '80%',
      delay: 0.2,
    },
    {
      id: 3,
      size: 10,
      color: '#FF5470',
      top: '40%',
      left: '75%',
      delay: 0.3,
    },
    {
      id: 4,
      size: 25,
      color: '#00E980',
      top: '85%',
      left: '30%',
      delay: 0.2,
    },
  ];
};

// Component
const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  
  // Random stars and planets
  const stars = generateStars(30);
  const planets = generatePlanets();
  const orbits = [
    { id: 1, size: 200 },
    { id: 2, size: 300 },
    { id: 3, size: 500 }
  ];
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Control body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      // Save the current scroll position
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Re-enable scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      // Restore scroll position
      const scrollY = document.body.style.top;
      if (scrollY) {
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Cleanup function to ensure scrolling is re-enabled
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsAnimating(true);
    setIsMenuOpen(!isMenuOpen);
    
    // Reset animating state after animation completes
    setTimeout(() => {
      if (!isMenuOpen) {
        setIsAnimating(false);
      }
    }, 600);
  };
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
  ];
  
  return (
    <NavContainer $scrolled={isScrolled}>
      <NavInner>
        <LogoContainer to="/">
          <LogoBracket>{'<'}</LogoBracket>
          <LogoText>Orbit-Ops</LogoText>
          <LogoBracket>{'/>'}</LogoBracket>
        </LogoContainer>
        
        <NavItems>
          {navLinks.map((link) => (
            <NavLink
              key={link.path + link.label}
              to={link.path}
              $isActive={location.pathname === link.path}
            >
              {link.label}
            </NavLink>
          ))}
        </NavItems>
        
        <MenuButtonContainer>
          <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
            <MenuLineContainer>
              <MenuLine $isOpen={isMenuOpen} $position="top" />
              <MenuLine $isOpen={isMenuOpen} $position="middle" />
              <MenuLine $isOpen={isMenuOpen} $position="bottom" />
            </MenuLineContainer>
          </MenuButton>
        </MenuButtonContainer>
        
        <MobileMenuContainer $isOpen={isMenuOpen} $animating={isAnimating}>
          {/* Stars */}
          {stars.map((star) => (
            <Star 
              key={`star-${star.id}`}
              $size={star.size}
              $top={star.top}
              $left={star.left}
              $delay={star.delay}
              $isOpen={isMenuOpen}
            />
          ))}
          
          {/* Orbits */}
          {orbits.map((orbit) => (
            <Orbit 
              key={`orbit-${orbit.id}`}
              $size={orbit.size}
              $isOpen={isMenuOpen}
            />
          ))}
          
          {/* Planets */}
          {planets.map((planet) => (
            <Planet 
              key={`planet-${planet.id}`}
              $size={planet.size}
              $color={planet.color}
              $top={planet.top}
              $left={planet.left}
              $delay={planet.delay}
              $isOpen={isMenuOpen}
            />
          ))}
          
          <MobileNavItems $isOpen={isMenuOpen}>
            {navLinks.map((link, index) => (
              <MobileNavLink
                key={link.path + link.label}
                to={link.path}
                $isActive={location.pathname === link.path}
                $delay={index}
                $isOpen={isMenuOpen}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </MobileNavItems>
        </MobileMenuContainer>
      </NavInner>
    </NavContainer>
  );
};

export default NavBar;