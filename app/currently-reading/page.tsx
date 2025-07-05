'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="-_33z_v">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="gfdvlap">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="fo92pvo">
                    <div className="flex items-center justify-between" data-oid=".26bph5">
                        <div className="flex items-center space-x-3" data-oid="8nn.ozz">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="y7e3103"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="6ceje5p"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="kk6-64w"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="lnleyx6">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="0j-b6hz"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="p:_a21.">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="ziwwcpa">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="xfl_:u9"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="4npn-bk"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="m6s19r9">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid=":8xyl.e"
                >
                    <div className="text-center" data-oid="0vm:b8i">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="6jbsn:g">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="71ev4m9">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="4xjcd4x">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="sin4yrw"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="e4n605."
                            >
                                <div className="mb-4" data-oid="3qwmowh">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="jb3h:it"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="98-xso9">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="6ipzlxk">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="fg1uenu">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="1dymscl"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="d77a9:5"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="nebstfe"
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
                    <div className="text-center py-12" data-oid="y2meblw">
                        <div className="text-6xl mb-4" data-oid=":zl35vi">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="j9i-sns">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="z_k0wx_">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="h6:sm2g"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
