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
            data-oid="4a_f:q8"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="3r5fkin">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="1n22tnq">
                    <div className="flex items-center justify-between" data-oid="vxev5hf">
                        <div className="flex items-center space-x-3" data-oid="_i3dx:.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="mm593mi"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="_cr6ppm"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="r14bfki"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="2h0f0yw">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="1x6m8ra"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="poz0sng">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="m1..-qq">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="am62x-c"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="5mq-ov5"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="cpapfe0">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="dq-elr4"
                >
                    <div className="text-center" data-oid=".nwgw:q">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid=".-6obl2">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="xtwb485">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="14fy8zu">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="d5pnpld"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="c_enb7v"
                            >
                                <div className="mb-4" data-oid="03_haw6">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="7q6ks1e"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="l4-yjtf">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="f48mov5">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="1_b328l">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="2-e9ghx"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="0:5qoe1"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="2_43jsm"
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
                    <div className="text-center py-12" data-oid="5:k:kwd">
                        <div className="text-6xl mb-4" data-oid="el-olgn">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="2bo7csv">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="w7.rpzd">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="z1r8das"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
