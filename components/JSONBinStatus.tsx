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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                {' '}
                <div className="flex items-center">
                    {' '}
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>{' '}
                    <span className="text-blue-800"> Testing shared data connection... </span>{' '}
                </div>{' '}
            </div>
        );
    }
    if (status === 'connected') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                {' '}
                <div className="flex items-center">
                    {' '}
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>{' '}
                    <span className="text-green-800">
                        {' '}
                        ✅ Connected to shared book data! Changes will be visible to all book club
                        members.{' '}
                    </span>{' '}
                </div>{' '}
            </div>
        );
    }
    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            {' '}
            <div className="flex items-center justify-between">
                {' '}
                <div className="flex items-center">
                    {' '}
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>{' '}
                    <div className="text-yellow-800">
                        {' '}
                        <p className="font-medium"> Using local storage only </p>{' '}
                        <p className="text-sm">
                            {' '}
                            Shared data unavailable. Your changes will be saved locally but
                            won&apos;t sync with other members.{' '}
                        </p>{' '}
                    </div>{' '}
                </div>{' '}
                <button
                    onClick={retryConnection}
                    className="text-yellow-700 hover:text-yellow-900 text-sm underline"
                >
                    {' '}
                    Retry{' '}
                </button>{' '}
            </div>{' '}
        </div>
    );
}
