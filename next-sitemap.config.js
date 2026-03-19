/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mubashir.dev',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
};
