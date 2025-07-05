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
            data-oid="c_dr:x_"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="s9k.1ds">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="cfe-5_u">
                    <div className="flex items-center justify-between" data-oid="-jrixft">
                        <div className="flex items-center space-x-3" data-oid="z5x8234">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="fzgfp1y"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="jdgzmgu"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=".6h2p04"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="wfcto2k">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="incce.a"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="uvyt_pg">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="du6k2q8">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="2u_yp-5"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="i5vh2xs"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="h2_6pdw">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="rtmiq84"
                >
                    <div className="text-center" data-oid="glwvpkk">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="q3udwd9">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="ccv20eq">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="3rj-w0u">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="pqpq0uk"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="a.pabuf"
                            >
                                <div className="mb-4" data-oid="6xbv4st">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="6u3m6r7"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="_uw32v0">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="5zqqpjg">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="kxpveoq">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="f_3sxni"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="ujc3x61"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="pk12ha2"
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
                    <div className="text-center py-12" data-oid="3x:tjby">
                        <div className="text-6xl mb-4" data-oid="h2y9dkl">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="4a1ct1y">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="baghad_">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="5fq519z"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
