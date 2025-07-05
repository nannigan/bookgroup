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
            data-oid="zs-7aol"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="mzivdny">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="mrc9.cv">
                    <div className="flex items-center justify-between" data-oid="g3m87ci">
                        <div className="flex items-center space-x-3" data-oid="unew-ua">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=":21tmzq"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="mccd1si"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ebw1t06"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="sag91gw">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="96_.w7y"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ncydnf6">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="ridbpj3">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="3d56qa_"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="kmal7mt"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=":kz7uy4">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid=":4cok.d"
                >
                    <div className="text-center" data-oid="35wgxmv">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="_7peo8e">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="y.xnlq6">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ty6gu9k">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="19v6lu7"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="_7-aohy"
                            >
                                <div className="mb-4" data-oid="14nqp.d">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="94ok_.9"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="3ltw:7j">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="7ixe096">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid=":1lv6ye">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="8i_a.m-"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="k5cpbwl"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="mvz37hl"
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
                    <div className="text-center py-12" data-oid="ap5tivw">
                        <div className="text-6xl mb-4" data-oid="5bcnylc">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="h2le:hv">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="3stlqae">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="i960tv1"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
