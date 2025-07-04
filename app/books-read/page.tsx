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
            data-oid="3.q0nq-"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="_4pe59l">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="8-nxkcf">
                    <div className="flex items-center justify-between" data-oid="n6tu_8a">
                        <div className="flex items-center space-x-3" data-oid="fusciz.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="0f58bx."
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="_gm.0_j"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="a6r6hxz"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="ax82_ao">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="0a8.i7g"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="xmso_pr">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-veoxh9">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="s:o0epe"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="o567_fa"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="pdbntgj">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="k61vd04"
                >
                    <div className="text-center" data-oid="pbyps_y">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="yvqewm6">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="cnfa:s3">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="_o01ibt">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="kaqr971"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="ue:_.9q"
                            >
                                <div className="mb-4" data-oid="6wc89xt">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="oxkgeg4"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="kfupkj6">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="yq_nys1">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=".ed0m3q">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="-pcfx8d"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="-4x8qsw"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="oti7:0r"
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
                    <div className="text-center py-12" data-oid="d-ubet7">
                        <div className="text-6xl mb-4" data-oid="fh4lsed">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="u-maawg">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="ygd1amg">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="5415ocn"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
