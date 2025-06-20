'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="j5-wfjy">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="hp3max4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ww2lz9r">
                    <div className="flex items-center justify-between" data-oid="c4qynjk">
                        <div className="flex items-center space-x-3" data-oid="war7ev_">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="p61-3lm"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="0zpwxvu"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=":eikuzm"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="ypt95-5">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="x5fhu91"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="si-ka-:">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="hg2gcag">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="gqt9bqh"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="pvs:4kl"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="3kv5a.t">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="ad8gb6w"
                >
                    <div className="text-center" data-oid="aprgk5m">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid=":6yxqnc">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="zbcwkzn">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="e-dobte">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="w.7p:4_"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="pz684uy"
                            >
                                <div className="mb-4" data-oid="g4_u2bz">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="gd7yy2i"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="phvz7w-">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="7j9u36u">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="n:o-ayc">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="rr0:3v5"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="6bj3dyk"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="u1p:u8x"
                                            >
                                                "{book.comment}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12" data-oid="byrmca1">
                        <div className="text-6xl mb-4" data-oid="4_52_96">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="pkjo34q">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="__.9xnx">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="v2dkj9_"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
