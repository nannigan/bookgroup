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
            data-oid="sbbtc6e"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="9_4chqq">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="-3rjwd_">
                    <div className="flex items-center justify-between" data-oid="4bg9nbf">
                        <div className="flex items-center space-x-3" data-oid="ixkphsn">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="nb95hb9"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="qrwu1zg"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ao9v6kk"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="iah:7xb">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="423c4-3"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="cwap4:g">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="3_9swjr">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="vfwrdoi"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ewrxtcl"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="lakhqbt">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="t_0zdoo"
                >
                    <div className="text-center" data-oid="c8-1017">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="b0us9:4">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="63wo6c5">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ejwjlos">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="srwemfo"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="3q:8mf5"
                            >
                                <div className="mb-4" data-oid="cef_ca4">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="6949sxg"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="z.yyvgo">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="i:estcw">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="gb1p9_s">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="xg1o15."
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="-v7xhoq"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="0:rqtc4"
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
                    <div className="text-center py-12" data-oid="lsnzgew">
                        <div className="text-6xl mb-4" data-oid="sai40m-">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="g3_.uwr">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="9o58a8-">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="wwg:oy9"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
