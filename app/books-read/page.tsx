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
            data-oid="_vtk..b"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="i:f-5pq">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="lhs8gvp">
                    <div className="flex items-center justify-between" data-oid="q787uk8">
                        <div className="flex items-center space-x-3" data-oid="0v6qkss">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="n5oheag"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="mqps_qc"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ckqd72y"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="kn2mnn5">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="hq0seqi"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="nu8u4sh">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="6undcsh">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="3w7dzu3"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="dxn7-jv"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="gsbccv-">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="pqq2:es"
                >
                    <div className="text-center" data-oid="-1z17pm">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="-mcb-mc">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="4_owofh">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="hc34sj_">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="-xl72ku"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="v:tg6-8"
                            >
                                <div className="mb-4" data-oid="2c3..2s">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="bidsy73"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="z2qy8st">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="ki05ksg">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=".1c25ml">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="eume2di"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="w0uc-.-"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="8iedzdw"
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
                    <div className="text-center py-12" data-oid="vuo1cv:">
                        <div className="text-6xl mb-4" data-oid="i-qr7zh">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="ts01uf1">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="eanecui">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid=".sprw3x"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
