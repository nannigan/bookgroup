'use client';
import { useState } from 'react';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDebugTest = async () => {
        setIsLoading(true);

        try {
            // Test 1: Check if API key works by getting account info
            const accountResponse = await fetch('https://api.jsonbin.io/v3/e/geolocation', {
                headers: {
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '',
                },
            });

            const accountResult = await accountResponse.text();

            // Test 2: List your bins to see what you actually own
            const binsResponse = await fetch('https://api.jsonbin.io/v3/c/bins', {
                headers: {
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '',
                },
            });

            const binsResult = await binsResponse.text();

            setDebugInfo({
                envApiKey: process.env.NEXT_PUBLIC_JSONBIN_API_KEY ? 'Present' : 'Missing',
                envApiKeyLength: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.length || 0,
                apiKeyFirst10: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.substring(0, 10) || '',
                accountTestStatus: accountResponse.status,
                accountTestResult: accountResult.substring(0, 200),
                binsListStatus: binsResponse.status,
                binsListResult: binsResult.substring(0, 500),
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="8orqt0c">
            <h3 className="font-bold mb-2" data-oid="84fdppe">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="l.-jmf2"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>

            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="0f8mk1."
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
