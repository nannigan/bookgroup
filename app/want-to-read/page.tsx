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
            data-oid="xx5_r_u"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="fog-8i1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="er4s-d4">
                    <div className="flex items-center justify-between" data-oid="qt7tcj0">
                        <div className="flex items-center space-x-3" data-oid="uxuls.1">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="xeno7dr"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="_37n:q5"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="bsw7cqg"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="7.eogmh">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="bai:0xu"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=":f-yekh">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="nf:exms">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="l7h:l87"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="0jjo-3p"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="e3j5x8i">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="cpor7gf"
                >
                    <div className="text-center" data-oid="9wflppr">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="w6:_ska">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="mr9wn-2">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid=".9y2g7n">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ba7b8n1"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="wyitcwt"
                            >
                                <div className="mb-4" data-oid="qro5-pf">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="9jn:9tz"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="qc6-2so">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="m95h56i">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="_o:.n1s">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="nbat0x_"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="b0..g6."
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="ncfm5fw"
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
                    <div className="text-center py-12" data-oid="6ohxys4">
                        <div className="text-6xl mb-4" data-oid="u454-gs">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="fvn0du1">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid=".flnr:.">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="e2.g9iv"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
