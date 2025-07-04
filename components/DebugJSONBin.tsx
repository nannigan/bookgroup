'use client';
import { useState } from 'react';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDebugTest = async () => {
        setIsLoading(true);

        try {
            // Test basic fetch
            const response = await fetch(
                'https://api.jsonbin.io/v3/b/6865e4868561e97a50308e97/latest',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(process.env.NEXT_PUBLIC_JSONBIN_API_KEY && {
                            'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY,
                        }),
                    },
                },
            );

            const responseText = await response.text();

            setDebugInfo({
                envApiKey: process.env.NEXT_PUBLIC_JSONBIN_API_KEY ? 'Present' : 'Missing',
                envApiKeyLength: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.length || 0,
                responseStatus: response.status,
                responseHeaders: Object.fromEntries(response.headers.entries()),
                responseBody:
                    responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''),
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            setDebugInfo({
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="bxdfnh.">
            <h3 className="font-bold mb-2" data-oid=".0idtfq">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="2pj66oh"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>

            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid=".-tsawf"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
