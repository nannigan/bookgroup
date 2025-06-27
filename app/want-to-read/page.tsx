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
            data-oid="gdi3k7k"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="7w1kxfr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="fiblsil">
                    <div className="flex items-center justify-between" data-oid="mqlbfxt">
                        <div className="flex items-center space-x-3" data-oid="cmfsz:6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="hf3gdvk"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="_:d3.-a"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="aad2if_"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="0s_89dz">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="rz.phcm"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="deo.l5:">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="sic0ywm">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="bjjmnvr"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="c3ip06v"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="-psk8jc">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="eusq2sa"
                >
                    <div className="text-center" data-oid="7dp:y4:">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="6an:g01">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="rqfaji4">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ytr_plx">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="vwn_xvz"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="09354mo"
                            >
                                <div className="mb-4" data-oid="j6f-ixw">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="g9alnpa"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="ek93z0c">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="yp73pwu">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="q-wunkp">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="wahx:wk"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="r9ezpju"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="nk1xl5g"
                                            >
                                                "{book.comment}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12" data-oid="4-qt7z.">
                        <div className="text-6xl mb-4" data-oid="uew9p5y">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="mu5cxqa">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="-40a-je">
                            Add some books you'd like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="iekcsbj"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
