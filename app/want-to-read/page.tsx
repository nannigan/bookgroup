'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function WantToReadPage() {
    const [books] = useState(initialBooks);
    const wantToReadBooks = books.filter((book) => book.status === 'Want to Read');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100"
            data-oid="99_9uv2"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="hb0sk06">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="5ycdbuf">
                    <div className="flex items-center justify-between" data-oid="s7borif">
                        <div className="flex items-center space-x-3" data-oid="l6.fp9p">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="1:kq7g0"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="hz5-d:e"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="zl1_1ms"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="hqb_wta">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="jlxgkn."
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="4gmn0xf">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="4vjtw4z">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="_h-x4nm"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="bhq2mqo"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="04vzl5.">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="s1f7stw"
                >
                    <div className="text-center" data-oid="ze97uvr">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="s4lkm06">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="jfylf.:">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="zqzo_r7">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="wyn34_0"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="z-nh._9"
                            >
                                <div className="mb-4" data-oid="6.kqwgg">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="0b2_u60"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="bzw9-g2">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="11.2.34">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="g9ytnr4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="0uv7:6m"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="nk:mqcs"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="4g7qxot"
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
                    <div className="text-center py-12" data-oid="j.frqgq">
                        <div className="text-6xl mb-4" data-oid="0k_n6rb">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="_._b795">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="u5yr0b1">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="u99xt:b"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
