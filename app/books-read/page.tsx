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
            data-oid="1v:.lfg"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="-hlqyr3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="-iz8hk8">
                    <div className="flex items-center justify-between" data-oid="if:83ju">
                        <div className="flex items-center space-x-3" data-oid="6c_8q-h">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=":rfja4h"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="8r_d_1y"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="_y0ofv_"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="p1lasv3">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="jygc69a"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="8i1yvwq">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="83zpa45">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="m7sr4oa"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="bg1sih_"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="010ap_k">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="pdisjtt"
                >
                    <div className="text-center" data-oid="2egc.q-">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="2350ngp">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="62-1und">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="u0oew.l">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="jw7d8:b"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="e5ezmnh"
                            >
                                <div className="mb-4" data-oid="nz0h8-a">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="-omwp_f"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="vsgnay.">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=".ni3f1m">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="h5yr0gf">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid=":cps8cf"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="bfwp148"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="tye7891"
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
                    <div className="text-center py-12" data-oid="3c1_d92">
                        <div className="text-6xl mb-4" data-oid="j4ql2c4">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="yr7a3ua">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid=":co4y:i">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="7s7m-28"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
