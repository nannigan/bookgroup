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
            data-oid="j2d9g3d"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="heoyw6f">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="nqmkbqr">
                    <div className="flex items-center justify-between" data-oid="s6ldm6.">
                        <div className="flex items-center space-x-3" data-oid="76kyi6t">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="93bvagv"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="i1qwa:q"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ie121h7"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="l:e0f9s">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="jaoycy5"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="xvaivi_">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="usr23zj">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="m_vbu1f"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid=":n6d80z"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="lyxm1mr">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="o_go64v"
                >
                    <div className="text-center" data-oid="u1__.pe">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="10d_9o1">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="k0hvt2y">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="bg.cu3v">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="q2f-kgg"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="yixsam."
                            >
                                <div className="mb-4" data-oid="ccthz:q">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="-k6upiz"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="lxh29.1">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="3pwrnha">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="n_xcrbh">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="o2-siky"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="-ajh9h1"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="558anj7"
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
                    <div className="text-center py-12" data-oid="r-zmya2">
                        <div className="text-6xl mb-4" data-oid="c1jpjea">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="pwp80yh">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="guts8ag">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="htoowy4"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
