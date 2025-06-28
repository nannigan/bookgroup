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
            data-oid="v_htqxn"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="swwqy79">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="i.1_rln">
                    <div className="flex items-center justify-between" data-oid="kndeb5m">
                        <div className="flex items-center space-x-3" data-oid="mft7hyq">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="hqx9.ag"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="hp9a_0k"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="3wyznka"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="1cwh0xm">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="d7_v49p"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="z9z60-z">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=":hceazp">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".p.jn47"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="..w_tks"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ok0ayk_">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="2612qje"
                >
                    <div className="text-center" data-oid="rh:en6p">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="afzfqt:">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="zhxcvk.">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="_2lya6z">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="2vfdjme"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="kwyqv90"
                            >
                                <div className="mb-4" data-oid="-d6anhn">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="d_1gqth"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="d28mz-l">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="apbocok">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="0gf1vp3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="jxezkzg"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="gr4m111"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="dvas4e."
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
                    <div className="text-center py-12" data-oid="055z608">
                        <div className="text-6xl mb-4" data-oid="jr776v_">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="l8edg:z">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="ypm5zy_">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="czgqbhj"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
