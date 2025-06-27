const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const TABLE_NAME = 'Books';
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

export class AirtableStorage {
    constructor() {
        this.headers = {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        };
    }

    async getBooks() {
        try {
            const response = await fetch(BASE_URL, {
                headers: this.headers,
            });
            const data = await response.json();
            return data.records.map((record) => ({
                id: record.id,
                ...record.fields,
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async addBook(bookData) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    fields: bookData,
                }),
            });
            const data = await response.json();
            return data.id;
        } catch (error) {
            console.error('Error adding book:', error);
            return null;
        }
    }

    async updateBook(id, bookData) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    fields: bookData,
                }),
            });
            return response.ok;
        } catch (error) {
            console.error('Error updating book:', error);
            return false;
        }
    }

    async deleteBook(id) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting book:', error);
            return false;
        }
    }
}
