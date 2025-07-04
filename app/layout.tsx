import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'ResistorSistersBookgroup',
    description: 'Organize your reading journey with BookGroup',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="rer4w1v">
            <body className="" data-oid="8uns2oh">
                {children}
            </body>
        </html>
    );
}
