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
            data-oid="_zybmww"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="g35sb4c">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="6li5q4r">
                    <div className="flex items-center justify-between" data-oid="r69xc.o">
                        <div className="flex items-center space-x-3" data-oid="s8nikia">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="4sfnb46"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="3965can"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="_v452qj"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="prkinhd">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="fqjay1j"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="b6qc2-s">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="0cbxi9s">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="26mbevv"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ra8lbg5"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="s63kkkg">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="5g.6c4l"
                >
                    <div className="text-center" data-oid="bk3dhqk">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="710vvo9">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="yigsnhq">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="saa-t:3">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid=":qkyod8"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="x1s-bwt"
                            >
                                <div className="mb-4" data-oid="x1x3lsw">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="j80zaeh"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="p3lydkv">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="sumkevu">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="3oew-92">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid=".a:rcbn"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="ztmrv9:"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="5w6bmsl"
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
                    <div className="text-center py-12" data-oid="w0nbar5">
                        <div className="text-6xl mb-4" data-oid="1pppbvq">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="037-szh">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="r-aa1jx">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="h3enej4"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
