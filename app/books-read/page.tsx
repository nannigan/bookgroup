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
            data-oid="5qxufsu"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="0.7xv6s">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="pvot_f1">
                    <div className="flex items-center justify-between" data-oid="nn4tzxi">
                        <div className="flex items-center space-x-3" data-oid="6i0i-g.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="5k9fg52"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="hqumbyz"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="k2guf7n"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="6ckd6qg">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="m7xj8p9"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="p5nie-q">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="qrz:iii">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="wfcgee_"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="yc3nbre"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="d65epvy">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="5bz4ltu"
                >
                    <div className="text-center" data-oid="q8ytsc7">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="636fl43">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="om-kj7d">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid=".jrrtfa">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="8fov2-5"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="bqrwf76"
                            >
                                <div className="mb-4" data-oid="68u_j76">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="h1s3.66"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="mnpj0fu">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="zk7vnoj">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="y41t7_q">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="k.m4d0u"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="x8f-6_d"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="48rh6ms"
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
                    <div className="text-center py-12" data-oid="dlmh2vo">
                        <div className="text-6xl mb-4" data-oid="pp649j4">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="j0_c.n5">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="_mr98kl">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="yrlt8xa"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
