'use client'; import { useState } from 'react'; export function DebugJSONBin() { const [debugInfo, setDebugInfo] = useState<any>(null); const [isLoading, setIsLoading] = useState(false); const runDebugTest = async () => { setIsLoading(true); try { // Test 1: Try to create a simple bin to test API key validity const createResponse = await fetch('https://api.jsonbin.io/v3/b', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '', 'X-Bin-Name': 'BookGroup-Test-' + Date.now(), }, body: JSON.stringify({ books: [], test: true, created: new Date().toISOString(), }), }); const createResult = await createResponse.text(); let newBinId = null; if (createResponse.ok) { try { const createData = JSON.parse(createResult); newBinId = createData.metadata?.id; } catch (e) { // ignore parse error } } setDebugInfo({ envApiKey: process.env.NEXT_PUBLIC_JSONBIN_API_KEY ? 'Present' : 'Missing', envApiKeyLength: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.length || 0, apiKeyFirst10: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.substring(0, 10) || '', apiKeyStartsWithDollar: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.startsWith(' } catch (error: any) { setDebugInfo({ error: error.message, timestamp: new Date().toISOString(), }); } setIsLoading(false); }; return ( <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="z-df_o8"> <h3 className="font-bold mb-2" data-oid="y3b0noe"> JSONBin Debug Info </h3> <button onClick={runDebugTest} disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50" data-oid="3zag6t2" > {isLoading ? 'Testing...' : 'Run Debug Test'} </button> {debugInfo && ( <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-96" data-oid="8cxxfzk" > {JSON.stringify(debugInfo, null, 2)} </pre> )} </div> ); }) || false, rawEnvVar: process.env.NEXT_PUBLIC_JSONBIN_API_KEY || 'MISSING', createBinStatus: createResponse.status, createBinResult: createResult.substring(0, 500), newBinId: newBinId, message: createResponse.ok ? 'SUCCESS! Your API key works. Use the newBinId above in your code.' : 'API key test failed. Check your key format.', timestamp: new Date().toISOString(), }); } catch (error: any) { setDebugInfo({ error: error.message, timestamp: new Date().toISOString(), }); } setIsLoading(false); }; return ( <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="z-df_o8"> <h3 className="font-bold mb-2" data-oid="y3b0noe"> JSONBin Debug Info </h3> <button onClick={runDebugTest} disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50" data-oid="3zag6t2" > {isLoading ? 'Testing...' : 'Run Debug Test'} </button> {debugInfo && ( <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-96" data-oid="8cxxfzk" > {JSON.stringify(debugInfo, null, 2)} </pre> )} </div> ); }'use client';
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
                    'X-Bin-Name': 'BookGroup-Test-' + Date.now()
                },
                body: JSON.stringify({
                    books: [],
                    test: true,
                    created: new Date().toISOString()
                })
            });

            const createResult = await createResponse.text();
            let newBinId = null;

            if (createResponse.ok) {
                try {
                    const createData = JSON.parse(createResult);
                    newBinId = createData.metadata?.id;
                } catch (e) {
                    // ignore parse error
                }
            }

            setDebugInfo({
                envApiKey: process.env.NEXT_PUBLIC_JSONBIN_API_KEY ? 'Present' : 'Missing',
                envApiKeyLength: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.length || 0,
                apiKeyFirst10: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.substring(0, 10) || '',
                apiKeyStartsWithDollar: process.env.NEXT_PUBLIC_JSONBIN_API_KEY?.startsWith('$') || false,
                createBinStatus: createResponse.status,
                createBinResult: createResult.substring(0, 500),
                newBinId: newBinId,
                message: createResponse.ok ? 
                    'SUCCESS! Your API key works. Use the newBinId above in your code.' : 
                    'API key test failed. Check your key format.',
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-2">JSONBin Debug Info</h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>

            {debugInfo && (
                <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-96">
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}