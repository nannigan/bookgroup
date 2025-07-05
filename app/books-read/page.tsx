'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function BooksReadPage() {
    const [books] = useState(initialBooks);
    const readBooks = books.filter((book) => book.status === 'Read');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100"
            data-oid="y9z5pq8"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="q9woh0l">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="o791c67">
                    <div className="flex items-center justify-between" data-oid="j8lqyej">
                        <div className="flex items-center space-x-3" data-oid="3g7qaj3">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="-lyw8ee"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid=".6l2nb2"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="9in5.0l"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="gich:30">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="azl.j1h"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="8smy45o">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="m4d5o:y">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="alvcw-m"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="n1gerb9"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="cwzhyxd">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="6_1tm8r"
                >
                    <div className="text-center" data-oid="-ylk048">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="eh:b52l">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="kjc11wt">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="_776ici">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ts7i3yc"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="-.dvqd4"
                            >
                                <div className="mb-4" data-oid="ihw359g">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="8b.8rc:"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="4-ilaxy">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="9ughpr4">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="6in1hok">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="l3qmxsp"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="rt:xk_j"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="qrb3ggv"
                                            >
                                                &ldquo;{book.comment}&rdquo;
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12" data-oid=":xutt8:">
                        <div className="text-6xl mb-4" data-oid="d0rv6ir">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="0szbney">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="rbz3zv5">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="x3j5_l5"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
