'use client';

export function EnvTest() {
    return (
        <div data-oid="md3ylw4">
            <p data-oid="s8z05nf">All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p data-oid=":18w9:x">Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p data-oid="afpfvw7">API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
