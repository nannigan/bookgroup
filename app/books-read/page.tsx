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
            data-oid="iqevti7"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="4s0b-:8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=".i56eu1">
                    <div className="flex items-center justify-between" data-oid="dh6u7f9">
                        <div className="flex items-center space-x-3" data-oid="auxdxf4">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="38hx.-7"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid=".kfpgza"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="zg9l95l"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="axv2-7z">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="1_2-g3o"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=":-ysli1">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="18s8z6v">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="t6z15i-"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="9rqg8fn"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="a_zme:k">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="_yf2.aq"
                >
                    <div className="text-center" data-oid="pd5_4m6">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="n1piquz">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid=".3rcrrt">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="j:81eo6">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="lapw297"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="8fqcd:9"
                            >
                                <div className="mb-4" data-oid="xa1k64h">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="wlwtemh"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="7m96d01">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="si1dn9c">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="sx-5id:">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="oq5vhsv"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="y3j0l9:"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="4bhea6a"
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
                    <div className="text-center py-12" data-oid="eu9t:.q">
                        <div className="text-6xl mb-4" data-oid="1bk:g97">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid=".x.1qtm">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="nqwt:g2">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="g8lm46f"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
