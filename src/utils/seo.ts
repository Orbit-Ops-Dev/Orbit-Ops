interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    author?: string;
    ogImage?: string;
    twitterHandle?: string;
    canonicalUrl?: string;
  }
  
  /**
   * Default SEO configuration for the website
   */
  export const defaultSEO: SEOProps = {
    title: 'Orbit-Ops | Web Design, Graphic Design & Automation Solutions',
    description: 'Orbit-Ops offers professional web design, graphic design, automation and customer support services. Let us elevate your digital presence with our space-themed expertise.',
    keywords: [
      'web design',
      'graphic design',
      'automation',
      'customer support',
      'tech company',
      'space-themed website',
      'cyberspace design',
      'professional web development',
      'digital solutions',
      'Orbit-Ops'
    ],
    author: 'Orbit-Ops',
    ogImage: '/images/orbit-ops-og.jpg',
    twitterHandle: '@OrbitOps',
    canonicalUrl: 'https://orbit-ops.com',
  };
  
  /**
   * Generate meta tags for SEO
   * @param customSEO Custom SEO properties to merge with defaults
   * @returns Meta tags string for use with React Helmet
   */
  export const generateSEO = (customSEO?: Partial<SEOProps>): SEOProps => {
    const seo = { ...defaultSEO, ...customSEO };
    
    return seo;
  };
  
  /**
   * Generate structured data for better SEO
   * @returns JSON-LD structured data
   */
  export const generateStructuredData = () => {
    // Organization structured data
    const organizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Orbit-Ops',
      url: defaultSEO.canonicalUrl,
      logo: `${defaultSEO.canonicalUrl}/images/orbit-ops-logo.png`,
      sameAs: [
        'https://twitter.com/OrbitOps',
        'https://facebook.com/OrbitOps',
        'https://linkedin.com/company/OrbitOps',
        'https://instagram.com/OrbitOps'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-123-456-7890',
        contactType: 'customer service',
        email: 'contact@orbit-ops.com'
      }
    };
    
    // Website structured data
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: defaultSEO.canonicalUrl,
      name: 'Orbit-Ops',
      description: defaultSEO.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${defaultSEO.canonicalUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
    
    return {
      organization: JSON.stringify(organizationData),
      website: JSON.stringify(websiteData)
    };
  };
  
  /**
   * Generate a sitemap entry
   * @param url The URL path without the domain (e.g., '/about')
   * @param priority The priority of this URL relative to other URLs on your site (0.0 to 1.0)
   * @param changefreq How frequently the page is likely to change
   * @returns Sitemap entry object
   */
  export const generateSitemapEntry = (
    url: string,
    priority: number = 0.5,
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly'
  ) => {
    return {
      url: `${defaultSEO.canonicalUrl}${url}`,
      priority,
      changefreq,
      lastmod: new Date().toISOString().split('T')[0]
    };
  };
  
  /**
   * Generate canonical URLs for the application
   * @param path Current page path
   * @returns Canonical URL for the current page
   */
  export const getCanonicalUrl = (path: string): string => {
    return `${defaultSEO.canonicalUrl}${path}`;
  };
  
  /**
   * Get page-specific SEO configurations
   * @param page The page identifier
   * @returns SEO configuration for the specified page
   */
  export const getPageSEO = (page: string): Partial<SEOProps> => {
    switch (page) {
      case 'home':
        return {
          title: 'Orbit-Ops | Elevate Your Digital Presence',
          description: 'Orbit-Ops offers futuristic web design, graphic design, and automation services with a space-themed approach.',
        };
      case 'about':
        return {
          title: 'About Orbit-Ops | Our Mission & Team',
          description: 'Learn about Orbit-Ops and our passionate team dedicated to creating beautiful digital experiences with space-inspired designs.',
        };
      case 'services':
        return {
          title: 'Services | Web Design, Graphic Design & Automation | Orbit-Ops',
          description: 'Discover our comprehensive range of services including web design, graphic design, automation solutions, and customer support.',
        };
      case 'contact':
        return {
          title: 'Contact Orbit-Ops | Get In Touch',
          description: 'Reach out to our team at Orbit-Ops for inquiries, quotes, or to discuss your next project with us.',
        };
      case 'blog':
        return {
          title: 'Blog | Tech Insights & Design Trends | Orbit-Ops',
          description: 'Stay updated with the latest technology insights, design trends, and industry news on the Orbit-Ops blog.',
        };
      default:
        return defaultSEO;
    }
  };