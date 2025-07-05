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
            data-oid=":28q7ph"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="cgf6txa">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="j49stjv">
                    <div className="flex items-center justify-between" data-oid="qj6.9bl">
                        <div className="flex items-center space-x-3" data-oid="j879yqy">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="now2vsw"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="3_ykh.d"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="l17oic_"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="8-g_c7-">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="stnh-4s"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="pc3p_s4">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="7v_b-zt">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="ds04m47"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="cmj21hu"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="8y.0v9g">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="vnm7ia7"
                >
                    <div className="text-center" data-oid="ghhm1-.">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="pjiw4u6">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="1nc:5iq">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="nelj8wz">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="yxe6ggr"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="ukqg_h_"
                            >
                                <div className="mb-4" data-oid="s0mt3.v">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="zkzhoxr"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="r6a3nug">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=":817r7_">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="ftf4wlt">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="u3f0ia."
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="2zj_2fr"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="fdobxsv"
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
                    <div className="text-center py-12" data-oid="yya_02y">
                        <div className="text-6xl mb-4" data-oid="8sbx9bt">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="f-8icn1">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="mu_wii_">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="7:qyz0w"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
