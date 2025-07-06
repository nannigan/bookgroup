'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="7ppvnin">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="r0e1-xp">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="eol2w:w">
                    <div className="flex items-center justify-between" data-oid="f:4d4wp">
                        <div className="flex items-center space-x-3" data-oid="w8y9g6r">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="k959fnp"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="rcersa8"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="p58jozf"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="dr:t2m_">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="icxwma0"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="q_oobn-">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="qfhb-lj">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="0nfuubc"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="6pvix9h"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="880fpg.">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="i370yxn"
                >
                    <div className="text-center" data-oid="t5i9xbs">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="b1icl6s">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="xzn.tk_">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="88zd:wl">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="5m.41ls"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="0ka-i92"
                            >
                                <div className="mb-4" data-oid="c3jfxx8">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="v.avnuo"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="8-2gj16">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="pn_-ece">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="o:_tu_f">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="wmfv7nm"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="urs_gti"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="4eefmnx"
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
                    <div className="text-center py-12" data-oid="mt9mtk0">
                        <div className="text-6xl mb-4" data-oid="age9_g5">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="un99kke">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid=".histcf">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="92l74qo"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
