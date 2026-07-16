import type { MetadataRoute } from 'next';
import { blogSlugs } from './blog/blogSlugs';

const baseUrl = 'https://www.webadish.com';
const lastModified = new Date('2026-06-22');

const routes = [
  { path: '/', priority: 1 },
  { path: '/security', priority: 0.95 },
  { path: '/hacked-site-recovery', priority: 0.95 },
  { path: '/maintenance', priority: 0.9 },
  { path: '/pricing', priority: 0.9 },
  { path: '/retainer', priority: 0.85 },
  { path: '/contact', priority: 0.85 },
  { path: '/case-studies', priority: 0.8 },
  { path: '/case-studies/verofax', priority: 0.75 },
  { path: '/case-studies/shivamautozone', priority: 0.7 },
  { path: '/case-studies/crystalgroup', priority: 0.7 },
  { path: '/security-score', priority: 0.75 },
  { path: '/india', priority: 0.7 },
  { path: '/india/dpdp-compliance-wordpress', priority: 0.75 },
  { path: '/india/cert-in-incident-readiness', priority: 0.75 },
  { path: '/blog', priority: 0.65 },
  { path: '/10-website-hacking-methods-that-put-your-site-at-risk-in-2025', priority: 0.6 },
  { path: '/agency-partners', priority: 0.6 },
  { path: '/web-design', priority: 0.5 },
  { path: '/privacy-policy', priority: 0.2 },
  { path: '/terms', priority: 0.2 },
  { path: '/refund-policy', priority: 0.2 },
];

const blogRoutes = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: 0.6,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...blogRoutes].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
  }));
}
