'use client';
import { useState } from 'react';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDebugTest = async () => {
        setIsLoading(true);

        try {
            const createResponse = await fetch('https://api.jsonbin.io/v3/b', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '',
                    'X-Bin-Name': 'BookGroup-Test-' + Date.now(),
                },
                body: JSON.stringify({
                    books: [],
                    test: true,
                    created: new Date().toISOString(),
                }),
            });

            const createResult = await createResponse.text();

            setDebugInfo({
                envApiKey: process.env.NEXT_PUBLIC_JSONBIN_API_KEY ? 'Present' : 'Missing',
                envApiKeyLength: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.length || 0,
                apiKeyFirst10: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.substring(0, 10) || '',
                apiKeyFirst20: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.substring(0, 20) || '',
                startsWithDollar: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.startsWith('
        } catch (error: any) {
            setDebugInfo({
                error: error.message,
                timestamp: new Date().toISOString(),
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="jupy2-b">
            <h3 className="font-bold mb-2" data-oid="gqitrl:">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid=".kvkx8r"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>

            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="yoflanc"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
) || false,
                startsWithExpected: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.startsWith('$2a$10$ZE.') || false,
                charCodes: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.substring(0, 10).split('').map(c => c.charCodeAt(0)) || [],
                createBinStatus: createResponse.status,
                createBinResult: createResult,
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="jupy2-b">
            <h3 className="font-bold mb-2" data-oid="gqitrl:">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid=".kvkx8r"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>

            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="yoflanc"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
