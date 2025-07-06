'use client';

export function EnvTest() {
    return (
        <div>
            <p>All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p>Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p>API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
