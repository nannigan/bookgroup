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
            data-oid="a.ptj:i"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="g11civf">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ib2b98c">
                    <div className="flex items-center justify-between" data-oid="3mtgg_p">
                        <div className="flex items-center space-x-3" data-oid=":xmuypp">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="gjg_69:"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="s351xuy"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="g09nhkb"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="ro_6e2t">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="kosfalq"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="pf3.:ob">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="t1s-8vx">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="a7d7ilx"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="i5wv8ee"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="_9oqmxs">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="ly8182y"
                >
                    <div className="text-center" data-oid="987k762">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid=".4xia7_">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="g9bzngy">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="8g.9ubm">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="26f9_44"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="kp0mtvm"
                            >
                                <div className="mb-4" data-oid="gugec:7">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="e39:t3y"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="l6.fh:2">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=":g:w4vm">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="vx1-6q4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="g2m_bs3"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="poh_8nu"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="yynpwwn"
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
                    <div className="text-center py-12" data-oid="sk8bgcb">
                        <div className="text-6xl mb-4" data-oid="ahh1nli">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="gjyh8c_">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="sazal4s">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="lmfi4dj"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
