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
            data-oid="3:06ldq"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="ppd-0se">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="yap_kcd">
                    <div className="flex items-center justify-between" data-oid="mc22r0g">
                        <div className="flex items-center space-x-3" data-oid="adbdjq0">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="3w:y505"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="583wqeq"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="sqzp:or"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="3w4njie">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="cq7f4-y"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="291h8-y">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="k1et6fp">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".5xo9go"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="7ctcf-v"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="kfb3nrd">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="ac9ynt:"
                >
                    <div className="text-center" data-oid="r5fa94m">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="jeplmey">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="ytwsuby">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="3b2:z8w">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="_0id46d"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="sxio4hl"
                            >
                                <div className="mb-4" data-oid="ifk6pwh">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="b4.ssf9"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="eti2j6.">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=":vw:srg">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="6n5mvgu">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="tglji76"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="g3ncy78"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="qmgu6u0"
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
                    <div className="text-center py-12" data-oid="b_xb._l">
                        <div className="text-6xl mb-4" data-oid="e:rlx6h">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid=":anv5k0">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="c2o4qfk">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="1ir31a:"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
