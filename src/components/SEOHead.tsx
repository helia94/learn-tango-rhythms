import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  noindex = false 
}) => {
  const { t, currentLanguage } = useTranslation();

  // Get default SEO content from translations if not provided
  const seoTitle = title || t('home.seo.title' as any);
  const seoDescription = description || t('home.seo.description' as any);
  const seoKeywords = keywords || t('home.seo.keywords' as any);

  React.useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoDescription);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoKeywords);
    }

    // Update lang attribute
    document.documentElement.lang = currentLanguage;

    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seoTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seoDescription);
    }

    // Update Twitter tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seoTitle);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seoDescription);
    }

    // Add canonical link if provided
    if (canonical) {
      let existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }
      
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonical;
      document.head.appendChild(canonicalLink);
    }

  }, [seoTitle, seoDescription, seoKeywords, currentLanguage, canonical, noindex]);

  return null; // This component doesn't render anything
};

export default SEOHead;