/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ force mode serveur, bloque next export

  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
