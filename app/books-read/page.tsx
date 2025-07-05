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
            data-oid="9o6hlso"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="bz971:-">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="g4d07.w">
                    <div className="flex items-center justify-between" data-oid="mia:ux0">
                        <div className="flex items-center space-x-3" data-oid="gy4efw:">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=":oczs2f"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="hsz5m8x"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="4gq8qk7"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="ynakmjn">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="5sjh9r6"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="mun07ij">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=":b.ozn4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="hrtsulz"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="48q_656"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="xo2pstw">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="9o83oen"
                >
                    <div className="text-center" data-oid="kbfcbzl">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="tbpqf_q">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="ar4o7i:">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ouex2zi">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="-a6f9pd"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="j91-f:w"
                            >
                                <div className="mb-4" data-oid="qd0ro3:">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="p:iaom:"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="2p::lng">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="t0fz924">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="27doxi7">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="0bq2c7i"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="gjs85w."
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="-jkk39g"
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
                    <div className="text-center py-12" data-oid="-r6z2m:">
                        <div className="text-6xl mb-4" data-oid="n1gi:ly">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="2vc88jc">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="yukcrtr">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="lxjhe86"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
