/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    // Keep the pages in memory for longer during development
    maxInactiveAge: 60 * 60 * 1000,
    // Number of pages that should be kept simultaneously in memory
    pagesBufferLength: 5,
  }
}

module.exports = nextConfig
