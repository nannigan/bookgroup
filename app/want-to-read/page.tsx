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
            data-oid="_1fcu8h"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="-jfrow4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="x_zzp4k">
                    <div className="flex items-center justify-between" data-oid=":z99l66">
                        <div className="flex items-center space-x-3" data-oid="8-clf3y">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="7_b97jd"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="t34a.rm"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="8n2lnxs"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="2_wlt65">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="lvtcgm4"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="e0x64fp">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="n8d35pf">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="z7lgnjl"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="kv5:f:m"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="fl:5t9_">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="-1x:_sf"
                >
                    <div className="text-center" data-oid="qux4elp">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="cvyyl3x">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="15-0yb6">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="w985gix">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="0d3i_r5"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="px.efpr"
                            >
                                <div className="mb-4" data-oid="rq-xg8i">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="8_xq2fm"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="y05:sxb">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="xo2xogs">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=":.zvzaw">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="-mfl431"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="0hiltd4"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="6:6i6--"
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
                    <div className="text-center py-12" data-oid="5s3av.i">
                        <div className="text-6xl mb-4" data-oid="d4op2sn">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="doewoqk">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="j8j83q_">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="8eix4mb"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
