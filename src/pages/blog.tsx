import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '../styles/animation';
import { generateSEO, getPageSEO } from '../utils/seo';


// Styled components
const BlogPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.space[20]} 0 ${({ theme }) => theme.space[12]};
  background-color: ${({ theme }) => theme.colors.background};
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

// Blog content section
const BlogContentSection = styled.section`
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

const BlogContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  position: relative;
  z-index: 1;
`;

const BlogLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[8]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 3fr 1fr;
  }
`;

const BlogMain = styled.div``;

const BlogSidebar = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: -1;
  }
`;

// Blog filter controls
const FilterControls = styled.div`
  margin-bottom: ${({ theme }) => theme.space[8]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 300px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[5]}`};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.space[3]};
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.background
  };
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text : theme.colors.textMuted
  };
  border: 1px solid ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.border
  };
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme, $active }) => 
      $active ? theme.colors.primary : theme.colors.backgroundLight
    };
  }
`;

// Blog grid
const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[6]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BlogCard = styled.article<{ $visible: boolean; $delay: number }>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: ${({ theme }) => theme.transitions.default};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '30px')});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: ${({ $delay }) => $delay}s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const BlogCardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  overflow: hidden;
`;

const BlogCardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: ${({ theme }) => theme.transitions.default};
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogCardContent = styled.div`
  padding: ${({ theme }) => theme.space[6]};
`;

const BlogCardCategory = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(110, 68, 255, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const BlogCardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const BlogCardExcerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const BlogCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[10]};
`;

const PaginationButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.background
  };
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text : theme.colors.textMuted
  };
  border: 1px solid ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.border
  };
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: ${({ theme }) => theme.transitions.default};
  margin: 0 ${({ theme }) => theme.space[1]};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme, $active }) => 
      $active ? theme.colors.primary : theme.colors.backgroundLight
    };
  }
`;

// Sidebar components
const SidebarSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[8]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SidebarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[4]};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.space[2]} 0;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryCount = styled.span`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PopularPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const PopularPostItem = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
`;

const PopularPostImageContainer = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  overflow: hidden;
`;

const PopularPostImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: ${({ theme }) => theme.transitions.default};
  
  ${PopularPostItem}:hover & {
    transform: scale(1.05);
  }
`;

const PopularPostContent = styled.div`
  flex-grow: 1;
`;

const PopularPostTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space[2]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PopularPostMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

