'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="xes-e2_">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="olxwryy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="87hq2ne">
                    <div className="flex items-center justify-between" data-oid="djjk4ru">
                        <div className="flex items-center space-x-3" data-oid="egv9auv">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="ntzd6:3"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="lw_cmi9"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="dlv0.sv"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="sfaj70.">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="2d447ok"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="vsh0qqt">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="eo009uq">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="z-r:tcj"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="qhmk.qz"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="518vqre">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="xwmoqhn"
                >
                    <div className="text-center" data-oid=".1:dacd">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="v6wpdyl">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="67v2gds">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="edl6ekb">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="0rz6pfv"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="z9qbiqp"
                            >
                                <div className="mb-4" data-oid="asplhso">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="-r88j15"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=".t-i7:g">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="hgst7bs">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="zo9ohww">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="43pyad6"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="h:arwlw"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="3z439ko"
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
                    <div className="text-center py-12" data-oid="8zrm2zw">
                        <div className="text-6xl mb-4" data-oid=":se-acy">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="72-m60b">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="heta56k">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="5ye4s9y"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
