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
            data-oid="fw6.39d"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="n3wx6el">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="vj8e0my">
                    <div className="flex items-center justify-between" data-oid="fjuilht">
                        <div className="flex items-center space-x-3" data-oid=".19tyiq">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="t4rl7cp"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="mfxnvcs"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=".70:ay0"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="e8_0nrb">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="yykzc26"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ueik9_c">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="4qvpnxk">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="-vl8or_"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="21zwn.m"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="-f3oahy">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="4lhchcz"
                >
                    <div className="text-center" data-oid="poh-ygw">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="zvewi0t">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="__2o9z3">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="a-6ewe7">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="nhqib9q"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="nhfj-dj"
                            >
                                <div className="mb-4" data-oid="7hcdbsk">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="h_7imt1"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="2oe:cce">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="g64p81u">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="lm:jr3h">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="hbq_uvj"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="9_wcwzv"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="nqh0r:8"
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
                    <div className="text-center py-12" data-oid=":nj9gm1">
                        <div className="text-6xl mb-4" data-oid="_2fs628">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="c_enahb">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="f0jivsh">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="87axrrt"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
