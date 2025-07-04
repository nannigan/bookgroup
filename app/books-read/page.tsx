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
            data-oid="6eu5aa5"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="6.ffjee">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="59d-vmm">
                    <div className="flex items-center justify-between" data-oid="3m_zed-">
                        <div className="flex items-center space-x-3" data-oid="tfgw3y:">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="nojygci"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="t0a2drm"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="6pcbn9i"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="pb3gz1p">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="1b_0x1."
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="g8kag14">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-0nqlwy">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="-.s82sl"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="zmfdib0"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=".-8.s_g">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="fughbdr"
                >
                    <div className="text-center" data-oid="62kg97e">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="pdjmb95">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="t0k7_f7">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid=":k1ze4:">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="znmi9:j"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="gsohw:0"
                            >
                                <div className="mb-4" data-oid=":v583.1">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="sdd-6:3"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="ce015:u">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="3p1bqdz">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="p9p6jc:">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="k5o4se:"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="47:txfy"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="2et9bri"
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
                    <div className="text-center py-12" data-oid="gh3n2fe">
                        <div className="text-6xl mb-4" data-oid="fgeo2ar">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="mxe-7n0">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="ur7cw0f">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="hwar7vz"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
