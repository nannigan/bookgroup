'use client';

import { JSONBinStorage } from './jsonbin-storage';

interface TestResult {
    success: boolean;
    message?: string;
    booksCount?: number;
    latency?: number;
    error?: string;
}

interface TestResults {
    read: TestResult | null;
    write: TestResult | null;
    binInfo: TestResult | null;
    latency: number | null;
    errors: string[];
}

export class ConnectionTest {
    private storage: JSONBinStorage;
    public testResults: TestResults;

    constructor() {
        this.storage = new JSONBinStorage();
        this.testResults = {
            read: null,
            write: null,
            binInfo: null,
            latency: null,
            errors: [],
        };
    }

    async runFullTest(): Promise<TestResults> {
        console.log('🧪 Starting JSONBin connection test...');
        this.testResults.errors = [];

        const startTime = Date.now();

        try {
            // Test 1: Read access
            await this.testReadAccess();

            // Test 2: Write access
            await this.testWriteAccess();

            // Test 3: Bin information
            await this.testBinInfo();

            // Calculate total latency
            this.testResults.latency = Date.now() - startTime;

            console.log('✅ Connection test completed successfully');
            return this.testResults;
        } catch (error: any) {
            console.error('❌ Connection test failed:', error);
            this.testResults.errors.push(`Test failed: ${error.message}`);
            return this.testResults;
        }
    }

    private async testReadAccess(): Promise<void> {
        console.log('📖 Testing read access...');
        const readStart = Date.now();

        try {
            const books = await this.storage.getBooks();
            const readTime = Date.now() - readStart;

            if (books !== null) {
                this.testResults.read = {
                    success: true,
                    booksCount: books.length,
                    latency: readTime,
                    message: `Successfully read ${books.length} books`,
                };
                console.log(`✅ Read test passed: ${books.length} books in ${readTime}ms`);
            } else {
                throw new Error('Read returned null');
            }
        } catch (error: any) {
            this.testResults.read = {
                success: false,
                error: error.message,
                latency: Date.now() - readStart,
            };
            this.testResults.errors.push(`Read test failed: ${error.message}`);
            throw error;
        }
    }

    private async testWriteAccess(): Promise<void> {
        console.log('✏️ Testing write access...');
        const writeStart = Date.now();

        try {
            // Get current books
            const currentBooks = (await this.storage.getBooks()) || [];

            // Create a test book
            const testBook = {
                id: `test-${Date.now()}`,
                title: 'Connection Test Book',
                author: 'Test Author',
                genre: 'Test',
                status: 'Want to Read' as const,
                comment: 'This is a test book created during connection testing',
            };

            // Add test book
            const booksWithTest = [...currentBooks, testBook];
            const writeSuccess = await this.storage.saveBooks(booksWithTest);

            if (writeSuccess) {
                // Verify the write by reading back
                const verifyBooks = await this.storage.getBooks();
                const testBookExists = verifyBooks?.some((book) => book.id === testBook.id);

                if (testBookExists) {
                    // Clean up - remove test book
                    await this.storage.saveBooks(currentBooks);

                    const writeTime = Date.now() - writeStart;
                    this.testResults.write = {
                        success: true,
                        latency: writeTime,
                        message: `Write test successful in ${writeTime}ms`,
                    };
                    console.log(`✅ Write test passed in ${writeTime}ms`);
                } else {
                    throw new Error('Write verification failed - test book not found');
                }
            } else {
                throw new Error('Write operation returned false');
            }
        } catch (error: any) {
            this.testResults.write = {
                success: false,
                error: error.message,
                latency: Date.now() - writeStart,
            };
            this.testResults.errors.push(`Write test failed: ${error.message}`);
            throw error;
        }
    }

    private async testBinInfo(): Promise<void> {
        console.log('ℹ️ Testing bin information...');

        try {
            const binInfo = await this.storage.getBinInfo();

            if (binInfo) {
                this.testResults.binInfo = {
                    success: true,
                    message: `Bin info retrieved: ${binInfo.name} (${binInfo.isPublic ? 'Public' : 'Private'})`,
                };
                console.log('✅ Bin info test passed:', binInfo);
            } else {
                this.testResults.binInfo = {
                    success: false,
                    message: 'Could not retrieve bin information',
                };
                console.log('⚠️ Bin info test: No information available');
            }
        } catch (error: any) {
            this.testResults.binInfo = {
                success: false,
                error: error.message,
            };
            this.testResults.errors.push(`Bin info test failed: ${error.message}`);
            console.log('❌ Bin info test failed:', error);
        }
    }

