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
            data-oid="oh75ere"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="omrj0cq">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="-:wibel">
                    <div className="flex items-center justify-between" data-oid="zlu4awz">
                        <div className="flex items-center space-x-3" data-oid="4h.ad0u">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="8qie-30"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="ufjzh2j"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="9_k1bcr"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="5migzi-">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="a117sfa"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="snodybk">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="i4nsw8_">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="37v6s10"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="y-871.r"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="1y6-ez9">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="gf0g3:u"
                >
                    <div className="text-center" data-oid="ogmd27i">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="6b0f8j9">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="s0-jz10">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="6xxf_up">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="97e9s07"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="cw27s92"
                            >
                                <div className="mb-4" data-oid="nlc29m2">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="8k-5y1n"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="hbuyg65">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="u7.nst.">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="nxjkzzr">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="p0a3x35"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="kn11ub1"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="rfoioc8"
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
                    <div className="text-center py-12" data-oid="wy7n7-1">
                        <div className="text-6xl mb-4" data-oid="_2ik2iz">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="fzdfy3_">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="vbm74bt">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="d9d1hzs"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
