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
            data-oid="kfiljun"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="kjvbq0o">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="t4z_qd2">
                    <div className="flex items-center justify-between" data-oid="t2rswth">
                        <div className="flex items-center space-x-3" data-oid="l01zj:m">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="r:3rkyb"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="0cdd81a"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=".z_pokg"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="xjda2ai">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="j-cf.vo"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="2bzpi6y">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="x9sigf3">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="qm-rjgk"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="n_juwfu"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="e8sm_d.">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="i-lrbvc"
                >
                    <div className="text-center" data-oid="3htirb0">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="zh:mwap">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="asin:8:">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="36zrnjj">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="5453:6f"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="mol9s1l"
                            >
                                <div className="mb-4" data-oid="sxow6.c">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="ye47rox"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="_oooiml">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="1bytqra">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="a6-pe:e">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="::2ar9u"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="bnbisj."
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="pkxgu_2"
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
                    <div className="text-center py-12" data-oid="wuof:xm">
                        <div className="text-6xl mb-4" data-oid="k7ip-z6">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="735k1an">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="8maqwwg">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="4:e3pst"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
