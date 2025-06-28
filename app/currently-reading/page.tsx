'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="xf-cdcm">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="ogymmx7">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="mk8pxp3">
                    <div className="flex items-center justify-between" data-oid="j8e9iz3">
                        <div className="flex items-center space-x-3" data-oid="vryuj-f">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="t:_qzz1"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="pw1uwwo"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="3f982t0"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="e6wvi.2">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="aw:038h"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="pe1uoq.">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="1nw4ted">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=":lk_rqq"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="x491ica"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="me2q31i">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="ysr7g9x"
                >
                    <div className="text-center" data-oid="me-:fz:">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="2.gtnp9">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="w:cb46n">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="fog0hjj">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="qj6wq83"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="yonbbtk"
                            >
                                <div className="mb-4" data-oid="_-720sz">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_9p-::w"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="9spvvho">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="nhg2ys_">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="oywnlig">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="dfat9f8"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="p2vwvja"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid=":h7dk:b"
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
                    <div className="text-center py-12" data-oid="rtz6upl">
                        <div className="text-6xl mb-4" data-oid="hcdr0t:">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="0:lnot7">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="urxlnhc">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid=":44yekb"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
