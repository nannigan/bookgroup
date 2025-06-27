'use client';

import { useState, useEffect } from 'react';
import { testJSONBinAccess } from '../lib/jsonbin-storage';

export function JSONBinStatus() {
    const [status, setStatus] = useState('testing');
    const [error, setError] = useState(null);

    useEffect(() => {
        checkJSONBinStatus();
    }, []);

    const checkJSONBinStatus = async () => {
        try {
            const isWorking = await testJSONBinAccess();
            setStatus(isWorking ? 'connected' : 'failed');
        } catch (error) {
            setStatus('failed');
            setError(error.message);
        }
    };

    if (status === 'testing') {
        return (
            <div
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                data-oid="eb2-8-g"
            >
                <div className="flex items-center" data-oid="fgbk8ct">
                    <div
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"
                        data-oid="t81dlol"
                    ></div>
                    <span className="text-blue-800" data-oid="t-p0wff">
                        Testing shared data connection...
                    </span>
                </div>
            </div>
        );
    }

    if (status === 'connected') {
        return (
            <div
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                data-oid="0jom9s8"
            >
                <div className="flex items-center" data-oid="xihf4b:">
                    <div
                        className="w-4 h-4 bg-green-500 rounded-full mr-3"
                        data-oid="pqx:o.r"
                    ></div>
                    <span className="text-green-800" data-oid="toatsi8">
                        ✅ Connected to shared book data! Changes will be visible to all book club
                        members.
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
            data-oid="z63x0tk"
        >
            <div className="flex items-center" data-oid="a_7y13c">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3" data-oid="v:id5_8"></div>
                <div className="text-yellow-800" data-oid="rbuzifa">
                    <p className="font-medium" data-oid="rbsi2pr">
                        Using local storage only
                    </p>
                    <p className="text-sm" data-oid="l2_m2j.">
                        Shared data unavailable. Your changes will be saved locally but won't sync
                        with other members.
                        {error && (
                            <span className="block mt-1" data-oid="k5:ozv7">
                                Error: {error}
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
