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
            data-oid="t76slue"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="7dv.ij7">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="_qe1ag1">
                    <div className="flex items-center justify-between" data-oid="jko8zob">
                        <div className="flex items-center space-x-3" data-oid=".5cdjg8">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=":n77tkq"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="v9_.iqv"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="i3k88fg"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="jmh5gq4">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="5nhb0if"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="zipssji">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="nw69b14">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="h2xhkws"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="x7alh67"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="igingqx">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="ezd5lgr"
                >
                    <div className="text-center" data-oid="6ohigfm">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="7.__hh-">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="rxq:it8">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="qp44pgz">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ezzw4j7"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="zs3wc-1"
                            >
                                <div className="mb-4" data-oid="kk4rj7l">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="f2mg7ww"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="r.zak2q">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="125dv_0">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="k3i.k3.">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="yse7:g4"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="6cmg08n"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid=".y_okss"
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
                    <div className="text-center py-12" data-oid=":-w:6jc">
                        <div className="text-6xl mb-4" data-oid="kv-f4:.">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="0bhmvey">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="9fhih6:">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="ybt-4jp"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
