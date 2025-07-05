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
        <html lang="en" data-oid="-kie5h8">
            <body className="" data-oid="sh973.v">
                {children}
            </body>
        </html>
    );
}
