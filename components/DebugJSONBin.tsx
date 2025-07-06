'use client';
import { useState } from 'react';
import { JSONBinStorage } from '../lib/jsonbin-storage';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDebugTest = async () => {
        setIsLoading(true);
        try {
            // Environment check
            const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
            const binId = '6865e4868561e97a50308e97';

            // Test direct API call
            const headers = {
                'Content-Type': 'application/json',
                ...(apiKey && { 'X-Master-Key': apiKey }),
            };

            console.log('Making direct API call with headers:', headers);

            const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
                headers: headers,
            });

            const responseText = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch {
                responseData = responseText;
            }

            // Test through our storage class
            const storage = new JSONBinStorage();
            const storageResult = await storage.getBooks();

            setDebugInfo({
                environment: {
                    apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT_FOUND',
                    apiKeyLength: apiKey?.length || 0,
                    binId: binId,
                },
                directApiCall: {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    responseData: responseData,
                },
                storageClassResult: {
                    result: storageResult,
                    isArray: Array.isArray(storageResult),
                    length: storageResult?.length || 0,
                },
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            setDebugInfo({
                error: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString(),
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="-xifyz_">
            <h3 className="font-bold mb-2" data-oid="wqnzqdu">
                JSONBin API Debug
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="1haax6x"
            >
                {isLoading ? 'Testing API...' : 'Test JSONBin API'}
            </button>
            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="1nyjlhc"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
