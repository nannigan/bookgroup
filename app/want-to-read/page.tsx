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
            data-oid="bqm7jwn"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="k5s:b8r">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="34qe.._">
                    <div className="flex items-center justify-between" data-oid="tm4f_lk">
                        <div className="flex items-center space-x-3" data-oid="idljhjp">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="iblbox-"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="ucz-i4u"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="l4uq6lg"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="un5mg62">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="54z8iqx"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ukmu80h">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="ovx05d9">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="hqoj_bj"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="n0dzwpc"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="b.w3rp5">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="1xcg912"
                >
                    <div className="text-center" data-oid="9e.uuwd">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="bpv6kq7">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="8si2c3y">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="jeel64q">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="42eu1hm"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="vw41z0_"
                            >
                                <div className="mb-4" data-oid="2o6mkdz">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="l3ov:1f"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="qwahb9k">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="417hu-z">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="6p_5cdz">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="z_u1dat"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="eezguha"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="h_3_h1n"
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
                    <div className="text-center py-12" data-oid="wf5gdyi">
                        <div className="text-6xl mb-4" data-oid=".hx11ku">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="kd8cp:q">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="w0iodx9">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="9_l_ar9"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
