const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/ramyantara\.com\/products\/.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "product-pages",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
  // Add trailing slash to ensure proper routing
  trailingSlash: false,
  // Ensure proper asset prefix if needed
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
});
