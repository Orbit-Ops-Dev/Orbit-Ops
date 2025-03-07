import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { fadeInUp } from '../styles/animation';
import { generateSEO, getPageSEO } from '../utils/seo';
import SectionHeading from '../components/common/section-heading';
import Terminal from '../components/contact/terminal';

const ContactPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.space[20]} 0 ${({ theme }) => theme.space[12]};
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

// Additional contact methods section
const ContactMethodsSection = styled.section`
  padding: ${({ theme }) => theme.space[16]} 0;
  position: relative;
  overflow: hidden;
`;

const ContactMethodsContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const ContactMethodsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[8]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ContactMethodCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.space[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ContactMethodIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
  /* color: ${({ theme }) => theme.colors.primary}; */
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const ContactMethodTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const ContactMethodDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const ContactMethodLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondaryLight};
    text-decoration: underline;
  }
`;


// Contact methods data
const contactMethods = [
  {
    title: 'Email',
    description: 'Send us a direct message, and we\'ll get back to you within 24 hours.',
    link: 'mailto:contact@orbit-ops.com',
    linkText: 'contact@orbit-ops.com',
    icon: <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"></path> <g> <path d="M368,234.375v74.438l-54.5-59.422l16.719-11.312c-5.984-1.531-11.641-3.922-16.688-7.203L256,271.75L166.281,208H256 h37.625c-2.391-16-4-16-4.812-16H256H128v160h128h128V223.062C379.422,227.75,373.969,231.531,368,234.375z M144,212.531 l54.5,36.859L144,308.812V212.531z M256,336h-92.406l45.562-79.422L256,288.25l46.844-31.656L348.406,336H256z"></path> </g> <g> <path d="M344,144c-22.094,0-40,17.906-40,40s17.906,40,40,40s40-17.906,40-40S366.094,144,344,144z M368,192h-16v16h-16v-16h-16 v-16h16v-16h16v16h16V192z"></path> </g> </g> </g></svg>,
  },
  {
    title: 'Phone',
    description: 'Call us directly for immediate assistance during business hours.',
    link: 'tel:+11234567890',
    linkText: '+1 (123) 456-7890',
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.7177 3.0919C5.94388 1.80096 7.9721 2.04283 8.98569 3.47641L10.2467 5.25989C11.0574 6.40656 10.9889 8.00073 10.0214 9.0194L9.7765 9.27719C9.77582 9.27897 9.7751 9.2809 9.77436 9.28299C9.76142 9.31935 9.7287 9.43513 9.7609 9.65489C9.82765 10.1104 10.1793 11.0361 11.607 12.5392C13.0391 14.0469 13.9078 14.4023 14.3103 14.4677C14.484 14.4959 14.5748 14.4714 14.6038 14.4612L15.0124 14.031C15.8862 13.111 17.2485 12.9298 18.347 13.5621L20.2575 14.6617C21.8904 15.6016 22.2705 17.9008 20.9655 19.2747L19.545 20.7703C19.1016 21.2371 18.497 21.6355 17.75 21.7092C15.9261 21.8893 11.701 21.6548 7.27161 16.9915C3.13844 12.64 2.35326 8.85513 2.25401 7.00591L2.92011 6.97016L2.25401 7.00591C2.20497 6.09224 2.61224 5.30855 3.1481 4.7444L4.7177 3.0919ZM7.7609 4.34237C7.24855 3.61773 6.32812 3.57449 5.80528 4.12493L4.23568 5.77743C3.90429 6.12632 3.73042 6.52621 3.75185 6.92552C3.83289 8.43533 4.48307 11.8776 8.35919 15.9584C12.4234 20.2373 16.1676 20.3581 17.6026 20.2165C17.8864 20.1885 18.1783 20.031 18.4574 19.7373L19.8779 18.2417C20.4907 17.5965 20.3301 16.4342 19.5092 15.9618L17.5987 14.8621C17.086 14.567 16.4854 14.6582 16.1 15.064L15.6445 15.5435L15.1174 15.0428C15.6445 15.5435 15.6438 15.5442 15.6432 15.545L15.6417 15.5464L15.6388 15.5495L15.6324 15.556L15.6181 15.5701C15.6078 15.5801 15.5959 15.591 15.5825 15.6028C15.5556 15.6264 15.5223 15.6533 15.4824 15.6816C15.4022 15.7384 15.2955 15.8009 15.1606 15.8541C14.8846 15.963 14.5201 16.0214 14.0699 15.9483C13.1923 15.8058 12.0422 15.1755 10.5194 13.5722C8.99202 11.9642 8.40746 10.7645 8.27675 9.87234C8.21022 9.41827 8.26346 9.05468 8.36116 8.78011C8.40921 8.64508 8.46594 8.53742 8.51826 8.45566C8.54435 8.41489 8.56922 8.38075 8.5912 8.35298C8.60219 8.33909 8.61246 8.32678 8.62182 8.31603L8.63514 8.30104L8.64125 8.29441L8.64415 8.2913L8.64556 8.2898C8.64625 8.28907 8.64694 8.28835 9.17861 8.79333L8.64695 8.28834L8.93376 7.98637C9.3793 7.51731 9.44403 6.72292 9.02189 6.12586L7.7609 4.34237Z" fill="#ffffff"></path> <path d="M13.2595 1.87983C13.3257 1.47094 13.7122 1.19357 14.1211 1.25976C14.1464 1.26461 14.2279 1.27983 14.2705 1.28933C14.3559 1.30834 14.4749 1.33759 14.6233 1.38082C14.9201 1.46726 15.3347 1.60967 15.8323 1.8378C16.8286 2.29456 18.1544 3.09356 19.5302 4.46936C20.906 5.84516 21.705 7.17097 22.1617 8.16725C22.3899 8.66487 22.5323 9.07947 22.6187 9.37625C22.6619 9.52466 22.6912 9.64369 22.7102 9.72901C22.7197 9.77168 22.7267 9.80594 22.7315 9.83125L22.7373 9.86245C22.8034 10.2713 22.5286 10.6739 22.1197 10.7401C21.712 10.8061 21.3279 10.53 21.2601 10.1231C21.258 10.1121 21.2522 10.0828 21.2461 10.0551C21.2337 9.9997 21.2124 9.91188 21.1786 9.79572C21.1109 9.56339 20.9934 9.21806 20.7982 8.79238C20.4084 7.94207 19.7074 6.76789 18.4695 5.53002C17.2317 4.29216 16.0575 3.59117 15.2072 3.20134C14.7815 3.00618 14.4362 2.88865 14.2038 2.82097C14.0877 2.78714 13.9417 2.75363 13.8863 2.7413C13.4793 2.67347 13.1935 2.28755 13.2595 1.87983Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4861 5.32931C13.5999 4.93103 14.015 4.70041 14.4133 4.81421L14.2072 5.53535C14.4133 4.81421 14.4136 4.81431 14.414 4.81441L14.4147 4.81462L14.4162 4.81506L14.4196 4.81604L14.4273 4.81835L14.4471 4.82451C14.4622 4.82934 14.481 4.83562 14.5035 4.84358C14.5484 4.85952 14.6077 4.88218 14.6805 4.91339C14.8262 4.97582 15.0253 5.07224 15.2698 5.21695C15.7593 5.50664 16.4275 5.98781 17.2124 6.77279C17.9974 7.55776 18.4786 8.22595 18.7683 8.71541C18.913 8.95992 19.0094 9.15899 19.0718 9.30467C19.103 9.37748 19.1257 9.43683 19.1416 9.48175C19.1496 9.5042 19.1559 9.52303 19.1607 9.5381L19.1669 9.55789L19.1692 9.56564L19.1702 9.56898L19.1706 9.57051L19.1708 9.57124C19.1709 9.5716 19.171 9.57195 18.4499 9.77799L19.171 9.57195C19.2848 9.97023 19.0542 10.3853 18.6559 10.4991C18.261 10.612 17.8496 10.3862 17.7317 9.99414L17.728 9.98336C17.7227 9.96833 17.7116 9.93875 17.6931 9.89555C17.6561 9.80921 17.589 9.66798 17.4774 9.47939C17.2544 9.10265 16.8517 8.5334 16.1518 7.83345C15.4518 7.13349 14.8826 6.73079 14.5058 6.50782C14.3172 6.3962 14.176 6.32911 14.0897 6.2921C14.0465 6.27359 14.0169 6.26256 14.0019 6.25722L13.9911 6.25353C13.599 6.13565 13.3733 5.7242 13.4861 5.32931Z" fill="#ffffff"></path> </g></svg>
  },
  {
    title: 'Social Media',
    description: 'Connect with us on social networks for updates and more.',
    link: 'https://twitter.com/orbitops',
    linkText: 'Follow us @OrbitOps',
    icon: <svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"  fill="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path d="M268.726,393.156c-2.219,1.805-4.43,3.211-6.68,4.282c-1.508,0.164-3.039,0.289-4.578,0.367v-17.813 c-3.657-3.007-7.36-6.125-11.07-9.328v27.141c-1.524-0.078-3.07-0.203-4.578-0.367c-2.234-1.07-4.446-2.477-6.656-4.282 c-7.211-5.859-13.954-15.75-19.118-28.5h23.539c-4.016-3.578-8.031-7.273-12.047-11.07h-15.374 c-1.836-6.094-3.313-12.68-4.438-19.586c-4.359-4.523-8.618-9.054-12.734-13.586c0.922,11.781,2.828,22.969,5.664,33.172h-28.297 c-7.93-12.797-12.836-27.633-13.766-43.578h27.164c-3.203-3.711-6.328-7.398-9.352-11.07h-17.812 c0.382-6.539,1.461-12.867,3.125-18.961c-3.774-5.133-7.289-10.187-10.554-15.141c-4.836,12.297-7.516,25.649-7.516,39.641 c0,59.797,48.477,108.281,108.297,108.281c13.985,0,27.352-2.687,39.618-7.515c-6.586-4.344-13.383-9.156-20.282-14.383 C270.437,391.672,269.578,392.454,268.726,393.156z M185.812,370.602c-1.906-1.89-3.71-3.89-5.422-5.946h23.851 c1.782,4.852,3.719,9.462,5.914,13.711c2.578,4.985,5.43,9.516,8.546,13.531C206.25,387.164,195.078,379.859,185.812,370.602z"></path> <path d="M181.226,243.359c1.476-1.718,2.969-3.406,4.586-5.007c9.282-9.282,20.485-16.594,32.961-21.329 c-5.797,7.438-10.671,16.688-14.546,27.266h-22.414c2.367,3.609,4.922,7.304,7.633,11.062h11.226 c-1.031,3.671-1.89,7.5-2.695,11.406c2.985,3.813,6.078,7.672,9.321,11.563c1.164-8.141,2.797-15.883,4.922-22.969h34.18v43.586 h-21.039c3.438,3.695,6.922,7.398,10.523,11.07h10.516v10.531c3.671,3.578,7.382,7.086,11.07,10.516v-21.047h40.922 c-0.446,15.906-2.867,30.734-6.742,43.578h-8.102c5.321,4.281,10.57,8.328,15.719,12.078c0.117-0.343,0.273-0.656,0.398-1.008 h23.828c-1.726,2.055-3.531,4.055-5.422,5.946c-1.609,1.61-3.289,3.125-5.007,4.594c4.546,2.954,8.961,5.641,13.179,8.008 c20.914-19.742,33.993-47.695,33.993-78.726c-0.016-59.805-48.493-108.289-108.29-108.289c-31.046,0-59,13.07-78.726,33.976 C175.586,234.398,178.281,238.813,181.226,243.359z M331.523,353.586h-28.328c3.656-13.172,5.867-27.914,6.297-43.578h35.781 C344.343,325.954,339.437,340.79,331.523,353.586z M331.507,255.352c7.93,12.797,12.836,27.64,13.766,43.586h-35.812 c-0.43-15.641-2.578-30.414-6.234-43.586H331.507z M318.07,238.352c1.891,1.89,3.696,3.874,5.406,5.938H299.64 c-1.781-4.852-3.734-9.469-5.914-13.703c-2.578-4.985-5.446-9.508-8.562-13.531C297.617,221.79,308.789,229.102,318.07,238.352z M257.469,211.133c1.538,0.094,3.07,0.219,4.594,0.375c2.234,1.062,4.445,2.469,6.664,4.282c7.203,5.859,13.93,15.75,19.11,28.5 h-30.367V211.133z M257.469,255.352h34.234c3.875,12.843,6.258,27.703,6.727,43.586h-40.961V255.352z M235.164,215.79 c2.21-1.813,4.422-3.219,6.656-4.282c1.508-0.172,3.031-0.282,4.578-0.375v33.157h-30.305c1.242-3.024,2.508-5.938,3.898-8.618 C224.437,227.039,229.687,220.258,235.164,215.79z"></path> <path  d="M150.398,242.321c14.687,26.359,40.148,58.953,72.445,91.266c32.29,32.289,64.891,57.75,91.25,72.437 c7.718,4.298,14.906,7.665,21.546,10.024c6.641,2.343,12.688,3.71,18.383,3.734c2.859,0,5.656-0.367,8.336-1.258 c2.664-0.898,5.218-2.39,7.274-4.453c2.078-2.078,3.57-4.625,4.469-7.297c0.906-2.687,1.266-5.484,1.266-8.344 c-0.016-6.031-1.563-12.484-4.172-19.562c-2.242-6.046-5.352-12.578-9.164-19.515c-2.602,5.203-5.555,10.203-8.852,14.953 c1.664,3.453,3.07,6.695,4.172,9.68c2.266,6.054,3.274,11.078,3.258,14.445c0,1.594-0.218,2.797-0.5,3.61 c-0.273,0.813-0.562,1.234-0.906,1.586c-0.343,0.321-0.758,0.618-1.578,0.914c-0.805,0.266-2.008,0.477-3.602,0.477 c-3.18,0.015-7.844-0.883-13.454-2.883c-5.594-1.992-12.133-5.031-19.304-9.015c-24.57-13.657-56.508-38.469-87.993-69.977 c-31.484-31.477-56.32-63.414-69.976-87.992c-3.977-7.172-7.016-13.703-9.008-19.313c-2.008-5.594-2.898-10.25-2.883-13.438 c0-1.594,0.203-2.797,0.485-3.602c0.289-0.82,0.578-1.226,0.906-1.57c0.359-0.351,0.773-0.64,1.594-0.922 c0.805-0.266,2.008-0.492,3.602-0.492c3.367-0.023,8.39,0.992,14.438,3.242c3,1.109,6.258,2.515,9.726,4.195 c4.75-3.297,9.742-6.242,14.946-8.867c-6.954-3.813-13.508-6.938-19.563-9.172c-7.07-2.61-13.523-4.141-19.546-4.164 c-2.859,0.008-5.656,0.367-8.336,1.274c-2.68,0.89-5.234,2.39-7.289,4.469c-2.078,2.054-3.57,4.601-4.462,7.266 c-0.898,2.687-1.258,5.484-1.273,8.343c0.015,5.703,1.39,11.75,3.742,18.391C142.726,227.414,146.102,234.602,150.398,242.321z"></path> <path  d="M464,0H48C21.492,0,0,21.492,0,48v416c0,26.508,21.492,48,48,48h416c26.507,0,48-21.492,48-48V48 C512,21.492,490.507,0,464,0z M444.664,35c10.492,0,19,8.508,19,19s-8.508,19-19,19c-10.493,0-19-8.508-19-19 S434.171,35,444.664,35z M374.164,35c10.492,0,19,8.508,19,19s-8.508,19-19,19c-10.493,0-19-8.508-19-19S363.671,35,374.164,35z M303.664,35c10.492,0,19,8.508,19,19s-8.508,19-19,19c-10.493,0-19-8.508-19-19S293.171,35,303.664,35z M472,464 c0,4.406-3.586,8-8,8H48c-4.414,0-8-3.594-8-8V104h432V464z"></path> </g> </g></svg>,
  },
];

// Terminal commands - we still need these for the instructions display
const commands = [
  { command: 'help', description: 'Show available commands' },
  { command: 'contact', description: 'Start the contact form' },
  { command: 'about', description: 'Learn more about Orbit-Ops' },
  { command: 'services', description: 'View our services' },
  { command: 'clear', description: 'Clear the terminal' },
];

// Page component
const Contact: React.FC = () => {
  const seo = generateSEO(getPageSEO('contact'));
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <ContactPage>
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
          <HeroTitle>Get in <span>Touch</span></HeroTitle>
          <HeroDescription>
            Ready to launch your next project? Have questions about our services? Use our command-line terminal below to reach out, or explore alternative contact methods.
          </HeroDescription>
        </HeroContainer>
      </HeroSection>
      
      {/* Terminal Section */}
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
      
      {/* Other Contact Methods Section */}
      <ContactMethodsSection>
        <ContactMethodsContainer>
          <SectionHeading 
            title="Alternative Contact [Methods]"
            subtitle="Prefer a more traditional approach? Here are other ways to get in touch with us."
          />
          
          <ContactMethodsGrid>
            {contactMethods.map((method, index) => (
              <ContactMethodCard key={index}>
                <ContactMethodIcon>{method.icon}</ContactMethodIcon>
                <ContactMethodTitle>{method.title}</ContactMethodTitle>
                <ContactMethodDescription>{method.description}</ContactMethodDescription>
                <ContactMethodLink href={method.link} target="_blank" rel="noopener noreferrer">
                  {method.linkText}
                </ContactMethodLink>
              </ContactMethodCard>
            ))}
          </ContactMethodsGrid>
        </ContactMethodsContainer>
      </ContactMethodsSection>
    </ContactPage>
  );
};

export default Contact;