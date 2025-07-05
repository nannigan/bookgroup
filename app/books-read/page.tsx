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
            data-oid="2zjiwe7"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="q3y4u_0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="r.-9v7q">
                    <div className="flex items-center justify-between" data-oid="au_i6r7">
                        <div className="flex items-center space-x-3" data-oid="w6u.spl">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="9vrwowj"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="jg5g_8y"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="dix8qfu"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="vn8fwg2">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="f52nq0j"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="chrvh4g">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=".jku4.c">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="h3cb_eg"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="zjk2p55"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="9xmzlt2">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="pl4b8pd"
                >
                    <div className="text-center" data-oid="sya30iu">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="ghzhpo6">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="8_ivjbw">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="q77-300">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="qoaynf4"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="63jy086"
                            >
                                <div className="mb-4" data-oid="lzp0u1a">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":afnwz."
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="au1ck2w">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="5k3www:">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="7rfw2v7">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="yq9:r39"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="770phmy"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="rspdbkz"
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
                    <div className="text-center py-12" data-oid="co5ys76">
                        <div className="text-6xl mb-4" data-oid="v08_dso">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="5y9_68y">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="9foz-zh">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="xahpq86"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
