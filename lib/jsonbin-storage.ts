'use client';

// Your actual JSONBin configuration
const BIN_ID = '6865e4868561e97a50308e97'; // Your actual bin ID
const BASE_URL = 'https://api.jsonbin.io/v3';

// Get API key from environment variables
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;

export class JSONBinStorage {
    private binId: string;
    private baseHeaders: Record<string, string>;
    private hasApiKey: boolean;

    constructor() {
        this.binId = BIN_ID;
        this.hasApiKey = !!JSONBIN_API_KEY;
        this.baseHeaders = {
            'Content-Type': 'application/json',
            ...(JSONBIN_API_KEY && { 'X-Master-Key': JSONBIN_API_KEY }),
        };
    }

    async getBooks() {
        try {
            const response = await fetch(`${BASE_URL}/b/${this.binId}/latest`, {
                headers: this.baseHeaders,
            });

            if (!response.ok) {
                console.warn(`JSONBin fetch failed with status: ${response.status}`);
                return null;
            }

            const data = await response.json();
            return data.record?.books || [];
        } catch (error) {
            console.warn('Error fetching books from JSONBin:', error);
            return null;
        }
    }

    async saveBooks(books: any[]) {
        try {
            const payload = {
                books,
                lastUpdated: new Date().toISOString(),
            };

            const response = await fetch(`${BASE_URL}/b/${this.binId}`, {
                method: 'PUT',
                headers: this.baseHeaders,
                body: JSON.stringify(payload),
            });

            return response.ok;
        } catch (error) {
            console.warn('Error saving books to JSONBin:', error);
            return false;
        }
    }
}

// Test function to verify the bin is working
export async function testJSONBinAccess(): Promise<boolean> {
    const storage = new JSONBinStorage();
    const books = await storage.getBooks();
    return books !== null && Array.isArray(books);
}

// Enhanced test function with detailed results
export async function testJSONBinAccessDetailed(): Promise<{
    success: boolean;
    apiKey: string;
    binId: string;
    response?: any;
    error?: string;
}> {
    const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
    const binId = '6865e4868561e97a50308e97';

    try {
        const headers = {
            'Content-Type': 'application/json',
            ...(apiKey && { 'X-Master-Key': apiKey }),
        };

        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
            headers: headers,
        });

        const data = await response.json();

        return {
            success: response.ok,
            apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT_FOUND',
            binId: binId,
            response: {
                status: response.status,
                statusText: response.statusText,
                data: data,
            },
        };
    } catch (error: any) {
        return {
            success: false,
            apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT_FOUND',
            binId: binId,
            error: error.message,
        };
    }
}
