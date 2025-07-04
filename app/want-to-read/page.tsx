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
            data-oid="9h3tdkm"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="dwm_1o-">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="gkuzh5v">
                    <div className="flex items-center justify-between" data-oid="ilm9l.v">
                        <div className="flex items-center space-x-3" data-oid="jujgkwv">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="vkh:14j"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="br3wgxi"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="810xbzh"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="yjkbaqh">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="cfllspm"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="46y90ft">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="j5k_:8w">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="bsoa7z9"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="176_.bz"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="3rh17wp">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="0hqsk1_"
                >
                    <div className="text-center" data-oid="bm_l332">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="-wy.tgh">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="04hs-qi">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="s8._ewa">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="f2n5c9b"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="t-1sbvi"
                            >
                                <div className="mb-4" data-oid="j2i17a5">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="s9k9ur_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="wzqx5et">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="qrdf3qr">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="ofqgwlt">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="o6y6an3"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="75.8tpm"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="bkfnls5"
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
                    <div className="text-center py-12" data-oid="mr.:r3x">
                        <div className="text-6xl mb-4" data-oid="hmiwc78">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="vo:35ic">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="u10evtw">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="a8j8_gy"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
