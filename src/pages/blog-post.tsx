import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeInUp } from '../styles/animation';
import { generateSEO } from '../utils/seo';
import Button from '../components/common/button';
// Styled components
const BlogPostPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const BlogPostContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.container.xl};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space[16]} ${theme.space[4]}`};
`;

const BlogPostLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[8]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 3fr 1fr;
  }
`;

const BlogPostContent = styled.article`
  animation: ${fadeInUp} 0.5s ease-out;
`;

const BlogPostSidebar = styled.aside`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: -1;
  }
`;

const BlogPostHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const PostCategory = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(110, 68, 255, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const PostTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  margin-bottom: ${({ theme }) => theme.space[4]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const PostImage = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: ${({ theme }) => theme.space[8]};
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const PostContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  
  p {
    margin-bottom: ${({ theme }) => theme.space[6]};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-top: ${({ theme }) => theme.space[8]};
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-top: ${({ theme }) => theme.space[6]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.space[6]};
    padding-left: ${({ theme }) => theme.space[6]};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.space[4]};
    font-style: italic;
    margin: ${({ theme }) => `${theme.space[6]} 0`};
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  pre {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: ${({ theme }) => theme.space[4]};
    border-radius: ${({ theme }) => theme.radii.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.space[6]};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.md};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
    border-radius: ${({ theme }) => theme.radii.sm};
  }
  
  img {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.radii.md};
    margin: ${({ theme }) => `${theme.space[6]} 0`};
  }
`;

const PostFooter = styled.footer`
  margin-top: ${({ theme }) => theme.space[8]};
  padding-top: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TagsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const TagsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

const TagLink = styled(Link)`
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ShareSection = styled.div``;

const ShareTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const ShareLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
`;

const ShareLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-3px);
  }
`;

const PostNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[8]};
`;

const PrevPostLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    transform: translateX(-5px);
  }
`;

const NextPostLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: right;
  text-decoration: none;
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    transform: translateX(5px);
  }
`;

const PostNavigationLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const PostNavigationTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
`;

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

const RelatedPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const RelatedPostItem = styled(Link)`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const RelatedPostImage = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const RelatedPostContent = styled.div`
  flex-grow: 1;
