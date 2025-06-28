'use client';

import { useState } from 'react';
import { ConnectionTest, quickConnectionTest } from '../lib/connection-test';

interface TestResult {
    success: boolean;
    message: string;
    details?: any;
    summary?: any;
    report?: string;
}

export function ConnectionTestPanel() {
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [testResults, setTestResults] = useState<TestResult | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const runQuickTest = async () => {
        setIsTestRunning(true);
        setTestResults(null);

        try {
            const result = await quickConnectionTest();
            setTestResults(result);
        } catch (error) {
            setTestResults({
                success: false,
                message: `Test failed: ${error.message}`,
                details: null,
            });
        } finally {
            setIsTestRunning(false);
        }
    };

    const runDetailedTest = async () => {
        setIsTestRunning(true);
        setTestResults(null);

        try {
            const test = new ConnectionTest();
            const results = await test.runFullTest();
            const summary = test.getTestSummary();

            setTestResults({
                success: summary.overall === 'success',
                message:
                    summary.overall === 'success'
                        ? `✅ All tests passed in ${summary.totalLatency}ms`
                        : `❌ ${summary.errorCount} test(s) failed`,
                details: results,
                summary: summary,
                report: test.generateReport(),
            });
            setShowDetails(true);
        } catch (error) {
            setTestResults({
                success: false,
                message: `Test failed: ${error.message}`,
                details: null,
            });
        } finally {
            setIsTestRunning(false);
        }
    };

    const copyReport = () => {
        if (testResults?.report) {
            navigator.clipboard.writeText(testResults.report);
            alert('Test report copied to clipboard!');
        }
    };

    return (
        <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            data-oid="iq-idbu"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-4" data-oid="nscxjb2">
                🧪 Connection Test
            </h3>

            <p className="text-gray-600 text-sm mb-4" data-oid="9809_ri">
                Test the JSONBin integration to verify shared data functionality.
            </p>

            <div className="flex space-x-3 mb-4" data-oid="20s14y3">
                <button
                    onClick={runQuickTest}
                    disabled={isTestRunning}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    data-oid="hr9ts4-"
                >
                    {isTestRunning ? '⏳ Testing...' : '⚡ Quick Test'}
                </button>

                <button
                    onClick={runDetailedTest}
                    disabled={isTestRunning}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    data-oid="gn-_s8k"
                >
                    {isTestRunning ? '⏳ Testing...' : '🔍 Detailed Test'}
                </button>
            </div>

            {isTestRunning && (
                <div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"
                    data-oid="j.dixnr"
                >
                    <div className="flex items-center" data-oid="j-yu9p8">
                        <div
                            className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"
                            data-oid="1og47t1"
                        ></div>
                        <span className="text-blue-800" data-oid="rgocqul">
                            Running connection test...
                        </span>
                    </div>
                </div>
            )}

            {testResults && (
                <div
                    className={`border rounded-lg p-4 mb-4 ${
                        testResults.success
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                    }`}
                    data-oid="7nl:wt5"
                >
                    <div className="flex items-center justify-between" data-oid="n4ce2xd">
                        <span
                            className={`font-medium ${
                                testResults.success ? 'text-green-800' : 'text-red-800'
                            }`}
                            data-oid="vz_dnj-"
                        >
                            {testResults.message}
                        </span>

                        {testResults.details && (
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-sm text-gray-600 hover:text-gray-800"
                                data-oid="n_qs:hz"
                            >
                                {showDetails ? 'Hide Details' : 'Show Details'}
                            </button>
                        )}
                    </div>

                    {showDetails && testResults.details && (
                        <div className="mt-4 space-y-3" data-oid="7ocf8zi">
                            <div className="text-sm" data-oid=".gqqtib">
                                <h4 className="font-medium text-gray-700 mb-2" data-oid="jrej73q">
                                    Test Results:
                                </h4>

                                {/* Read Test */}
                                <div
                                    className="flex items-center space-x-2 mb-1"
                                    data-oid=".0xpz2j"
                                >
                                    <span
                                        className={testResults.details.read?.success ? '✅' : '❌'}
                                        data-oid="x2q8jkn"
                                    ></span>
                                    <span className="text-gray-600" data-oid="vzly2:.">
                                        Read Access:{' '}
                                        {testResults.details.read?.message ||
                                            testResults.details.read?.error}
                                    </span>
                                    {testResults.details.read?.latency && (
                                        <span className="text-gray-400" data-oid="o_tsyre">
                                            ({testResults.details.read.latency}ms)
                                        </span>
                                    )}
                                </div>

                                {/* Write Test */}
                                <div
                                    className="flex items-center space-x-2 mb-1"
                                    data-oid="exb_3pl"
                                >
                                    <span
                                        className={testResults.details.write?.success ? '✅' : '❌'}
                                        data-oid="yd-jn5r"
                                    ></span>
                                    <span className="text-gray-600" data-oid="lgf1fy5">
                                        Write Access:{' '}
                                        {testResults.details.write?.message ||
                                            testResults.details.write?.error}
                                    </span>
                                    {testResults.details.write?.latency && (
                                        <span className="text-gray-400" data-oid="35esalu">
                                            ({testResults.details.write.latency}ms)
                                        </span>
                                    )}
                                </div>

                                {/* Bin Info Test */}
                                <div
                                    className="flex items-center space-x-2 mb-1"
                                    data-oid="v.fbvvc"
                                >
                                    <span
                                        className={
                                            testResults.details.binInfo?.success ? '✅' : '❌'
                                        }
                                        data-oid="t8:hcw-"
                                    ></span>
                                    <span className="text-gray-600" data-oid="fcl1ch2">
                                        Bin Info:{' '}
                                        {testResults.details.binInfo?.message ||
                                            testResults.details.binInfo?.error}
                                    </span>
                                </div>

                                {/* Total Latency */}
                                {testResults.details.latency && (
                                    <div className="text-gray-500 text-xs mt-2" data-oid="lm5hxlj">
                                        Total test time: {testResults.details.latency}ms
                                    </div>
                                )}

                                {/* Errors */}
                                {testResults.details.errors &&
                                    testResults.details.errors.length > 0 && (
                                        <div className="mt-3" data-oid="bp_1fcl">
                                            <h5
                                                className="font-medium text-red-700 mb-1"
                                                data-oid="pd2m-z6"
                                            >
                                                Errors:
                                            </h5>
                                            <ul
                                                className="text-red-600 text-xs space-y-1"
                                                data-oid="jk1r0m:"
                                            >
                                                {testResults.details.errors.map((error, index) => (
                                                    <li key={index} data-oid="oaks6s1">
                                                        • {error}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                            </div>

                            {testResults.report && (
                                <div className="mt-4" data-oid="zc-.z37">
                                    <div
                                        className="flex items-center justify-between mb-2"
                                        data-oid="5m9_kcp"
                                    >
                                        <h5
                                            className="font-medium text-gray-700"
                                            data-oid="4nyas6r"
                                        >
                                            Full Report:
                                        </h5>
                                        <button
                                            onClick={copyReport}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                            data-oid="8t-.y-x"
                                        >
                                            📋 Copy Report
                                        </button>
                                    </div>
                                    <pre
                                        className="bg-gray-100 p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap"
                                        data-oid="wloo-0f"
                                    >
                                        {testResults.report}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="text-xs text-gray-500" data-oid="3wg52-1">
                <p data-oid="di6:._f">
                    <strong data-oid="1bp6nxg">Quick Test:</strong> Basic read/write verification
                </p>
                <p data-oid="-uuvi_j">
                    <strong data-oid="fht1jos">Detailed Test:</strong> Comprehensive testing with
                    full report
                </p>
            </div>
        </div>
    );
}
