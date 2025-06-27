import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'BookGroup - Your Personal Library',
    description: 'Organize your reading journey with BookGroup',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="xgflmm.">
            <body className="" data-oid="geldqjh">
                {children}
            </body>
        </html>
    );
}
