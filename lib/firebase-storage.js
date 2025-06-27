import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase-config';

export class FirebaseStorage {
    constructor() {
        this.booksCollection = collection(db, 'books');
    }

    async getBooks() {
        try {
            const snapshot = await getDocs(this.booksCollection);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async addBook(bookData) {
        try {
            const docRef = await addDoc(this.booksCollection, {
                ...bookData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding book:', error);
            return null;
        }
    }

    async updateBook(id, bookData) {
        try {
            const bookRef = doc(db, 'books', id);
            await updateDoc(bookRef, {
                ...bookData,
                updatedAt: serverTimestamp(),
            });
            return true;
        } catch (error) {
            console.error('Error updating book:', error);
            return false;
        }
    }

    async deleteBook(id) {
        try {
            await deleteDoc(doc(db, 'books', id));
            return true;
        } catch (error) {
            console.error('Error deleting book:', error);
            return false;
        }
    }

    // Real-time listener
    subscribeToBooks(callback) {
        return onSnapshot(this.booksCollection, (snapshot) => {
            const books = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(books);
        });
    }
}