const TagLink = styled.button`
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Icon placeholder
const IconPlaceholder = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect width="16" height="16" />
  </svg>
);

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Design: Trends to Watch in 2025',
    excerpt: 'Explore the emerging web design trends that will dominate the digital landscape in the coming year, from immersive experiences to minimalist interfaces.',
    category: 'Web Design',
    date: 'March 1, 2025',
    readTime: '5 min read',
    slug: 'future-of-web-design-trends-2025',
    image: '/img/blog/web-design-trends.jpg',
  },
  {
    id: 2,
    title: 'How Automation Can Transform Your Business Operations',
    excerpt: 'Discover how implementing automation solutions can streamline workflows, reduce errors, and significantly boost productivity in various business sectors.',
    category: 'Automation',
    date: 'February 25, 2025',
    readTime: '7 min read',
    slug: 'automation-transform-business-operations',
    image: '/img/blog/automation-business.jpg',
  },
  {
    id: 3,
    title: 'Creating a Cohesive Brand Identity: From Logo to Website',
    excerpt: 'Learn the essential steps to developing a consistent brand identity that resonates with your audience across all digital and physical touchpoints.',
    category: 'Graphic Design',
    date: 'February 18, 2025',
    readTime: '6 min read',
    slug: 'cohesive-brand-identity-logo-website',
    image: '/img/blog/brand-identity.jpg',
  },
  {
    id: 4,
    title: 'The Impact of AI on Modern Web Development',
    excerpt: 'Explore how artificial intelligence is revolutionizing the web development landscape, from code generation to personalized user experiences.',
    category: 'Web Design',
    date: 'February 10, 2025',
    readTime: '8 min read',
    slug: 'ai-impact-modern-web-development',
    image: '/img/blog/ai-web-development.jpg',
  },
  {
    id: 5,
    title: 'Optimizing Website Performance for Better Conversion Rates',
    excerpt: 'Discover proven strategies to enhance your websites speed and performance, directly impacting user experience and conversion metrics.',
    category: 'Web Design',
    date: 'February 5, 2025',
    readTime: '5 min read',
    slug: 'website-performance-conversion-rates',
    image: '/img/blog/website-performance.jpg',
  },
  {
    id: 6,
    title: 'Essential Design Principles for Effective Data Visualization',
    excerpt: 'Master the fundamentals of creating clear, compelling data visualizations that communicate complex information in an accessible way.',
    category: 'Graphic Design',
    date: 'January 28, 2025',
    readTime: '6 min read',
    slug: 'design-principles-data-visualization',
    image: '/img/blog/data-visualization.jpg',
  },
];

// Categories data with post counts
const categories = [
  { name: 'Web Design', count: 3 },
  { name: 'Graphic Design', count: 2 },
  { name: 'Automation', count: 1 },
  { name: 'Customer Support', count: 0 },
  { name: 'Technology', count: 0 },
];

// Popular posts data (subset of all posts)
const popularPosts = [
  {
    id: 1,
    title: 'The Future of Web Design: Trends to Watch in 2025',
    date: 'March 1, 2025',
    slug: 'future-of-web-design-trends-2025',
    image: '/img/blog/web-design-trends.jpg',
  },
  {
    id: 2,
    title: 'How Automation Can Transform Your Business Operations',
    date: 'February 25, 2025',
    slug: 'automation-transform-business-operations',
    image: '/img/blog/automation-business.jpg',
  },
  {
    id: 3,
    title: 'Creating a Cohesive Brand Identity: From Logo to Website',
    date: 'February 18, 2025',
    slug: 'cohesive-brand-identity-logo-website',
    image: '/img/blog/brand-identity.jpg',
  },
];

// Tags data
const tags = [
  'Web Design',
  'UX/UI',
  'Graphic Design',
  'Automation',
  'Technology',
  'Business',
  'Development',
  'Branding',
  'Performance',
  'SEO',
];


const Blog: React.FC = () => {
    const seo = generateSEO(getPageSEO('blog'));
    
    // State for filtering and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    
    // Blog grid ref for animation
    const [blogGridRef, blogGridInView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });
    
    // Filter posts based on search term and category
    const filteredPosts = blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    // Handle category selection
    const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      setCurrentPage(1); // Reset to first page when changing category
    };
    
    // Handle search term change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page when searching
    };
    
    // Scroll to top on page load
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    return (
      <BlogPage>
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
            <HeroTitle>Our <span>Blog</span></HeroTitle>
            <HeroDescription>
              Stay updated with the latest industry insights, technology trends, and company news. Our blog features expert advice, tutorials, and thought leadership content.
            </HeroDescription>
          </HeroContainer>
        </HeroSection>
        
        {/* Blog Content Section */}
        <BlogContentSection>
          <BlogContainer>
            <BlogLayout>
              <BlogMain>
                <FilterControls>
                  <SearchContainer>
                    <SearchInput 
                      type="text" 
                      placeholder="Search articles..." 
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <SearchIcon>
                      <IconPlaceholder />
                    </SearchIcon>
                  </SearchContainer>
                  
                  <CategoryFilter>
                    <CategoryButton 
                      $active={selectedCategory === 'All'}
                      onClick={() => handleCategorySelect('All')}
                    >
                      All
                    </CategoryButton>
                    
                    {categories.map((category) => (
                      <CategoryButton 
                        key={category.name}
                        $active={selectedCategory === category.name}
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {category.name}
                      </CategoryButton>
                    ))}
                  </CategoryFilter>
                </FilterControls>
                
                <BlogGrid ref={blogGridRef}>
                  {currentPosts.map((post, index) => (
                    <BlogCard 
                      key={post.id} 
                      $visible={blogGridInView} 
                      $delay={0.1 * index}
                    >
                      <BlogCardImageContainer>
                        <BlogCardImage style={{ backgroundColor: '#333' }} /> {/* Placeholder for actual image */}
                      </BlogCardImageContainer>
                      
                      <BlogCardContent>
                        <BlogCardCategory>{post.category}</BlogCardCategory>
                        <BlogCardTitle>
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </BlogCardTitle>
                        <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
                        
                        <BlogCardMeta>
                          <MetaItem>
                            <IconPlaceholder />
                            {post.date}
                          </MetaItem>
                          <MetaItem>
                            <IconPlaceholder />
                            {post.readTime}
                          </MetaItem>
                        </BlogCardMeta>
                      </BlogCardContent>
                    </BlogCard>
                  ))}
                </BlogGrid>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PaginationButton 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      $disabled={currentPage === 1}
                      disabled={currentPage === 1}
                    >
                      <IconPlaceholder />
                    </PaginationButton>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationButton
                        key={index}
                        $active={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationButton>
                    ))}
                    
                    <PaginationButton
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      $disabled={currentPage === totalPages}
                      disabled={currentPage === totalPages}
                    >
                      <IconPlaceholder />
                    </PaginationButton>
                  </PaginationContainer>
                )}
              </BlogMain>
              
              <BlogSidebar>
                {/* Categories Section */}
                <SidebarSection>
                  <SidebarTitle>Categories</SidebarTitle>
                  <CategoryList>
                    {categories.map((category) => (
                      <CategoryItem key={category.name}>
                        <CategoryLink onClick={() => handleCategorySelect(category.name)}>
                          {category.name}
                          <CategoryCount>{category.count}</CategoryCount>
                        </CategoryLink>
                      </CategoryItem>
                    ))}
                  </CategoryList>
                </SidebarSection>
                
                {/* Popular Posts Section */}
                <SidebarSection>
                  <SidebarTitle>Popular Posts</SidebarTitle>
                  <PopularPostList>
                    {popularPosts.map((post) => (
                      <PopularPostItem key={post.id}>
                        <PopularPostImageContainer>
                          <PopularPostImage style={{ backgroundColor: '#333' }} /> {/* Placeholder for actual image */}
                        </PopularPostImageContainer>
                        
                        <PopularPostContent>
                          <PopularPostTitle>
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </PopularPostTitle>
                          <PopularPostMeta>{post.date}</PopularPostMeta>
                        </PopularPostContent>
                      </PopularPostItem>
                    ))}
                  </PopularPostList>
                </SidebarSection>
                
                {/* Tags Section */}
                <SidebarSection>
                  <SidebarTitle>Tags</SidebarTitle>
                  <TagsContainer>
                    {tags.map((tag) => (
                      <TagLink key={tag} onClick={() => handleCategorySelect(tag)}>
                        {tag}
                      </TagLink>
                    ))}
                  </TagsContainer>
                </SidebarSection>
              </BlogSidebar>
            </BlogLayout>
          </BlogContainer>
        </BlogContentSection>
      </BlogPage>
    );
  };
  
  export default Blog;