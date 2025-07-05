'use client';
import { useState } from 'react';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDebugTest = async () => {
        setIsLoading(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
            setDebugInfo({
                envApiKey: apiKey ? 'Present' : 'Missing',
                envApiKeyLength: apiKey?.length || 0,
                apiKeyFirst20: apiKey?.substring(0, 20) || '',
                startsWithDollar: apiKey?.startsWith('$') || false,
                startsWithExpected: apiKey?.startsWith('$2a$10$ZE') || false,
                fullApiKey: apiKey,
                allEnvVars: Object.keys(process.env).filter(
                    (key) => key.includes('JSONBIN') || key.includes('API') || key.includes('KEY'),
                ),
                allNextPublicVars: Object.keys(process.env).filter((key) =>
                    key.startsWith('NEXT_PUBLIC_'),
                ),
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            setDebugInfo({ error: error.message, timestamp: new Date().toISOString() });
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="c90__nw">
            <h3 className="font-bold mb-2" data-oid="apj74h7">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="bfwwyme"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>
            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="tuhe6gd"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
