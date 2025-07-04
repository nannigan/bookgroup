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
            data-oid="pt894kd"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="ct-n:6e">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=".g9bwjk">
                    <div className="flex items-center justify-between" data-oid="6846h-9">
                        <div className="flex items-center space-x-3" data-oid="iy7n73e">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="xa2:es6"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="9fje7ed"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="4rgwg0n"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="onfl-qm">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="r4dbp1v"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ovt4_va">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="thz1m_g">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="fllcj_v"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="01-0xr5"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="mk:zmxv">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="_.x-dip"
                >
                    <div className="text-center" data-oid="horb4zh">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="v_b8a.6">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="04dtxa1">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="l9ne:9l">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="00fgyaa"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="yb783x."
                            >
                                <div className="mb-4" data-oid="r:.k115">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="r_bs36b"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="7kd4lzw">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="b1i0:ao">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="d6ggic8">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="i1zim62"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="wf3cqj:"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="vaiif91"
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
                    <div className="text-center py-12" data-oid="vh26j.s">
                        <div className="text-6xl mb-4" data-oid="f.t:0qv">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="27fxoar">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid=":u:5u12">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="kd7r4_2"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
