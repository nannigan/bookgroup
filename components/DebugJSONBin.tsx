'use client';
import { useState } from 'react';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const runDebugTest = async () => {
        setIsLoading(true);
        try {
            // Let's trace exactly what's happening
            const directAccess = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
            const processEnvKeys = Object.keys(process.env);
            const hasProperty = process.env.hasOwnProperty('NEXT_PUBLIC_JSONBIN_API_KEY');
            const viaIndex = process.env['NEXT_PUBLIC_JSONBIN_API_KEY'];

            setDebugInfo({
                directAccess: directAccess,
                viaIndex: viaIndex,
                hasProperty: hasProperty,
                processEnvType: typeof process.env,
                processEnvKeys: processEnvKeys,
                processEnvLength: processEnvKeys.length,
                firstFewKeys: processEnvKeys.slice(0, 5),
                nodeEnv: process.env.NODE_ENV,
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            setDebugInfo({ error: error.message, timestamp: new Date().toISOString() });
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="-xifyz_">
            <h3 className="font-bold mb-2" data-oid="wqnzqdu">
                Environment Debug
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="1haax6x"
            >
                {isLoading ? 'Testing...' : 'Debug Environment'}
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
