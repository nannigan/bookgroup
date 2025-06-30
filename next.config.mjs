import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: isProd ? '/bookgroup' : '',
    assetPrefix: isProd ? '/bookgroup/' : '',
    images: {
        unoptimized: true,
    },
};
export default nextConfig;
