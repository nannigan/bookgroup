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
            data-oid="o45wvfe"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="o-v7bt:">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="mdbnwrj">
                    <div className="flex items-center justify-between" data-oid="_u-1cbv">
                        <div className="flex items-center space-x-3" data-oid="a3xitr7">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="xne:tdb"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="rugpcv6"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="4st6mt5"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="y808w32">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="j9i8v.o"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="upwsnx_">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=":xanrd3">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="vkt:d8a"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="q3ei9ej"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="m.4qs3p">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="b4wtvmg"
                >
                    <div className="text-center" data-oid="w9g:rno">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="b9evwi8">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="pfbghm0">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="os75:_x">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="8jv0_dd"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="u-3s2rc"
                            >
                                <div className="mb-4" data-oid="2cbk97g">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="tfbbona"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="m4a90aq">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="mv2n6go">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="1xg3zxv">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="avamq:o"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="kb9:t47"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="0uoav6w"
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
                    <div className="text-center py-12" data-oid="e66_cn:">
                        <div className="text-6xl mb-4" data-oid="kxytfm8">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="v5s1_9.">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="k:k6br9">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="9p9eu7p"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
