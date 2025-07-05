'use client';

export function EnvTest() {
    return (
        <div data-oid="zh-hdon">
            <p data-oid="qxpzw39">All env vars: {JSON.stringify(Object.keys(process.env))}</p>
            <p data-oid="ziza71x">Test var: {process.env.NEXT_PUBLIC_TEST}</p>
            <p data-oid="l.xgp9g">API Key: {process.env.NEXT_PUBLIC_JSONBIN_API_KEY}</p>
        </div>
    );
}
