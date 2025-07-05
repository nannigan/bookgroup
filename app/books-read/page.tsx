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
            data-oid="sg6radd"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="fo3hzvl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=".f09jdz">
                    <div className="flex items-center justify-between" data-oid="a4k1z.q">
                        <div className="flex items-center space-x-3" data-oid="x59cocb">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="btx4-n-"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="pty9re2"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="6rffojo"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="fz4hw3l">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="72lrs4g"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="rgp6vb0">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="og_o1g6">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="k8lg4d3"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="jj7bduv"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ccwmbp-">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="-itkee-"
                >
                    <div className="text-center" data-oid="5ummh.y">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="9_:oino">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="_j1nnwt">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="i5h1:48">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="27jcph0"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="3qhtymn"
                            >
                                <div className="mb-4" data-oid="p8g3w84">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="jok:vgw"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="0bv3o.v">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="w2nzjyh">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="5kzkxrn">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="rpaybm6"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="we.n5ys"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="mlr3erz"
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
                    <div className="text-center py-12" data-oid="7-5u-uu">
                        <div className="text-6xl mb-4" data-oid="e_8_cpc">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="q736j1p">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="sjf3_.n">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="6v427on"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
