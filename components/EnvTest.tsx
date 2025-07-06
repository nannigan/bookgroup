'use client';

export function EnvTest() {
    return (
        <div data-oid="ae36q62">
            <p data-oid="vx07hqc">All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p data-oid="8zn8sjx">Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p data-oid="kdsfqvg">API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
