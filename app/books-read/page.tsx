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
            data-oid="bhy7_z0"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="cba6aaa">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="uaybxge">
                    <div className="flex items-center justify-between" data-oid="pfs7q-e">
                        <div className="flex items-center space-x-3" data-oid="-1a2e.6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=":mw_akq"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="0y8o-:a"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="n.pobmz"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="i.nvhas">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="hqknwa5"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="u7fojy.">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="csa7p8x">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="c9y.bhf"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="h.fm9e1"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="1_p577z">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="zitjkz:"
                >
                    <div className="text-center" data-oid="kh7j39f">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="jhz.or-">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="didydh0">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="jpfx_ow">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="3zqq48m"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="b8-cu0y"
                            >
                                <div className="mb-4" data-oid="99wvsn_">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="7zxmy4z"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="p7d9359">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="-26olye">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="y-o8b72">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="bbr0zuz"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="04k5qwh"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="35a.jxw"
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
                    <div className="text-center py-12" data-oid="-og7:43">
                        <div className="text-6xl mb-4" data-oid="3616cr-">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="e6gc-t7">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="n5vh:ja">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="7nbbvi7"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
