'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function BooksReadPage() {
    const [books] = useState(initialBooks);
    const readBooks = books.filter((book) => book.status === 'Read');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100"
            data-oid="82l:6b1"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="qhjtaat">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="x8hgodz">
                    <div className="flex items-center justify-between" data-oid="jo7shbu">
                        <div className="flex items-center space-x-3" data-oid="eux-yb-">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="zx17ufo"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="27:is:8"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="rau:ay9"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="otqfxa.">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="oouz7hm"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="zujxqgu">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="1:uejb_">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="yiou2sx"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="nzhsg38"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="pvylqac">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="7okx5w."
                >
                    <div className="text-center" data-oid="h6i13l:">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="yyb_dd2">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="8ra2emz">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="hxz3_s5">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="57w-z_f"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="hbshahr"
                            >
                                <div className="mb-4" data-oid="y4.ozih">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="ehg3ak6"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="d45obo.">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="vpyriy8">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="a_sjk.n">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="m2w4111"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="3u3:qw8"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid=".leq6yt"
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
                    <div className="text-center py-12" data-oid="--6e.at">
                        <div className="text-6xl mb-4" data-oid="jql2ik5">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="yujyj52">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="d372s0z">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="6m2p8.d"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
