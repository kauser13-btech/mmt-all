/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "api.matchmytees.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react']
    }
};

export default nextConfig;
