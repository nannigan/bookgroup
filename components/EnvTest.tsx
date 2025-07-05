'use client';

export function EnvTest() {
    return (
        <div data-oid="js57pjx">
            <p data-oid="1sqdwpl">All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p data-oid="1.edqwf">Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p data-oid="c-i0zei">API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
