'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="_q85d85">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="z1vanfj">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="9dcr8dk">
                    <div className="flex items-center justify-between" data-oid="7etf0s:">
                        <div className="flex items-center space-x-3" data-oid="ylva5lc">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="vb2bul1"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="a4f9.1-"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="bu.v-66"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid=":7clvc3">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="3l.n_iw"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="v8yx35s">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="acv7yu6">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="4u7k4z2"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="9xnfg3c"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="nlcn-yq">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="6rlylvg"
                >
                    <div className="text-center" data-oid="qebc3lx">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="n_uaxg9">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="7xtoprp">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="1zimv:x">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="lwbhfzd"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="7lbarwe"
                            >
                                <div className="mb-4" data-oid="ux9r0pv">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="rbf6bg-"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=".3.yk1g">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="ss7jhkr">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="hyv6s.n">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="15eec:p"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="gl5zr0k"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="vwn9zf-"
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
                    <div className="text-center py-12" data-oid="92thtmk">
                        <div className="text-6xl mb-4" data-oid="u95.0e3">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="gj:xf3k">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="t3jlwp5">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="67qj.52"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
