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
            data-oid="f4kvmdt"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="_ijqjv4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="w9bf8ep">
                    <div className="flex items-center justify-between" data-oid="4apkcsz">
                        <div className="flex items-center space-x-3" data-oid="ubk42qh">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="_aqwj6g"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="5-9.9td"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="19hh287"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="darcnai">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="fv::7q5"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="78dfc37">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="z7eko_-">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="xq041ma"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid=".m3k0l7"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ui8kl70">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="21tl:z6"
                >
                    <div className="text-center" data-oid="t42v904">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="w3h2zo7">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="epsq1gt">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="1lovgv.">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="eigj6wm"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="_-hq-wx"
                            >
                                <div className="mb-4" data-oid="2zh69zp">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="qqtc8t."
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="uve7i8.">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="i_c6o.8">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="6l83.iv">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="ejiexa:"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="t4-835."
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="2t_3l_w"
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
                    <div className="text-center py-12" data-oid="f15ytjh">
                        <div className="text-6xl mb-4" data-oid="gw.yvn0">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="pg28kzz">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="1:84u83">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="d8bs4ix"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