    getTestSummary() {
        const { read, write, binInfo, latency, errors } = this.testResults;

        return {
            overall: errors.length === 0 ? 'success' : 'failed',
            readStatus: read?.success ? 'pass' : 'fail',
            writeStatus: write?.success ? 'pass' : 'fail',
            binInfoStatus: binInfo?.success ? 'pass' : 'fail',
            totalLatency: latency,
            errorCount: errors.length,
            errors: errors,
        };
    }

    generateReport(): string {
        const summary = this.getTestSummary();

        let report = '📊 JSONBin Connection Test Report\n';
        report += '================================\n\n';

        report += `Overall Status: ${summary.overall === 'success' ? '✅ PASS' : '❌ FAIL'}\n`;
        report += `Total Test Time: ${summary.totalLatency}ms\n\n`;

        report += 'Individual Tests:\n';
        report += `• Read Access: ${summary.readStatus === 'pass' ? '✅' : '❌'} ${this.testResults.read?.message || this.testResults.read?.error || 'Not tested'}\n`;
        report += `• Write Access: ${summary.writeStatus === 'pass' ? '✅' : '❌'} ${this.testResults.write?.message || this.testResults.write?.error || 'Not tested'}\n`;
        report += `• Bin Information: ${summary.binInfoStatus === 'pass' ? '✅' : '❌'} ${this.testResults.binInfo?.message || this.testResults.binInfo?.error || 'Not tested'}\n\n`;

        if (summary.errors.length > 0) {
            report += 'Errors:\n';
            summary.errors.forEach((error, index) => {
                report += `${index + 1}. ${error}\n`;
            });
        }

        return report;
    }
}

// Quick test function for simple checks
export async function quickConnectionTest() {
    const test = new ConnectionTest();

    try {
        const results = await test.runFullTest();
        const summary = test.getTestSummary();

        return {
            success: summary.overall === 'success',
            message:
                summary.overall === 'success'
                    ? `✅ All tests passed in ${summary.totalLatency}ms`
                    : `❌ ${summary.errorCount} test(s) failed`,
            details: results,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `❌ Test failed: ${error.message}`,
            details: null,
        };
    }
}

// Connection status interface
interface ConnectionStatus {
    isConnected: boolean;
    timestamp: string;
    booksCount?: number;
    error?: string;
}

// Continuous monitoring function
export class ConnectionMonitor {
    private interval: number;
    private isMonitoring: boolean = false;
    private callbacks: Array<(status: ConnectionStatus) => void> = [];
    private lastStatus: ConnectionStatus | null = null;
    private intervalId?: NodeJS.Timeout;

    constructor(interval: number = 30000) {
        // 30 seconds default
        this.interval = interval;
    }

    addCallback(callback: (status: ConnectionStatus) => void): void {
        this.callbacks.push(callback);
    }

    removeCallback(callback: (status: ConnectionStatus) => void): void {
        this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    }

    async checkConnection(): Promise<ConnectionStatus> {
        try {
            const storage = new JSONBinStorage();
            const books = await storage.getBooks();
            const status: ConnectionStatus = {
                isConnected: books !== null,
                timestamp: new Date().toISOString(),
                booksCount: books?.length || 0,
            };

            // Notify callbacks if status changed
            if (!this.lastStatus || this.lastStatus.isConnected !== status.isConnected) {
                this.callbacks.forEach((callback) => callback(status));
            }

            this.lastStatus = status;
            return status;
        } catch (error: any) {
            const status: ConnectionStatus = {
                isConnected: false,
                timestamp: new Date().toISOString(),
                error: error.message,
            };

            if (!this.lastStatus || this.lastStatus.isConnected !== status.isConnected) {
                this.callbacks.forEach((callback) => callback(status));
            }

            this.lastStatus = status;
            return status;
        }
    }

    start(): void {
        if (this.isMonitoring) return;

        this.isMonitoring = true;
        this.checkConnection(); // Initial check

        this.intervalId = setInterval(() => {
            this.checkConnection();
        }, this.interval);

        console.log(`📡 Connection monitoring started (${this.interval}ms interval)`);
    }

    stop(): void {
        if (!this.isMonitoring) return;

        this.isMonitoring = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        console.log('📡 Connection monitoring stopped');
    }
}
