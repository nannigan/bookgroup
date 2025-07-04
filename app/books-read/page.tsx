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
            data-oid="a-:ag9q"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="lq:jzok">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="i5ctjf4">
                    <div className="flex items-center justify-between" data-oid="h-c-yvz">
                        <div className="flex items-center space-x-3" data-oid="0ueugrx">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="ar5bj2."
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="t5nnl9_"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="altt_uc"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="066cpml">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="y1ud433"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="qjut35b">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="kkpqz8c">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="aqd2jok"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ijg25c-"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="jon0bz2">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="ygomo81"
                >
                    <div className="text-center" data-oid="2_rh_eq">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="qtlfb4w">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="rzi3kpz">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="u-o26.v">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="1wo0ymc"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="4m_3fg0"
                            >
                                <div className="mb-4" data-oid="83k:9ki">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="jk3yj.9"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="kf-01rx">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="r7i7ay2">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="ekbtabx">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="gjs.5fj"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="goz7k12"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="bhx:skd"
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
                    <div className="text-center py-12" data-oid="_deh38f">
                        <div className="text-6xl mb-4" data-oid="o688v46">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="upfiaet">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="frc4hu7">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="0p8p5c:"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
