/** @type {import('next').NextConfig} */

const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer =
    require('next-bundle-analyzer')(/* options come there */);
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig
