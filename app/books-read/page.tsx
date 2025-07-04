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
            data-oid="d6cz2ah"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="38m3653">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=":xd137n">
                    <div className="flex items-center justify-between" data-oid="7j-y:c.">
                        <div className="flex items-center space-x-3" data-oid="nqt_kr1">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="ru.92e7"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="c.wt9y9"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="k2rw41x"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="rn:l1bk">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="hgy3:7l"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="evfqad_">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="x-g---x">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".f66rmi"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ic4l2tn"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="0fp:lgh">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="irf4oc:"
                >
                    <div className="text-center" data-oid="u8y8dzo">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="rvu09lx">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="ob44om6">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ipy6yp8">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="a29o0ho"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="vfpof.n"
                            >
                                <div className="mb-4" data-oid=".gfga5c">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="5k0rh67"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="emow2i:">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="1l193m_">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="ybo9-7a">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="rv6_t4q"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="p6o_hcw"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="fp93l0."
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
                    <div className="text-center py-12" data-oid="qsmfo-8">
                        <div className="text-6xl mb-4" data-oid="i2vji1t">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="_fqc297">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="uj952fh">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="e1.o5s0"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
