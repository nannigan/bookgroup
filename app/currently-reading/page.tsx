'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📖</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600">Books in Progress</div>
                        <p className="text-sm text-gray-500 mt-2">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2">by {book.author}</p>
                                    <span className="text-sm text-gray-500">{book.genre}</span>
                                </div>

                                <div className="space-y-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                            <p className="text-sm text-gray-700 italic">
                                                &ldquo;{book.comment}&rdquo;
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📖</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
