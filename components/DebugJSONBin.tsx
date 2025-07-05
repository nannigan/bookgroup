'use client';
import { useState } from 'react';

export function DebugJSONBin() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // === DEBUG FUNCTION START ===
    const runDebugTest = async () => {
        setIsLoading(true);
        try {
            // === ENV VAR DETECTION START ===
            const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
            const allEnvVars = Object.keys(process.env).filter(
                (key) => key.includes('JSONBIN') || key.includes('API'),
            );
            // === ENV VAR DETECTION END ===

            // === DEBUG INFO OBJECT START ===
            setDebugInfo({
                envApiKey: apiKey ? 'Present' : 'Missing',
                envApiKeyLength: apiKey?.length || 0,
                apiKeyFirst20: apiKey?.substring(0, 20) || '',
                startsWithDollar: apiKey?.startsWith('

    // === JSX RETURN START ===
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="l63n9.q">
            <h3 className="font-bold mb-2" data-oid="j88c87s">
                JSONBin Debug Info
            </h3>
            {/* === BUTTON SECTION START === */}
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="73m65bz"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>
            {/* === BUTTON SECTION END === */}
            {/* === DEBUG OUTPUT START === */}
            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="mbq0asg"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
            {/* === DEBUG OUTPUT END === */}
        </div>
    );
    // === JSX RETURN END ===
}
) || false,
                startsWithExpected: apiKey?.startsWith('$2a$10$ZE') || false,
                allRelevantEnvVars: allEnvVars,
                allNextPublicVars: Object.keys(process.env).filter((key) =>
                    key.startsWith('NEXT_PUBLIC_'),
                ),
                timestamp: new Date().toISOString(),
            });
            // === DEBUG INFO OBJECT END ===
        } catch (error: any) {
            setDebugInfo({ error: error.message, timestamp: new Date().toISOString() });
        }
        setIsLoading(false);
    };
    // === DEBUG FUNCTION END ===

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="l63n9.q">
            <h3 className="font-bold mb-2" data-oid="j88c87s">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="73m65bz"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>
            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="mbq0asg"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
) || false,

    // === JSX RETURN START ===
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="l63n9.q">
            <h3 className="font-bold mb-2" data-oid="j88c87s">
                JSONBin Debug Info
            </h3>
            {/* === BUTTON SECTION START === */}
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="73m65bz"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>
            {/* === BUTTON SECTION END === */}
            {/* === DEBUG OUTPUT START === */}
            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="mbq0asg"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
            {/* === DEBUG OUTPUT END === */}
        </div>
    );
    // === JSX RETURN END ===
}
) || false,
                startsWithExpected: apiKey?.startsWith('$2a$10$ZE') || false,
                allRelevantEnvVars: allEnvVars,
                allNextPublicVars: Object.keys(process.env).filter((key) =>
                    key.startsWith('NEXT_PUBLIC_'),
                ),
                timestamp: new Date().toISOString(),
            });
            // === DEBUG INFO OBJECT END ===
        } catch (error: any) {
            setDebugInfo({ error: error.message, timestamp: new Date().toISOString() });
        }
        setIsLoading(false);
    };
    // === DEBUG FUNCTION END ===

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" data-oid="l63n9.q">
            <h3 className="font-bold mb-2" data-oid="j88c87s">
                JSONBin Debug Info
            </h3>
            <button
                onClick={runDebugTest}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
                data-oid="73m65bz"
            >
                {isLoading ? 'Testing...' : 'Run Debug Test'}
            </button>
            {debugInfo && (
                <pre
                    className="bg-white p-2 rounded text-xs overflow-auto max-h-96"
                    data-oid="mbq0asg"
                >
                    {JSON.stringify(debugInfo, null, 2)}
                </pre>
            )}
        </div>
    );
}
