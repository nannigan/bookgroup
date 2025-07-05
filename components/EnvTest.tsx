'use client';

export function EnvTest() {
    return (
        <div data-oid="o.n.ytq">
            <p data-oid="9ump2_1">All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p data-oid="f:171cd">Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p data-oid="8f4e9:s">API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
