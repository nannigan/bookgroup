'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="th8uphx">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="45uism1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="::6.mlh">
                    <div className="flex items-center justify-between" data-oid="uncefjp">
                        <div className="flex items-center space-x-3" data-oid="mc8n2_m">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="tcfgauz"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="ac0lisc"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="9dcuetf"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid=".opcl2y">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="s01:esn"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="9v43w0z">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="aqjpket">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="b4n_mv:"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="gefmjz-"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="luwb2mk">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="njjz7xd"
                >
                    <div className="text-center" data-oid="u620mt5">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="8xp_7t2">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="jgpd5.7">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid=":wyr8rr">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="st7lrhc"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="00hevj6"
                            >
                                <div className="mb-4" data-oid="bgxzp5.">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="ivlp2jy"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="yot:lle">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="t1dslzd">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="0rs422:">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="hoxe598"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="ml8k19:"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="qtjl54o"
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
                    <div className="text-center py-12" data-oid="bte:tb3">
                        <div className="text-6xl mb-4" data-oid="so21-ki">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="rvwxqv9">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="pvseo9u">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="viivbsd"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
