import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import {
  buildBreadcrumbSchema,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl,
  getFullTitle,
  getSeoData,
} from '../../../../webadish/src/lib/seo';
import { blogSlugs } from '../blogSlugs';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = `/blog/${slug}`;
  const seo = getSeoData(path);
  const canonical = getCanonicalUrl(path);
  const image = seo.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: seo.type === 'article' ? 'article' : 'website',
      title: getFullTitle(path),
      description: seo.description,
      url: canonical,
      images: [{ url: image, alt: seo.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: getFullTitle(path),
      description: seo.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const seo = getSeoData(`/blog/${slug}`);
  const schema = [
    ...(seo.breadcrumbs ? [buildBreadcrumbSchema(seo.breadcrumbs)] : []),
    ...(seo.schema ?? []),
  ];

  return (
    <>
      {schema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <BlogPostClient />
    </>
  );
}
