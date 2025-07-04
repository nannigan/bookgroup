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
            data-oid="z.cbo_3"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="ly5wppx">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="to-5m9b">
                    <div className="flex items-center justify-between" data-oid="7lchv3j">
                        <div className="flex items-center space-x-3" data-oid="4zz4ab0">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="1089_z5"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="topilpr"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="abnobgr"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="gedx4fc">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="9ilq_49"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="czp:lfb">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="5fx.qys">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="molp9f5"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="8h0.550"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="6.j-0z:">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="-2m6k2l"
                >
                    <div className="text-center" data-oid="qi8qux8">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="asp1j7f">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="izem_v.">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="b.16r52">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="sea345n"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="g60t98l"
                            >
                                <div className="mb-4" data-oid="fczf2xr">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="bklb3j2"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="s6kv_44">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="sl1dnku">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="8:31x-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="89h30ip"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="yz:ekfl"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="idhznij"
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
                    <div className="text-center py-12" data-oid=".glb08u">
                        <div className="text-6xl mb-4" data-oid="qd01z72">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid=".i0fhcj">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="k69tce_">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="_l5003l"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
