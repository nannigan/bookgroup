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
            data-oid="r7_wxgu"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="j6k-3k.">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="6zi8wua">
                    <div className="flex items-center justify-between" data-oid="fbumuha">
                        <div className="flex items-center space-x-3" data-oid="aibec3o">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="dj-fsvs"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="pg-k2-6"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="7feejct"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="srugb9:">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="ckp6n_p"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="blqx4mc">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="2cu0ma1">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="l9a0t_z"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ay9ff2i"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="iau2uv5">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="__.:8.d"
                >
                    <div className="text-center" data-oid="y.pn4lj">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="_5htmv0">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="xknyqjs">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="wnfuk4n">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="6sbl:qn"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="77oeta9"
                            >
                                <div className="mb-4" data-oid="77bq3i.">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="amnwbjf"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="sh22gq_">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="67xs61-">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="s90jym-">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="86a3i5v"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="vtvrunz"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="xu:2bd3"
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
                    <div className="text-center py-12" data-oid="p8oprsb">
                        <div className="text-6xl mb-4" data-oid="0js0mkr">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="s9wfduc">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="jmh2lkj">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="j5g3i7n"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
