'use client';

import { useState, useEffect } from 'react';
import { initialBooks } from './books-data';

const STORAGE_KEY = 'bookgroup-books';

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load books from localStorage on mount
    useEffect(() => {
        try {
            const savedBooks = localStorage.getItem(STORAGE_KEY);
            if (savedBooks) {
                setBooks(JSON.parse(savedBooks));
            } else {
                // First time user - use initial books
                setBooks(initialBooks);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
            }
        } catch (error) {
            console.error('Error loading books from localStorage:', error);
            setBooks(initialBooks);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save books to localStorage whenever books change
    useEffect(() => {
        if (!isLoading && books.length > 0) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
            } catch (error) {
                console.error('Error saving books to localStorage:', error);
            }
        }
    }, [books, isLoading]);

    const addBook = (bookData) => {
        const newBook = {
            ...bookData,
            id: Date.now(), // Simple ID generation
        };
        setBooks((prevBooks) => [...prevBooks, newBook]);
        return newBook;
    };

    const updateBook = (id, bookData) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === id ? { ...book, ...bookData } : book)),
        );
    };

    const deleteBook = (id) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    };

    const getBooksByStatus = (status) => {
        return books.filter((book) => book.status === status);
    };

    const resetToDefaults = () => {
        setBooks(initialBooks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
    };

    const exportBooks = () => {
        const dataStr = JSON.stringify(books, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my-books.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const importBooks = (jsonData) => {
        try {
            const importedBooks = JSON.parse(jsonData);
            if (Array.isArray(importedBooks)) {
                // Add unique IDs if missing and merge with existing books
                const booksWithIds = importedBooks.map((book) => ({
                    ...book,
                    id: book.id || Date.now() + Math.random(),
                }));
                setBooks((prevBooks) => [...prevBooks, ...booksWithIds]);
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
        addBook,
        updateBook,
        deleteBook,
        getBooksByStatus,
        resetToDefaults,
        exportBooks,
        importBooks,
    };
}
