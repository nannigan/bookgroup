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
            data-oid="dtqqm.o"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="xm7fog9">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="6jul6h0">
                    <div className="flex items-center justify-between" data-oid="u-46-pq">
                        <div className="flex items-center space-x-3" data-oid="7xg50um">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="30:2vxy"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="6b54855"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="gyin4eu"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="uiyl1kx">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="ibx3v-c"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ttfyup6">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="bhpu3j:">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="iqyrj-7"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="xr8lny7"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="9mxqg37">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="t3:vkrq"
                >
                    <div className="text-center" data-oid="ct.d7f7">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="sjq.:a8">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="-31265y">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="lttwc4f">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="7dp3iu."
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="0sty2ej"
                            >
                                <div className="mb-4" data-oid="6rjh1sq">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="uwz7skr"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=":6w9nf4">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="hoh91pf">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="gzzm7v6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="ucgum_k"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="0mg8h_4"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="a1.drql"
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
                    <div className="text-center py-12" data-oid="ebxj7pp">
                        <div className="text-6xl mb-4" data-oid="l-p_3j8">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="tpf23ns">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="u6l-97d">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="et2rv0p"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
