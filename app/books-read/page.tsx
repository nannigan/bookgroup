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
            data-oid="efewfmw"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="l8dq-1e">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="2kgdbp:">
                    <div className="flex items-center justify-between" data-oid="bghzzum">
                        <div className="flex items-center space-x-3" data-oid="i4ozp06">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="yt.p7m_"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="f.9ev5z"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="khafmn7"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="7fc817p">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="1.f0kc8"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="r9l--aa">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="8p8uf:2">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="nl4d979"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="cm_8532"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="e7ew.gm">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="z3i25kx"
                >
                    <div className="text-center" data-oid="0ff-22u">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="m4f09yg">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="o84seo-">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="6o0tg--">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="r5cnvhs"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="c.n5k3e"
                            >
                                <div className="mb-4" data-oid="9ld68bm">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="if6:5y:"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="hxgq4ck">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="hi1431.">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="o:swqvt">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="44d:otg"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="8i-accp"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="9:-3b4t"
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
                    <div className="text-center py-12" data-oid="fgb9x9c">
                        <div className="text-6xl mb-4" data-oid="vtbgyvd">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="1b1_q45">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="_fn0o6d">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="4ts0b-k"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
