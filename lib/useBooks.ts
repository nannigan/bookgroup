'use client';

import { useState, useEffect } from 'react';
import { initialBooks } from './books-data';
import { JSONBinStorage } from './jsonbin-storage';
import { Book, BookFormData } from './types';

const STORAGE_KEY = 'bookgroup-books';
const LAST_SYNC_KEY = 'bookgroup-last-sync';

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(true);
    const [lastSync, setLastSync] = useState<string | null>(null);
    const [storage] = useState(() => new JSONBinStorage());

    // Load books on mount - try JSONBin first, fallback to localStorage
    useEffect(() => {
        loadBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Set up online/offline detection
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            syncWithJSONBin();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadBooks = async () => {
        try {
            console.log('Loading books...');

            // Try to load from JSONBin first
            const jsonBinBooks = await storage.getBooks();

            if (jsonBinBooks !== null && jsonBinBooks.length > 0) {
                console.log('Loaded books from JSONBin');
                setBooks(jsonBinBooks);
                // Save to localStorage as backup
                localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonBinBooks));
                setLastSync(new Date().toISOString());
                localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
            } else {
                // Fallback to localStorage
                console.log('Falling back to localStorage');
                const savedBooks = localStorage.getItem(STORAGE_KEY);
                if (savedBooks) {
                    const localBooks: Book[] = JSON.parse(savedBooks);
                    setBooks(localBooks);
                    // Try to sync local data to JSONBin
                    if (isOnline) {
                        await storage.saveBooks(localBooks);
                    }
                } else {
                    // First time user - use initial books
                    console.log('Using initial books');
                    setBooks(initialBooks);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
                    // Try to initialize JSONBin with initial data
                    if (isOnline) {
                        await storage.saveBooks(initialBooks);
                    }
                }

                const lastSyncTime = localStorage.getItem(LAST_SYNC_KEY);
                setLastSync(lastSyncTime);
            }
        } catch (error) {
            console.error('Error loading books:', error);
            // Ultimate fallback
            setBooks(initialBooks);
        } finally {
            setIsLoading(false);
        }
    };

    const syncWithJSONBin = async () => {
        if (!isOnline) return;

        try {
            const jsonBinBooks = await storage.getBooks();
            if (jsonBinBooks !== null) {
                setBooks(jsonBinBooks);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonBinBooks));
                setLastSync(new Date().toISOString());
                localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
            }
        } catch (error) {
            console.warn('Sync failed:', error);
        }
    };

    const saveBooks = async (newBooks: Book[]) => {
        // Always save to localStorage immediately
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBooks));

        // Try to save to JSONBin if online
        if (isOnline) {
            const success = await storage.saveBooks(newBooks);
            if (success) {
                setLastSync(new Date().toISOString());
                localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
            }
        }
    };

    const addBook = async (bookData: BookFormData): Promise<Book> => {
        const newBook: Book = {
            ...bookData,
            id: Date.now() + Math.random(), // Ensure uniqueness across users
        };
        const newBooks = [...books, newBook];
        setBooks(newBooks);
        await saveBooks(newBooks);
        return newBook;
    };

    const updateBook = async (id: number | string, bookData: Partial<BookFormData>) => {
        const newBooks = books.map((book) => (book.id === id ? { ...book, ...bookData } : book));
        setBooks(newBooks);
        await saveBooks(newBooks);
    };

    const deleteBook = async (id: number | string) => {
        const newBooks = books.filter((book) => book.id !== id);
        setBooks(newBooks);
        await saveBooks(newBooks);
    };

    const getBooksByStatus = (status: Book['status']): Book[] => {
        return books.filter((book) => book.status === status);
    };

    const resetToDefaults = async () => {
        setBooks(initialBooks);
        await saveBooks(initialBooks);
    };

    const forceSync = async () => {
        if (isOnline) {
            await syncWithJSONBin();
        }
    };

    const testConnection = async () => {
        try {
            const books = await storage.getBooks();
            return {
                success: books !== null,
                message:
                    books !== null
                        ? `✅ Connection successful - found ${books.length} books`
                        : '❌ Connection failed',
                booksCount: books?.length || 0,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `❌ Connection failed: ${error.message}`,
                error: error.message,
            };
        }
    };

    const exportBooks = () => {
        const dataStr = JSON.stringify(books, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bookgroup-books.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const importBooks = async (jsonData: string): Promise<boolean> => {
        try {
            const importedBooks = JSON.parse(jsonData);
            if (Array.isArray(importedBooks)) {
                const booksWithIds: Book[] = importedBooks.map((book) => ({
                    ...book,
                    id: book.id || Date.now() + Math.random(),
                }));
                const newBooks = [...books, ...booksWithIds];
                setBooks(newBooks);
                await saveBooks(newBooks);
                return true;
            }
        } catch (error) {
            console.error('Error importing books:', error);
        }
        return false;
    };

    return {
        books,
        isLoading,
        isOnline,
        lastSync,
        addBook,
        updateBook,
        deleteBook,
        getBooksByStatus,
        resetToDefaults,
        forceSync,
        exportBooks,
        importBooks,
    };
}
