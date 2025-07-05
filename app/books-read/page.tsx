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
            data-oid="ocr6q.b"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="k8xwfex">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ck28nmq">
                    <div className="flex items-center justify-between" data-oid="m9a.8bt">
                        <div className="flex items-center space-x-3" data-oid="gcdf-8e">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="miapuo6"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="xpdf:jx"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="6_yy2v_"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="t:g00hc">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="zv29k4h"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ss059e_">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="6k6w9fg">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="7k80w3f"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="wa2y3f6"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="nelfcd2">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="e6h50ad"
                >
                    <div className="text-center" data-oid="6gtskrj">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="d8gfpg5">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid=":qwlcf-">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="184tng:">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="kuy_qp7"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="kzp:2un"
                            >
                                <div className="mb-4" data-oid="5rhqqdh">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="hfq98jb"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="uu-4jah">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="2mwve56">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="5ao-zuf">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="t9.w.0v"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="ngipbfn"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="s-nu79p"
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
                    <div className="text-center py-12" data-oid="9w1.mz2">
                        <div className="text-6xl mb-4" data-oid="o7ng8hd">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="xzw:ri2">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="rxqz0jf">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="sszp82u"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
