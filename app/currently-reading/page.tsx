'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="x0qljiz">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="2ble.05">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="rxdid41">
                    <div className="flex items-center justify-between" data-oid="s:tt077">
                        <div className="flex items-center space-x-3" data-oid="3d4um3b">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="jjn0dq9"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="4.43-z6"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ygq656a"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="8m.bx84">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="2cb1w:9"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="no38wh7">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="za76856">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="4fahr8j"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="wnupk2u"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="2j3s2nz">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="5tj_-zq"
                >
                    <div className="text-center" data-oid="j__68z_">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="-hju7f:">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="9dxhn3a">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="jjn4e6d">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="e2efk2p"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="ey5c8jk"
                            >
                                <div className="mb-4" data-oid="92gse9i">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="1ybq4id"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=":wasiaj">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=".:6zyb.">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="9wrefbq">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="v4e0n:e"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid=".fpd8nr"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="._r3thq"
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
                    <div className="text-center py-12" data-oid=".d.7pqo">
                        <div className="text-6xl mb-4" data-oid="mo5pv0r">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="78ov3u6">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="3yfsn23">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="zsp.059"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
