'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="o2dpq8l">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="q1nqupi">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="we7wbx4">
                    <div className="flex items-center justify-between" data-oid="pc8kkj:">
                        <div className="flex items-center space-x-3" data-oid="5q8r9cf">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="nhcfk2v"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="mfc:r.6"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="0exggpq"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="a_w3s10">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="2kpsqew"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="uif05cp">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="9wz.f.3">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="bcvmckq"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="jpwwv_d"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ze:_b0r">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="7zfjak3"
                >
                    <div className="text-center" data-oid="gjevsd2">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="rc.:781">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="5ib.de.">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="9::rr9k">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="0rfgfjd"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="n1vjkky"
                            >
                                <div className="mb-4" data-oid="1w-armt">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="i4k7-o6"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="78normw">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="3m77p3:">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="np_cvjx">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="xz36tzy"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="fy46ltq"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="0fux_zz"
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
                    <div className="text-center py-12" data-oid="0pcpuer">
                        <div className="text-6xl mb-4" data-oid="lwod1.l">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="mn9ety.">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="4-cuab:">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="av5vlsz"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
