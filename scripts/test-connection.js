#!/usr/bin/env node

// Standalone connection test script for development
import { ConnectionTest, quickConnectionTest } from '../lib/connection-test.js';

async function runTests() {
    console.log('🚀 Starting JSONBin Connection Tests\n');

    // Quick test first
    console.log('1️⃣ Running Quick Test...');
    const quickResult = await quickConnectionTest();
    console.log(quickResult.message);

    if (!quickResult.success) {
        console.log('\n❌ Quick test failed, skipping detailed test');
        process.exit(1);
    }

    console.log('\n2️⃣ Running Detailed Test...');

    // Detailed test
    const test = new ConnectionTest();
    const results = await test.runFullTest();
    const summary = test.getTestSummary();

    console.log('\n' + test.generateReport());

    if (summary.overall === 'success') {
        console.log('\n🎉 All tests passed! JSONBin integration is working correctly.');
        process.exit(0);
    } else {
        console.log('\n💥 Some tests failed. Check the report above for details.');
        process.exit(1);
    }
}

// Handle errors
runTests().catch((error) => {
    console.error('\n💥 Test script failed:', error.message);
    process.exit(1);
});
