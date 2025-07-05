'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid=":v4ehdg">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="jv099.m">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="9nrnjzk">
                    <div className="flex items-center justify-between" data-oid="zih9-4s">
                        <div className="flex items-center space-x-3" data-oid="ojqsbo9">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=".i1eo3s"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="pnpvim-"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="pmxo8mg"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="6137bav">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="v1ev_68"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="or83ohl">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="kjayya0">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="hceqc4p"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="-6opy7-"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="lh9pr38">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="-v90apn"
                >
                    <div className="text-center" data-oid="vxcugcf">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="3:-h34d">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="ygqpubg">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="kbk:k:u">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ft9.f19"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="_ksqdyn"
                            >
                                <div className="mb-4" data-oid=".cv8985">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="q_-7ylf"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="9sgju_j">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="2ylfsh-">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="rs5ita7">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="hf5bi1r"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="6x3d6o7"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="82sg-1-"
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
                    <div className="text-center py-12" data-oid="m:11561">
                        <div className="text-6xl mb-4" data-oid="qeqi4hg">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="92gh5xs">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="q13s7ym">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="1ayxp0h"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
