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
            data-oid="n7db9zz"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="8_qebx9">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="h2oyl4p">
                    <div className="flex items-center justify-between" data-oid="gx3nysd">
                        <div className="flex items-center space-x-3" data-oid="be1m-wc">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="svlegu7"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="x08d0sk"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="t6mtyv0"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="su4-8nx">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="g62p5l_"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=":.74zp.">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="l6-6:q4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="4bjz9o2"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="h5aiaa6"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="zqzdzhq">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="_wp7lnr"
                >
                    <div className="text-center" data-oid="vxchub0">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="wahguvv">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="qaq-c--">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="uk.9pvm">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="fi70p2j"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="klibodw"
                            >
                                <div className="mb-4" data-oid="hk41i.m">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":4138zp"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="wc:ucyx">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="dshg8m0">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="f8nveun">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="9_o12s6"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="x60nkpv"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="a-aqs.4"
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
                    <div className="text-center py-12" data-oid="0.-e24k">
                        <div className="text-6xl mb-4" data-oid="8.9uo1t">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="s:td2s1">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="np1q6u4">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="mw9l84n"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
