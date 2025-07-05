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
            data-oid="5cr1k2r"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="cv5z42m">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="2lu5_ii">
                    <div className="flex items-center justify-between" data-oid="im-vd_y">
                        <div className="flex items-center space-x-3" data-oid="yc:p5:-">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="z.b93ao"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="ou1ukzh"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="i73izvx"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="zzx26oi">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="1g9-hkl"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="-knbfql">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="bj8h3be">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="9:0-:59"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="o7idhsu"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ujj9boz">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="9q.vdee"
                >
                    <div className="text-center" data-oid="zuidjex">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="1caanqi">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="-agtocy">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="wnyu8wi">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="v.p6la5"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="27r-07."
                            >
                                <div className="mb-4" data-oid="mmw1wg8">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="7iw8jty"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="obtzj8i">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="zql8qnr">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="9v8e9u0">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid=".t0dey9"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="asuvenb"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="9avs6k3"
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
                    <div className="text-center py-12" data-oid="dnff6o_">
                        <div className="text-6xl mb-4" data-oid="p87q30z">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="5:ago4z">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="sfysa-k">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="b76rwbv"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
