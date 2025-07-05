'use client';
import { useState, useEffect } from 'react';
import { testJSONBinAccess } from '../lib/jsonbin-storage';
export function JSONBinStatus() {
    const [status, setStatus] = useState('testing');
    useEffect(() => {
        checkJSONBinStatus();
    }, []);
    const checkJSONBinStatus = async () => {
        const isWorking = await testJSONBinAccess();
        setStatus(isWorking ? 'connected' : 'failed');
    };
    const retryConnection = () => {
        setStatus('testing');
        checkJSONBinStatus();
    };
    if (status === 'testing') {
        return (
            <div
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                data-oid="sf3hke0"
            >
                {' '}
                <div className="flex items-center" data-oid="5l06361">
                    {' '}
                    <div
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"
                        data-oid="22l-7sa"
                    ></div>{' '}
                    <span className="text-blue-800" data-oid="ctpl7ut">
                        {' '}
                        Testing shared data connection...{' '}
                    </span>{' '}
                </div>{' '}
            </div>
        );
    }
    if (status === 'connected') {
        return (
            <div
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                data-oid="q.z:fsh"
            >
                {' '}
                <div className="flex items-center" data-oid="cx01z:h">
                    {' '}
                    <div
                        className="w-4 h-4 bg-green-500 rounded-full mr-3"
                        data-oid="dj91t0d"
                    ></div>{' '}
                    <span className="text-green-800" data-oid="1mqjlx1">
                        {' '}
                        ✅ Connected to shared book data! Changes will be visible to all book club
                        members.{' '}
                    </span>{' '}
                </div>{' '}
            </div>
        );
    }
    return (
        <div
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
            data-oid="iw2uysc"
        >
            {' '}
            <div className="flex items-center justify-between" data-oid="767frgg">
                {' '}
                <div className="flex items-center" data-oid="58si8p.">
                    {' '}
                    <div
                        className="w-4 h-4 bg-yellow-500 rounded-full mr-3"
                        data-oid="7dp:4mk"
                    ></div>{' '}
                    <div className="text-yellow-800" data-oid="w7nxov3">
                        {' '}
                        <p className="font-medium" data-oid=":.uckwb">
                            {' '}
                            Using local storage only{' '}
                        </p>{' '}
                        <p className="text-sm" data-oid="9r80tkq">
                            {' '}
                            Shared data unavailable. Your changes will be saved locally but
                            won&apos;t sync with other members.{' '}
                        </p>{' '}
                    </div>{' '}
                </div>{' '}
                <button
                    onClick={retryConnection}
                    className="text-yellow-700 hover:text-yellow-900 text-sm underline"
                    data-oid="84r0uta"
                >
                    {' '}
                    Retry{' '}
                </button>{' '}
            </div>{' '}
        </div>
    );
}
