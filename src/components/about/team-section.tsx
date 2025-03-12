import { useInView } from "react-intersection-observer";
import ParallaxBackground, { ParallaxLayerType } from "../common/parallax/parallax-background";
import SectionHeading from "../common/section-heading";
import { styled } from "styled-components";
import frankyImg from '../../assets/images/franky.jpg'
import amelieImg from '../../assets/images/amelie.jpg'
import tristanImg from '../../assets/images/tristan.jpg'

// Team Section
const TeamSection = styled.section`
  padding: ${({ theme }) => theme.space[16]} 0;
  position: relative;
`;

const TeamContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const TeamGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[10]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const TeamCard = styled.div<{ $visible: boolean; $delay: number }>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ $delay }) => $delay}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const TeamImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // 1:1 aspect ratio
  overflow: hidden;
  
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
`;

const TeamImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  background-size: cover;
  background-position: center;
`;

const TeamInfo = styled.div`
  padding: ${({ theme }) => theme.space[4]};
`;

const TeamName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const TeamRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const TeamBio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const TeamSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[2]};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textMuted};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// Social icon placeholder
const WebsiteIcon = () => (
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#ffffff" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M39.93,55.72A24.86,24.86,0,1,1,56.86,32.15a37.24,37.24,0,0,1-.73,6"></path><path d="M37.86,51.1A47,47,0,0,1,32,56.7"></path><path d="M32,7A34.14,34.14,0,0,1,43.57,30a34.07,34.07,0,0,1,.09,4.85"></path><path d="M32,7A34.09,34.09,0,0,0,20.31,32.46c0,16.2,7.28,21,11.66,24.24"></path><line x1="10.37" y1="19.9" x2="53.75" y2="19.9"></line><line x1="32" y1="6.99" x2="32" y2="56.7"></line><line x1="11.05" y1="45.48" x2="37.04" y2="45.48"></line><line x1="7.14" y1="32.46" x2="56.86" y2="31.85"></line><path d="M53.57,57,58,52.56l-8-8,4.55-2.91a.38.38,0,0,0-.12-.7L39.14,37.37a.39.39,0,0,0-.46.46L42,53.41a.39.39,0,0,0,.71.13L45.57,49Z"></path></g></svg>
);


// Team data
const team = [
  {
    name: 'Franky Nava',
    role: 'Co-CEO & Software Engineer',
    bio: 'Software engineering expert with 3+ years of experience in web development, system architecture, and digital strategy.',
    image: frankyImg,
    social: {
      website: 'frankynava.com',
    },
  },
  {
    name: 'Tristan Hernandez',
    role: 'Co-CEO & Electrical Engineer',
    bio: 'Hardware specialist with expertise in automation, embedded systems, and futuristic technology solutions.',
    image: tristanImg,
    social: {
      website: 'tristanhernandez.com',
    },
  },
  {
    name: 'Amelie Guzman',
    role: 'Chief Marketing Officer',
    bio: 'Marketing strategist with a passion for growth, branding, and digital innovation. Expert in SEO, social media, and content marketing.',
    image: amelieImg,
    social: {
      website: 'amelieguzman.com',
    },
  },
];


const TeamSectionComponent: React.FC = () => {
  // Team section ref
  const [teamRef, teamInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  

    // Define parallax layers for team section
    const teamParallaxLayers: ParallaxLayerType[] = [
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

    return(
        <>
            <ParallaxBackground layers={teamParallaxLayers}>
            <TeamSection>
                <TeamContainer>
                <SectionHeading 
                    title="Meet Our [Team]"
                    subtitle="The passionate individuals behind Orbit-Ops who make digital magic happen."
                />
                
                <TeamGrid ref={teamRef}>
                    {team.map((member, index) => (
                    <TeamCard key={index} $visible={teamInView} $delay={0.1 * index}>
                        <TeamImageWrapper>
                        <TeamImage src={member.image} alt={member.name} /> 
                        </TeamImageWrapper>
                        <TeamInfo>
                        <TeamName>{member.name}</TeamName>
                        <TeamRole>{member.role}</TeamRole>
                        <TeamBio>{member.bio}</TeamBio>
                        
                        <TeamSocial>
                            {member.social.website && (
                            <SocialLink href={member.social.website} target="_blank" rel="noopener noreferrer">
                                <WebsiteIcon />
                            </SocialLink>
                            )}
                        </TeamSocial>
                        </TeamInfo>
                    </TeamCard>
                    ))}
                </TeamGrid>
                </TeamContainer>
            </TeamSection>
            </ParallaxBackground>
        </>
    )
}

export default TeamSectionComponent;