'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function WantToReadPage() {
    const [books] = useState(initialBooks);
    const wantToReadBooks = books.filter((book) => book.status === 'Want to Read');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100"
            data-oid="w4q.ql7"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="ewarm5f">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="p125qnf">
                    <div className="flex items-center justify-between" data-oid="1fps1q5">
                        <div className="flex items-center space-x-3" data-oid="8puzkvd">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="w6nj7wb"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid=".u78_ru"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="q-kueth"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="xft4rsn">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="uv5zo3u"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="o4v_i9e">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="9jcggea">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="-al2q52"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="1fqsmy5"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="tl_n2ks">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="d5uk:0y"
                >
                    <div className="text-center" data-oid="h_4gl4u">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="p3l4s4v">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="0hhnwzi">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="kdsapba">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="bdtj1n8"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="z9pzfzb"
                            >
                                <div className="mb-4" data-oid="1w3t1z6">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="oursi39"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="3b.ana0">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="af8ig6m">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="53h72n3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="95f9003"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="belx1vs"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="u1j_d5:"
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
                    <div className="text-center py-12" data-oid="7w_8:t8">
                        <div className="text-6xl mb-4" data-oid="1hb9w2m">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="v2huhnb">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="wos.rki">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="m1r9n8a"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
