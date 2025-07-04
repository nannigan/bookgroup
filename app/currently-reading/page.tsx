'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="xu:__2i">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="lf-x3it">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="6nime-2">
                    <div className="flex items-center justify-between" data-oid="dly4g0e">
                        <div className="flex items-center space-x-3" data-oid="28cc2oz">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="t75l11x"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="zkucgx6"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="2x2-jb7"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="5r2i0z4">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="tunysxi"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ngf8-mf">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="rrsavi-">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="wutm46w"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="i48uoji"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="lntodgl">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="669yy:_"
                >
                    <div className="text-center" data-oid="x5-he7e">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="5hm0dvl">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="qps82nz">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="zdgiyh.">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="dgb9ond"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="sm.ckne"
                            >
                                <div className="mb-4" data-oid="uhn0:4m">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_rfvpc_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="i2kyza0">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=".7i4095">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="i9no5s4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="wfrnr7r"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="jau4aw:"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="inbv_hh"
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
                    <div className="text-center py-12" data-oid="kfuuoxj">
                        <div className="text-6xl mb-4" data-oid="9dab_op">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="q99v0:f">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="sqxl0yh">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="06bsh6h"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
