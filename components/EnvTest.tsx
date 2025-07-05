'use client';

export function EnvTest() {
    return (
        <div data-oid="7g.h3qb">
            <p data-oid="6m_z-dd">All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p data-oid="sqa68an">Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p data-oid="223jhzd">API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
