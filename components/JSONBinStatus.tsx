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
                data-oid="5161fy9"
            >
                {' '}
                <div className="flex items-center" data-oid="1fxcj5-">
                    {' '}
                    <div
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"
                        data-oid="gnnk4o0"
                    ></div>{' '}
                    <span className="text-blue-800" data-oid="tcg5h-8">
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
                data-oid="dwtdp:v"
            >
                {' '}
                <div className="flex items-center" data-oid="739n4.j">
                    {' '}
                    <div
                        className="w-4 h-4 bg-green-500 rounded-full mr-3"
                        data-oid="ba-5ux-"
                    ></div>{' '}
                    <span className="text-green-800" data-oid="_7kwxpj">
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
            data-oid="ltu4143"
        >
            {' '}
            <div className="flex items-center justify-between" data-oid="c5gtkmx">
                {' '}
                <div className="flex items-center" data-oid="b5b3_bb">
                    {' '}
                    <div
                        className="w-4 h-4 bg-yellow-500 rounded-full mr-3"
                        data-oid="v0338i2"
                    ></div>{' '}
                    <div className="text-yellow-800" data-oid="y9ch-m4">
                        {' '}
                        <p className="font-medium" data-oid="ot0c4ua">
                            {' '}
                            Using local storage only{' '}
                        </p>{' '}
                        <p className="text-sm" data-oid="fsx.pw6">
                            {' '}
                            Shared data unavailable. Your changes will be saved locally but
                            won&apos;t sync with other members.{' '}
                        </p>{' '}
                    </div>{' '}
                </div>{' '}
                <button
                    onClick={retryConnection}
                    className="text-yellow-700 hover:text-yellow-900 text-sm underline"
                    data-oid="15th25f"
                >
                    {' '}
                    Retry{' '}
                </button>{' '}
            </div>{' '}
        </div>
    );
}
