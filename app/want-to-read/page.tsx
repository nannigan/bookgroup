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
            data-oid="9s88kwv"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="up79cq3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="vk-2957">
                    <div className="flex items-center justify-between" data-oid=".dgitto">
                        <div className="flex items-center space-x-3" data-oid="aot9mwu">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="66resc0"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="lsknknb"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="t6.1hyu"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid=".khu5rn">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="4rec8-o"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=".fakhsh">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=".929ise">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="8d:1nb8"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="7ntnmkg"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="de_puu3">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="gk1vaky"
                >
                    <div className="text-center" data-oid="teukc:4">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="i-_m6_p">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="cv49bt3">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="3g39i0a">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="-in:d7j"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="n98a_6y"
                            >
                                <div className="mb-4" data-oid=":j:l6hs">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="mleua.6"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="t5wguwt">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="kly8mqk">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="inc62st">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="sym0qwp"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="cq0nmde"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="09pcr_o"
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
                    <div className="text-center py-12" data-oid="ppli10f">
                        <div className="text-6xl mb-4" data-oid="fuih_vj">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="piq5kmf">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="c07oc3p">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="zt07_yt"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