`;

const RelatedPostTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  
  ${RelatedPostItem}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RelatedPostDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const BackToButton = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

// Icon placeholders
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
    slug: 'future-of-web-design-trends-2025',
    category: 'Web Design',
    author: 'Alex Morgan',
    date: 'March 1, 2025',
    readTime: '5 min read',
    tags: ['Web Design', 'UX/UI', 'Trends', 'Technology'],
    image: '/img/blog/web-design-trends.jpg',
    content: `
      <p>As we approach 2025, the web design landscape continues to evolve rapidly, driven by technological advancements and changing user expectations. Staying ahead of these trends is crucial for designers and businesses alike who want to create engaging, future-proof digital experiences.</p>
      
      <p>In this comprehensive guide, we'll explore the most significant web design trends that are set to dominate in 2025, from immersive experiences to minimalist interfaces.</p>
      
      <h2>1. Immersive 3D Experiences</h2>
      
      <p>Three-dimensional design elements are becoming increasingly popular as browsers and devices become more capable of handling complex animations and renderings. In 2025, we expect to see:</p>
      
      <ul>
        <li>More websites incorporating 3D product viewers</li>
        <li>Interactive 3D elements that respond to user scrolling and mouse movements</li>
        <li>3D illustrations replacing flat design in key visual areas</li>
      </ul>
      
      <p>The key to effective 3D implementation will be performance optimization to ensure these rich experiences don't negatively impact page load times or device battery life.</p>
      
      <h2>2. AI-Driven Personalization</h2>
      
      <p>Artificial intelligence is revolutionizing how websites adapt to individual users:</p>
      
      <ul>
        <li>Dynamic content that changes based on user behavior and preferences</li>
        <li>Personalized navigation paths that highlight relevant information</li>
        <li>AI-recommended products and content tailored to each visitor</li>
      </ul>
      
      <h2>3. Minimalist Interfaces With Maximalist Details</h2>
      
      <p>The pendulum is swinging toward a fascinating hybrid approach: structurally minimalist layouts that incorporate rich, detailed elements in specific areas. This balance provides clean usability while maintaining visual interest.</p>
    `,
    nextPost: {
      id: 2,
      title: 'How Automation Can Transform Your Business Operations',
      slug: 'automation-transform-business-operations',
    },
    prevPost: null,
    relatedPosts: [
      {
        id: 4,
        title: 'The Impact of AI on Modern Web Development',
        slug: 'ai-impact-modern-web-development',
        date: 'February 10, 2025',
        image: '/img/blog/ai-web-development.jpg',
      },
      {
        id: 5,
        title: 'Optimizing Website Performance for Better Conversion Rates',
        slug: 'website-performance-conversion-rates',
        date: 'February 5, 2025',
        image: '/img/blog/website-performance.jpg',
      },
    ]
  },
  {
    id: 2,
    title: 'How Automation Can Transform Your Business Operations',
    slug: 'automation-transform-business-operations',
    category: 'Automation',
    author: 'Taylor Reed',
    date: 'February 25, 2025',
    readTime: '7 min read',
    tags: ['Automation', 'Business', 'Productivity', 'Technology'],
    image: '/img/blog/automation-business.jpg',
    content: `
      <p>In today's fast-paced business environment, automation has emerged as a game-changing strategy for organizations looking to optimize operations, reduce costs, and free up human resources for higher-value work.</p>
      
      <p>This article explores how implementing automation solutions can transform various aspects of your business operations and deliver significant competitive advantages.</p>
      
      <h2>1. Streamlining Repetitive Tasks</h2>
      
      <p>One of the most immediate benefits of automation is eliminating the need for manual handling of repetitive, time-consuming tasks:</p>
      
      <ul>
        <li>Data entry and processing</li>
        <li>Document creation and management</li>
        <li>Invoice processing and payment reconciliation</li>
        <li>Inventory management and reordering</li>
      </ul>
      
      <p>By automating these routine processes, your team can redirect their focus toward strategic initiatives that drive business growth.</p>
      
      <h2>2. Enhanced Accuracy and Error Reduction</h2>
      
      <p>Human error is inevitable, especially in tasks requiring data handling or repetitive operations. Automation dramatically reduces these errors by:</p>
      
      <ul>
        <li>Following precisely defined workflows without deviation</li>
        <li>Applying consistent rules and validation criteria</li>
        <li>Eliminating fatigue-related mistakes</li>
      </ul>
    `,
    nextPost: {
      id: 3,
      title: 'Creating a Cohesive Brand Identity: From Logo to Website',
      slug: 'cohesive-brand-identity-logo-website',
    },
    prevPost: {
      id: 1,
      title: 'The Future of Web Design: Trends to Watch in 2025',
      slug: 'future-of-web-design-trends-2025',
    },
    relatedPosts: [
      {
        id: 5,
        title: 'Optimizing Website Performance for Better Conversion Rates',
        slug: 'website-performance-conversion-rates',
        date: 'February 5, 2025',
        image: '/img/blog/website-performance.jpg',
      },
      {
        id: 6,
        title: 'Essential Design Principles for Effective Data Visualization',
        slug: 'design-principles-data-visualization',
        date: 'January 28, 2025',
        image: '/img/blog/data-visualization.jpg',
      },
    ]
  }
];

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the current post by slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // Redirect to blog page if post not found
  useEffect(() => {
    if (!post && slug) {
      navigate('/blog');
    }
  }, [post, slug, navigate]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // If post not found and still loading, show nothing
  if (!post) {
    return null;
  }
  
  // Generate SEO data
  const seo = generateSEO({
    title: `${post.title} | Orbit-Ops Blog`,
    description: post.content.substring(0, 250).replace(/<[^>]*>/g, '') + '...',
    keywords: post.tags,
    ogImage: post.image,
  });
  
  return (
    <BlogPostPage>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords.join(', ')} />}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`${seo.canonicalUrl}/blog/${post.slug}`} />
      </Helmet>
      
      <BlogPostContainer>
        <BackToButton>
          <Button variant="ghost" to="/blog">
            <IconPlaceholder /> Back to Blog
          </Button>
        </BackToButton>
        
        <BlogPostLayout>
          <BlogPostContent>
            <BlogPostHeader>
              <PostCategory>{post.category}</PostCategory>
              <PostTitle>{post.title}</PostTitle>
              
              <PostMeta>
                <MetaItem>
                  <IconPlaceholder />
                  By {post.author}
                </MetaItem>
                <MetaItem>
                  <IconPlaceholder />
                  {post.date}
                </MetaItem>
                <MetaItem>
                  <IconPlaceholder />
                  {post.readTime}
                </MetaItem>
              </PostMeta>
              
              <PostImage />
            </BlogPostHeader>
            
            <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <PostFooter>
              <TagsSection>
                <TagsTitle>Tags</TagsTitle>
                <TagsList>
                  {post.tags.map((tag, index) => (
                    <TagLink key={index} to={`/blog?tag=${tag}`}>
                      {tag}
                    </TagLink>
                  ))}
                </TagsList>
              </TagsSection>
              
              <ShareSection>
                <ShareTitle>Share This Article</ShareTitle>
                <ShareLinks>
                  <ShareLink href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                    <IconPlaceholder />
                  </ShareLink>
                  <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                    <IconPlaceholder />
                  </ShareLink>
                  <ShareLink href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                    <IconPlaceholder />
                  </ShareLink>
                </ShareLinks>
              </ShareSection>
              
              <PostNavigation>
                {post.prevPost && (
                  <PrevPostLink to={`/blog/${post.prevPost.slug}`}>
                    <PostNavigationLabel>Previous Article</PostNavigationLabel>
                    <PostNavigationTitle>{post.prevPost.title}</PostNavigationTitle>
                  </PrevPostLink>
                )}
                
                {post.nextPost && (
                  <NextPostLink to={`/blog/${post.nextPost.slug}`}>
                    <PostNavigationLabel>Next Article</PostNavigationLabel>
                    <PostNavigationTitle>{post.nextPost.title}</PostNavigationTitle>
                  </NextPostLink>
                )}
              </PostNavigation>
            </PostFooter>
          </BlogPostContent>
          
          <BlogPostSidebar>
            <SidebarSection>
              <SidebarTitle>Related Articles</SidebarTitle>
              <RelatedPostsList>
                {post.relatedPosts.map((relatedPost) => (
                  <RelatedPostItem key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <RelatedPostImage />
                    <RelatedPostContent>
                      <RelatedPostTitle>{relatedPost.title}</RelatedPostTitle>
                      <RelatedPostDate>{relatedPost.date}</RelatedPostDate>
                    </RelatedPostContent>
                  </RelatedPostItem>
                ))}
              </RelatedPostsList>
            </SidebarSection>
          </BlogPostSidebar>
        </BlogPostLayout>
      </BlogPostContainer>
    </BlogPostPage>
  );
};

export default BlogPost;