'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function BooksReadPage() {
    const [books] = useState(initialBooks);
    const readBooks = books.filter((book) => book.status === 'Read');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100"
            data-oid="h803spr"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="snkmgb2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="w7wxrre">
                    <div className="flex items-center justify-between" data-oid="sfowh0w">
                        <div className="flex items-center space-x-3" data-oid=":nb78e0">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="gbj5al_"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="juof2la"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="vqv9guy"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="v:d4mop">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="jr0xmsb"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="i1tc2cn">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="rgtvwwa">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="1jvad-h"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ekmhv3s"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="9zc:ywq">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="jh80w.t"
                >
                    <div className="text-center" data-oid="u6y4d32">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="hbkeocb">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="eot3g5n">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="yez3cke">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="l_scnhv"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="ou5wfco"
                            >
                                <div className="mb-4" data-oid="ot3g1up">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":x1v40y"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="o4oxn6g">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="y_ikkfi">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="0.jpe4l">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="524z29y"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="bb8c7-g"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="ug:b_23"
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
                    <div className="text-center py-12" data-oid="6py:gsb">
                        <div className="text-6xl mb-4" data-oid="4:7uvei">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="j14wjxv">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="k2l565a">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="-.erpe."
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
