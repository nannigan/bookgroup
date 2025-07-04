'use client';

export function EnvTest() {
    const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
    
    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-2">Environment Variable Test</h3>
            <div className="space-y-2 text-sm">
                <div>
                    <strong>API Key Present:</strong> {apiKey ? 'Yes' : 'No'}
                </div>
                <div>
                    <strong>API Key Length:</strong> {apiKey?.length || 0}
                </div>
                <div>
                    <strong>API Key First 15 chars:</strong> {apiKey?.substring(0, 15) || 'N/A'}
                </div>
                <div>
                    <strong>Starts with $2a$10$:</strong> {apiKey?.startsWith('$2a$10) ? 'Yes' : 'No'}
                </div>
                <div>
                    <strong>All env vars starting with NEXT_PUBLIC_:</strong>
                    <pre className="bg-white p-2 rounded mt-1 text-xs">
                        {JSON.stringify(
                            Object.keys(process.env)
                                .filter(key => key.startsWith('NEXT_PUBLIC_'))
                                .reduce((obj, key) => {
                                    obj[key] = process.env[key]?.substring(0, 20) + '...';
                                    return obj;
                                }, {} as Record<string, string>),
                            null,
                            2
                        )}
                    </pre>
                </div>
            </div>
        </div>
    );
}