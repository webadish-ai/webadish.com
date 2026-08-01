import type { Metadata } from 'next';
import BlogIndexClient from './BlogIndexClient';
import { blogSlugs } from './blogSlugs';

export const metadata: Metadata = {
  title: 'WordPress Security Guides & Recovery Advice | WebAdish',
  description:
    'Practical WordPress security, malware recovery, maintenance, WooCommerce, CERT-In, and DPDP guidance for business website owners and technical teams.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.webadish.com/blog',
    title: 'WordPress Security Guides & Recovery Advice | WebAdish',
    description:
      'Practical guidance for preventing WordPress incidents, recovering hacked sites, and choosing the right security and maintenance support.',
    siteName: 'WebAdish',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Security Guides & Recovery Advice | WebAdish',
    description:
      'Practical guidance for preventing WordPress incidents, recovering hacked sites, and choosing the right security and maintenance support.',
  },
};

const blogCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'WebAdish WordPress Security Guides',
  description:
    'WordPress security, hacked-site recovery, maintenance, WooCommerce, CERT-In, and DPDP guidance from WebAdish.',
  url: 'https://www.webadish.com/blog',
  isPartOf: {
    '@type': 'WebSite',
    name: 'WebAdish',
    url: 'https://www.webadish.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: blogSlugs.length,
    itemListElement: blogSlugs.map((slug, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.webadish.com/blog/${slug}`,
    })),
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <BlogIndexClient />
    </>
  );
}
