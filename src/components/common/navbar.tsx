import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animation';

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

// Mobile menu
const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndices.modal};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  z-index: ${({ theme }) => theme.zIndices.overlay};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavItems = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.secondary : theme.colors.text
  };
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  padding: ${({ theme }) => theme.space[2]} 0;
  
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

const MenuLine = styled.span<{ $isOpen?: boolean; $position?: 'top' | 'middle' | 'bottom' }>`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};
  
  ${({ $isOpen, $position }) => 
    $isOpen && $position === 'top' && `
      transform: translateY(9px) rotate(45deg);
    `}
  
  ${({ $isOpen, $position }) => 
    $isOpen && $position === 'middle' && `
      opacity: 0;
    `}
  
  ${({ $isOpen, $position }) => 
    $isOpen && $position === 'bottom' && `
      transform: translateY(-9px) rotate(-45deg);
    `}
`;

// Component
const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
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
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
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
              key={link.path}
              to={link.path}
              $isActive={location.pathname === link.path}
            >
              {link.label}
            </NavLink>
          ))}
        </NavItems>
        
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          <MenuLine $isOpen={isMenuOpen} $position="top" />
          <MenuLine $isOpen={isMenuOpen} $position="middle" />
          <MenuLine $isOpen={isMenuOpen} $position="bottom" />
        </MenuButton>
        
        <MobileMenuContainer $isOpen={isMenuOpen}>
          <MobileNavItems>
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.path}
                to={link.path}
                $isActive={location.pathname === link.path}
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