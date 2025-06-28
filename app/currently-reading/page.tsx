'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid=":5tsqmt">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="-tvu3yt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="cfju2_6">
                    <div className="flex items-center justify-between" data-oid="1:_95dr">
                        <div className="flex items-center space-x-3" data-oid="cyq.h-5">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="cq8q5aw"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="ni-jd29"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="-8u:50a"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="x49n1m8">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="9jbd:km"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="x0q_.w4">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="--5ifdy">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="xjnxuf:"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="xavqz-f"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="f-73t69">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="n3k9_fg"
                >
                    <div className="text-center" data-oid="o2xbyf:">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="bowyp_t">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="5_mmded">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="e8l0hwt">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="swrup5_"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="hjsnjj5"
                            >
                                <div className="mb-4" data-oid=":ik84.8">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_094:62"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="h0pkbqt">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="o:970u5">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="1uyq4j4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="7iuivcf"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="d178nmn"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="ecvw97o"
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
                    <div className="text-center py-12" data-oid="euafhg3">
                        <div className="text-6xl mb-4" data-oid="ol2.qr4">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="-wgmfck">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="9:ib-w3">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="q3p9bv1"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
