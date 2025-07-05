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
            data-oid="1x9ka9u"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="mv:umhr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="xolp4zi">
                    <div className="flex items-center justify-between" data-oid="slrwb::">
                        <div className="flex items-center space-x-3" data-oid="40xb54k">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="9b0diw1"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid=":.lkwui"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="3coasaq"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="4ku2bov">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="cgk19bu"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="44qzppn">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="c4lci.:">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="gse9vlu"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="cwkmt28"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="xvn2m83">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="pk7k:r9"
                >
                    <div className="text-center" data-oid=":5qvq1s">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="o9fcm53">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid=".jfpckf">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ha9htx1">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="f7t2__p"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="szdp_nf"
                            >
                                <div className="mb-4" data-oid="vqgb1bj">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="63k9i53"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="suojlga">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="5izqe4h">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="lrkl994">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="4gvzyn."
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="3vr286a"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="_4ae3-q"
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
                    <div className="text-center py-12" data-oid="k1y1gem">
                        <div className="text-6xl mb-4" data-oid="oyyfesi">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="_omtjp3">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="pc9n7rp">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="h34zsmm"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
