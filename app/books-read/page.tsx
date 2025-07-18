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
            data-oid="hp0.ole"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="gthgh59">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="pzlkzbv">
                    <div className="flex items-center justify-between" data-oid="ga3nw:l">
                        <div className="flex items-center space-x-3" data-oid="o90av.f">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="tfbn4zq"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="wveaq9c"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="_8zisj_"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="mw5nj:a">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="jb-x3p5"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="-r75m04">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=":83huoe">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="h:c58pl"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="hxr-a7d"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="sk1trhk">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="-pwas7h"
                >
                    <div className="text-center" data-oid="m7q.1t:">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="jzo1j.j">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="q4g9cwa">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="1:fg-di">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid=":vcmlz_"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="c:7hp-n"
                            >
                                <div className="mb-4" data-oid="xx7a3wc">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="5znwbx_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="57f9vvp">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="b67kx7w">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=".y2_-a:">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="79hit4n"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="7y1j.7s"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="y5kbd_m"
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
                    <div className="text-center py-12" data-oid="-kyd1.h">
                        <div className="text-6xl mb-4" data-oid="__ii:zu">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="l5zj5xc">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="fx3m3kj">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="de4q9om"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
