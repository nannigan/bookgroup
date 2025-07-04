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
            data-oid="iomy7lo"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="i5ousci">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="h2r7w4v">
                    <div className="flex items-center justify-between" data-oid="9-q1dzv">
                        <div className="flex items-center space-x-3" data-oid="p73.hs:">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="gq99366"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="jur1lhd"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=".qr556w"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="qxz6lrk">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="i261-_-"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="q_6_qjb">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-w4lnv8">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="8dhos4r"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="v6y3py3"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="vwinu.u">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="n_pxbtc"
                >
                    <div className="text-center" data-oid="whs_igp">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="az09w0t">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="x4wroc5">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="zy1iq-w">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ux43_t5"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="--mc5r6"
                            >
                                <div className="mb-4" data-oid="_wr2qaa">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="qy_rmp_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="46g5v:4">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="i9_erny">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="vofs0uh">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="b:m-a99"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="cbza:i_"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid=":nui78z"
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
                    <div className="text-center py-12" data-oid="b4cea-2">
                        <div className="text-6xl mb-4" data-oid="vn0e90c">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="9al96gg">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="kfx7-wv">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="9u71q_0"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
