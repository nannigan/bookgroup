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
            data-oid="5dms9fu"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="4rhlwn:">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="-dh8fk1">
                    <div className="flex items-center justify-between" data-oid="r56jf9c">
                        <div className="flex items-center space-x-3" data-oid="k2hsnrz">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="u.42yp7"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="le:4tt_"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="qkokmme"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="w-x82yt">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="_.4h2.k"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="n0m_ljm">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-n3s005">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="7fi8cx9"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="hl_dsu_"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="zrjlo7o">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="cbhxn.4"
                >
                    <div className="text-center" data-oid="3rfo76h">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="v0ogv-n">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="9jazu_a">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="tdlajx2">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="hlckch9"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="v_ehnr0"
                            >
                                <div className="mb-4" data-oid="jm00m-:">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="awdw0ap"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="gdodpf6">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="wcrr-nv">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="9r-x3x9">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid=":l-epab"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="nf2ecbf"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="hoyj336"
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
                    <div className="text-center py-12" data-oid="1k0djap">
                        <div className="text-6xl mb-4" data-oid="iijwryq">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="x742w15">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="mlcs2co">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="ssjg6rc"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
