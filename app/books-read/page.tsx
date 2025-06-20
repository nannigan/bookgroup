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
            data-oid="091ndy:"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="lfysrms">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="o._fa.7">
                    <div className="flex items-center justify-between" data-oid="kqqm7f0">
                        <div className="flex items-center space-x-3" data-oid="at9rs95">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="dnd8fk3"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="oa9eiv9"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="4dwi9lc"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="xdzw53b">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="0hp7f-m"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="of6716.">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="_ih-_en">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="von7y6h"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="tf9:cip"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="44el-hy">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="y30sjck"
                >
                    <div className="text-center" data-oid="f8r56-o">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="c:layiq">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="ij_ljs_">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="d0nkggk">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="0t_ku_d"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="fbp95lz"
                            >
                                <div className="mb-4" data-oid="tqfxpen">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="vgnri5k"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="t1hmtfd">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="h3v9d4a">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="5m6ahws">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="0x6ri8p"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="rv0yky8"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid=".c3sui2"
                                            >
                                                "{book.comment}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12" data-oid="890q732">
                        <div className="text-6xl mb-4" data-oid="04gtwcs">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid=":soodvh">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="lhxnn47">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="3n7jh23"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
