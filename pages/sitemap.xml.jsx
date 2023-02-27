import fsp from 'fs/promises';
import { getProfessions, getSchools } from '../lib/api.js';

const Sitemap = () => null;

const getAllSchools = async () => {
  const schools = await getSchools();

  return schools;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = {
    development: 'http://localhost:3000',
    production: 'https://schools.hexlet.io',
  }[process.env.NODE_ENV];

  let staticPaths = await fsp.readdir('pages');
  staticPaths = staticPaths.filter((staticPage) => ![
    'api',
    '_app.jsx',
    '_document.jsx',
    '404.jsx',
    '500.jsx',
    'sitemap.xml.jsx',
  ].includes(staticPage))
    .map((staticPagePath) => `${BASE_URL}/${staticPagePath.split('.')[0]}`);

  const schools = await getAllSchools();
  const professions = await getProfessions();
  const pathsToAllSchools = schools.map((school) => `${BASE_URL}/schools/${school.id}`);
  const pathsToAllProfessions = professions.map((profession) => `${BASE_URL}/professions/${profession.id}`);
  const allPaths = [...staticPaths, ...pathsToAllSchools, ...pathsToAllProfessions];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths.map((url) => (
    `<url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
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
