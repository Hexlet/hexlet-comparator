import * as fs from 'fs';

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = {
    development: 'http://localhost:3000',
    production: 'https://schools.hexlet.io',
  }[process.env.NODE_ENV];

  const staticPaths = fs
    .readdirSync('pages')
    .filter((staticPage) => ![
      'api',
      '_app.jsx',
      '_document.jsx',
      '404.jsx',
      '500.jsx',
      'sitemap.xml.jsx',
    ].includes(staticPage))
    .map((staticPagePath) => `${BASE_URL}/${staticPagePath.split('.')[0]}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPaths.map((url) => (
    `<url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
  )).join('')}
  </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
