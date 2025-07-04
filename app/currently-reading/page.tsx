'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="vpkgj2n">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="kk3.e01">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="oa.9sn8">
                    <div className="flex items-center justify-between" data-oid="pl-a4kh">
                        <div className="flex items-center space-x-3" data-oid="m6sxi.t">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="g4p2zue"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="qjohz8p"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ipzb__o"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="7zso3pk">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="s.ludqy"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="n8l.jub">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="h9v_w6t">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="ynu9kzm"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="xo1wj8_"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="bwmkafj">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="dfq83_x"
                >
                    <div className="text-center" data-oid="fj8uyyw">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="bpvcl:k">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="8ckcoz8">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="0w7i2.f">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="5lwtgij"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="bxl56db"
                            >
                                <div className="mb-4" data-oid="9tph:63">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="5c9.q::"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="3liumj1">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="mjdch1:">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=":h2i:_q">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="hil0-.e"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="cib10mt"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="9oo-7ur"
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
                    <div className="text-center py-12" data-oid="ckza7xe">
                        <div className="text-6xl mb-4" data-oid="l1w7bly">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid=":4-s:-.">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="3o:ux5g">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="4pbiie0"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
