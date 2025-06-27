import { JSONBinStorage } from './jsonbin-storage';
import { FirebaseStorage } from './firebase-storage';
import { AirtableStorage } from './airtable-storage';
import { GitHubStorage } from './github-storage';

const STORAGE_TYPE = process.env.NEXT_PUBLIC_STORAGE_TYPE || 'localStorage';

export class StorageAdapter {
    constructor() {
        switch (STORAGE_TYPE) {
            case 'jsonbin':
                this.storage = new JSONBinStorage();
                break;
            case 'firebase':
                this.storage = new FirebaseStorage();
                break;
            case 'airtable':
                this.storage = new AirtableStorage();
                break;
            case 'github':
                this.storage = new GitHubStorage();
                break;
            default:
                this.storage = null; // Use localStorage
        }
    }

    async getBooks() {
        if (!this.storage) {
            // Fallback to localStorage
            const saved = localStorage.getItem('bookgroup-books');
            return saved ? JSON.parse(saved) : [];
        }
        return await this.storage.getBooks();
    }

    async addBook(bookData) {
        if (!this.storage) {
            // Fallback to localStorage
            const books = await this.getBooks();
            const newBook = { ...bookData, id: Date.now() };
            books.push(newBook);
            localStorage.setItem('bookgroup-books', JSON.stringify(books));
            return newBook.id;
        }
        return await this.storage.addBook(bookData);
    }

    async updateBook(id, bookData) {
        if (!this.storage) {
            // Fallback to localStorage
            const books = await this.getBooks();
            const index = books.findIndex((book) => book.id === id);
            if (index !== -1) {
                books[index] = { ...books[index], ...bookData };
                localStorage.setItem('bookgroup-books', JSON.stringify(books));
                return true;
            }
            return false;
        }
        return await this.storage.updateBook(id, bookData);
    }

    async deleteBook(id) {
        if (!this.storage) {
            // Fallback to localStorage
            const books = await this.getBooks();
            const filtered = books.filter((book) => book.id !== id);
            localStorage.setItem('bookgroup-books', JSON.stringify(filtered));
            return true;
        }
        return await this.storage.deleteBook(id);
    }

    // For Firebase real-time updates
    subscribeToBooks(callback) {
        if (this.storage && this.storage.subscribeToBooks) {
            return this.storage.subscribeToBooks(callback);
        }
        return null;
    }
}
