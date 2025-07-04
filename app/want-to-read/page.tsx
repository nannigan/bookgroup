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
            data-oid="rn11byh"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="8vemf2c">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=".b2gmzf">
                    <div className="flex items-center justify-between" data-oid="i3jo1mf">
                        <div className="flex items-center space-x-3" data-oid="-_vv.wj">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="jb5gpk_"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="srchp9p"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="wdrfjzx"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="jwzg5w7">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="beq5n._"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="80bgk2y">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="kjc4dq8">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="-orzhh9"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="1fbbi2g"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="v.12lwp">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="smebxcq"
                >
                    <div className="text-center" data-oid="ghmt6sf">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="tz2b5:g">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="tce3jd0">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="9_zerhq">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="sc1.bj9"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="lev6zmv"
                            >
                                <div className="mb-4" data-oid="tpfy1lo">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="r:-37xd"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="-f7alhv">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="wmqao78">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="ninov6w">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="edthqxy"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="10a.x:w"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="rh1rvw2"
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
                    <div className="text-center py-12" data-oid="9-p-g1f">
                        <div className="text-6xl mb-4" data-oid="ugnfc7g">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="wt207d3">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="ftq0cu5">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="02w9w4k"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
