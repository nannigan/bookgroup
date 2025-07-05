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
            data-oid="xveo:6t"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="wxvbr6r">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="o89j36.">
                    <div className="flex items-center justify-between" data-oid="tc47l2:">
                        <div className="flex items-center space-x-3" data-oid="_3pltgy">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="i8ztxqv"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="jtp:xh:"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="o5-h6ac"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="wprx5q2">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid=".963lau"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="8lrsls6">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="d5quzd7">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".omovpp"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="1:6.e4i"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="8pl-2s_">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="6c9h_fv"
                >
                    <div className="text-center" data-oid="pb_3iha">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="80xs4ma">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="y9a-_.y">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="kwp1sb7">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="k:q3ofq"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="x6_t_9p"
                            >
                                <div className="mb-4" data-oid="fez9:j7">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="2e99_lt"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="ccv.p6b">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="7xr1cqw">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=":fq2q-p">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="vx6xbi1"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="blby2:8"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="02z4a7a"
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
                    <div className="text-center py-12" data-oid="ia3i006">
                        <div className="text-6xl mb-4" data-oid="s.o-oa7">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="_pj5.vf">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="ue8n2n-">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="0:69l87"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
