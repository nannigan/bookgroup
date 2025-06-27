// Option 1: Public Bin (No API key needed for users)
const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID || 'YOUR_PUBLIC_BIN_ID';
const BASE_URL = 'https://api.jsonbin.io/v3';

// Option 2: Private Bin with Shared API Key (More secure)
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;

export class JSONBinStorage {
    constructor() {
        // Use API key if available (private bin), otherwise public access
        this.headers = {
            'Content-Type': 'application/json',
            ...(JSONBIN_API_KEY && { 'X-Master-Key': JSONBIN_API_KEY }),
        };
        this.isPublic = !JSONBIN_API_KEY;
    }

    async getBooks() {
        try {
            // Public bins can be accessed without authentication
            const url = this.isPublic
                ? `${BASE_URL}/b/${BIN_ID}/latest`
                : `${BASE_URL}/b/${BIN_ID}/latest`;

            const response = await fetch(url, {
                headers: this.isPublic ? { 'Content-Type': 'application/json' } : this.headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.record?.books || [];
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async saveBooks(books) {
        try {
            const payload = {
                books,
                lastUpdated: new Date().toISOString(),
                updatedBy: 'BookClub Member', // Could add user identification later
            };

            const response = await fetch(`${BASE_URL}/b/${BIN_ID}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(payload),
            });

            return response.ok;
        } catch (error) {
            console.error('Error saving books:', error);
            return false;
        }
    }

    // Helper method to create a new public bin (run once by admin)
    async createPublicBin(initialData) {
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
            const response = await fetch(`${BASE_URL}/b/${BIN_ID}`, {
                headers: this.headers,
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
