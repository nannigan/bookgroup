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
            data-oid="8bmvmsh"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="xvmh0rf">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ig_yb5q">
                    <div className="flex items-center justify-between" data-oid="_4zwoof">
                        <div className="flex items-center space-x-3" data-oid="n6fza3a">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="k83yg6."
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="fybxirz"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="r9d.9g4"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="hnj7xqy">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="dn_yqtu"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="vqyhog.">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="dopeva7">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="mqf10x1"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid=":5zr_vb"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="n_k31zf">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="43qrh44"
                >
                    <div className="text-center" data-oid="ulqjzmv">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="an9f3qw">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="6_eynij">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="tp67kvx">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid=":-y8glw"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="7xln8jv"
                            >
                                <div className="mb-4" data-oid="cdim6g5">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="dzbi9a7"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="4t8lif5">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="8dkilj4">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="v5:nb.e">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="756t_hc"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="_zr5wqr"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="y2nkt:e"
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
                    <div className="text-center py-12" data-oid="rkq4tja">
                        <div className="text-6xl mb-4" data-oid="3-qaju8">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="ag372v4">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="a_::o:o">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="8jz1860"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
