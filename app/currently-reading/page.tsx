'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="k7btr.m">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="zq7_2r8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="gca7e4u">
                    <div className="flex items-center justify-between" data-oid="2o.okhs">
                        <div className="flex items-center space-x-3" data-oid="a038iq5">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="hbw23pm"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="x8pqi9h"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="byzecqp"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="3l4i968">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="0p.y15q"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="g9j1:j3">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="xts_img">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="msaeuax"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="0xoybtq"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ari-3ku">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid=":04u23t"
                >
                    <div className="text-center" data-oid="u._dv-:">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="pitr43r">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="lxr8zax">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="xyhulrh">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="vo4ndpo"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="6vh9yjo"
                            >
                                <div className="mb-4" data-oid="1y26rvt">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="5gd9z7z"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="tdt6_k8">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="bonimyd">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="jakclc3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="hv-2945"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="kquyzqp"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="vf5m:xw"
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
                    <div className="text-center py-12" data-oid="g01q0p7">
                        <div className="text-6xl mb-4" data-oid="vtenw1l">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="n2fglpp">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="3eez-5i">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="9h9_ah5"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
