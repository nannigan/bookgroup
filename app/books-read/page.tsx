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
            data-oid="7mv2vtp"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="c1h.kgj">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="h0nl1-c">
                    <div className="flex items-center justify-between" data-oid="gna5:2n">
                        <div className="flex items-center space-x-3" data-oid="4.l-k.v">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="k:sv:d3"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="4hg8w3n"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="2p3h90m"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="ytm-1xr">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="vprj.b-"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ryibab7">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="lk-fcz9">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="96hk7r8"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="6gw.7wy"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="dpk.up9">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="c-n-:lj"
                >
                    <div className="text-center" data-oid="u7zvfbg">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="wfcp2lz">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="eetl4t_">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="v:qrns9">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="8ha31e8"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="kjlywh7"
                            >
                                <div className="mb-4" data-oid=".pnzw4:">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="m2u9qb-"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="hyr6ntd">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="93uhlnc">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="ybwms5x">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="67-8bd."
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="de3ax6j"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="5s_t:mf"
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
                    <div className="text-center py-12" data-oid="gw0wr6r">
                        <div className="text-6xl mb-4" data-oid="28ovfir">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="5alxs.f">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="3aojy77">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="i8hzjx_"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
