const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID;
const BASE_URL = 'https://api.jsonbin.io/v3';

export class JSONBinStorage {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY,
        };
    }

    async getBooks() {
        try {
            const response = await fetch(`${BASE_URL}/b/${BIN_ID}/latest`, {
                headers: this.headers,
            });
            const data = await response.json();
            return data.record.books || [];
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async saveBooks(books) {
        try {
            const response = await fetch(`${BASE_URL}/b/${BIN_ID}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify({ books, lastUpdated: new Date().toISOString() }),
            });
            return response.ok;
        } catch (error) {
            console.error('Error saving books:', error);
            return false;
        }
    }

    async createBin(initialData) {
        try {
            const response = await fetch(`${BASE_URL}/b`, {
                method: 'POST',
                headers: {
                    ...this.headers,
                    'X-Bin-Name': 'BookGroup Data',
                    'X-Bin-Private': 'false',
                },
                body: JSON.stringify({ books: initialData }),
            });
            const data = await response.json();
            return data.metadata.id;
        } catch (error) {
            console.error('Error creating bin:', error);
            return null;
        }
    }
}
