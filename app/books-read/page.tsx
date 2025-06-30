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
            data-oid="fxvu3q4"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="w5rcksa">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="wpb063i">
                    <div className="flex items-center justify-between" data-oid="w_raxx-">
                        <div className="flex items-center space-x-3" data-oid="70pi:ve">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="f.5.5e8"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="qrfy7:j"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="22wa.4i"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="vta0mxu">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="sk3ku7s"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="-lmp9gk">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="_0:w9q:">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="fj6.ng1"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid=":8w8.dr"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="y.wuob5">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="9wbh91t"
                >
                    <div className="text-center" data-oid="36yj1hr">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="3o8b62j">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="6uo-uqu">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="zrbla34">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ec9pi8i"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="sitq.wg"
                            >
                                <div className="mb-4" data-oid="k.by6-i">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="urbw1hg"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="mx..22e">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="ohfb8bu">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="omgju33">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="sougfw3"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="6_8sgea"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="el.n:xi"
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
                    <div className="text-center py-12" data-oid="kyyb7j-">
                        <div className="text-6xl mb-4" data-oid="0je4awt">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="g93rbho">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="dxrrio1">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="c7yf266"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
