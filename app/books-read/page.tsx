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
            data-oid="__ri0bj"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="sj0r_79">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ji3h_jx">
                    <div className="flex items-center justify-between" data-oid="3:vo8zv">
                        <div className="flex items-center space-x-3" data-oid="6n2s90y">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="nv7b0nx"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="he3gc8_"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="7aa36m8"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="b9g8mv1">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="5ew5kkk"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="9j-gmye">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="33nr-5l">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="oc663xf"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="4b1lv00"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="5_nixtm">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="w7w40w1"
                >
                    <div className="text-center" data-oid="p90fk-8">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="l29.n:b">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid=":use3ql">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="sad.gw0">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="weaqtiz"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="s1v0eye"
                            >
                                <div className="mb-4" data-oid="1n6d465">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="8awlc_2"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="nwd4-_t">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="qfyes3y">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="jy8w:fm">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="lhr4lkq"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid=".t:jwpq"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="x22j06v"
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
                    <div className="text-center py-12" data-oid="lursrfm">
                        <div className="text-6xl mb-4" data-oid=".ipy:rt">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="uur.i3u">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="sc2w_70">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="z8h7-s:"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
