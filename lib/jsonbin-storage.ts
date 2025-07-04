'use client';

// Public JSONBin configuration - no API key needed for users!
const PUBLIC_BIN_ID = '6865e4868561e97a50308e97'; // This will be our shared bin
const BASE_URL = 'https://api.jsonbin.io/v3';

// Option 2: Private Bin with Shared API Key (More secure)
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;

export class JSONBinStorage {
    private binId: string;
    private baseHeaders: Record<string, string>;
    private isPublic: boolean;

    constructor() {
        this.binId = PUBLIC_BIN_ID;
        this.baseHeaders = {
            'Content-Type': 'application/json',
            ...(JSONBIN_API_KEY && { 'X-Master-Key': JSONBIN_API_KEY }),
        };
        this.isPublic = !JSONBIN_API_KEY;
    }

    async getBooks() {
        try {
            console.log('Fetching books from JSONBin...');
            const response = await fetch(`${BASE_URL}/b/${this.binId}/latest`, {
                headers: this.isPublic ? { 'Content-Type': 'application/json' } : this.baseHeaders,
            });

            if (!response.ok) {
                console.warn(`JSONBin fetch failed with status: ${response.status}`);
                return null; // Will fallback to localStorage
            }

            const data = await response.json();
            console.log('Successfully fetched books from JSONBin');
            return data.record?.books || [];
        } catch (error) {
            console.warn('Error fetching books from JSONBin:', error);
            return null; // Will fallback to localStorage
        }
    }

    async saveBooks(books: any[]) {
        try {
            console.log('Saving books to JSONBin...');
            const payload = {
                books,
                lastUpdated: new Date().toISOString(),
                updatedBy: `User-${Date.now()}`, // Simple user identification
            };

            const response = await fetch(`${BASE_URL}/b/${this.binId}`, {
                method: 'PUT',
                headers: this.baseHeaders,
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Successfully saved books to JSONBin');
                return true;
            } else {
                console.warn(`JSONBin save failed with status: ${response.status}`);
                return false;
            }
        } catch (error) {
            console.warn('Error saving books to JSONBin:', error);
            return false;
        }
    }

    // Helper method to create a new public bin (run once by admin)
    async createPublicBin(initialData: any[]) {
        if (!JSONBIN_API_KEY) {
            console.error('API key required to create bins');
            return null;
        }

        try {
            const response = await fetch(`${BASE_URL}/b`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_API_KEY,
                    'X-Bin-Name': 'BookGroup Shared Data',
                    'X-Bin-Private': 'false', // Make it public for read/write
                },
                body: JSON.stringify({
                    books: initialData,
                    createdAt: new Date().toISOString(),
                    description: 'Shared book data for book club',
                }),
            });

            const data = await response.json();
            console.log('Created public bin with ID:', data.metadata.id);
            return data.metadata.id;
        } catch (error) {
            console.error('Error creating bin:', error);
            return null;
        }
    }

    // Method to check bin status and permissions
    async getBinInfo() {
        try {
            const response = await fetch(`${BASE_URL}/b/${this.binId}`, {
                headers: this.baseHeaders,
            });
            const data = await response.json();
            return {
                isPublic: !data.metadata.private,
                createdAt: data.metadata.createdAt,
                name: data.metadata.name,
            };
        } catch (error) {
            console.error('Error getting bin info:', error);
            return null;
        }
    }
}

// Test function to verify the bin is working
export async function testJSONBinAccess(): Promise<boolean> {
    const storage = new JSONBinStorage();
    const books = await storage.getBooks();
    return books !== null && Array.isArray(books);
}
