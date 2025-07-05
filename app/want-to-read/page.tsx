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
            data-oid="6kudj1t"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="7z7l2u5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="8fnm_rv">
                    <div className="flex items-center justify-between" data-oid="q5rh3nr">
                        <div className="flex items-center space-x-3" data-oid="07pqjuo">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="9-ptb9k"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="0ofjypw"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=".7ue-cb"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="bh.8ig1">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="i2ya6a0"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="lb5g23k">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="pf:u5ml">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="abia3te"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="nq2oczb"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="yzy8v2.">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="zbi4xbp"
                >
                    <div className="text-center" data-oid="li0mwt6">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="rgsmehc">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="y9_8a_2">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="4b:5bvc">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="7i7nv52"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="8.wzuhb"
                            >
                                <div className="mb-4" data-oid="eq71vg7">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="-lzb98z"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="fukx:co">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="kgvwntz">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="o0xmm8b">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="7a97d:d"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="65wi8gh"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="7uc.2py"
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
                    <div className="text-center py-12" data-oid="8s97qot">
                        <div className="text-6xl mb-4" data-oid="7slauz:">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="b5da2q2">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="u9jj3zn">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="h2qa2mq"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
