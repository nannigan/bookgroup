import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: '/bookgroup',
    assetPrefix: '/bookgroup/',
    images: {
        unoptimized: true,
    },
};
export default nextConfig;
