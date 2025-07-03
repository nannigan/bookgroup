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
            data-oid="m_o9ahz"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100" data-oid="b5.4noq">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="pcrofti">
                    <div className="flex items-center justify-between" data-oid="uaon6rg">
                        <div className="flex items-center space-x-3" data-oid=":m53r3n">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="otvolpq"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center"
                                    data-oid="4mjtjvs"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ypz9m7y"
                                    >
                                        ✅
                                    </span>
                                </div>
                                <div data-oid="_k863s7">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="i2bz7zn"
                                    >
                                        Books Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="f70f.da">
                                        Books you have completed
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="z2ou4b9">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="2qbqe6y"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="_43cr1y"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="e:wmqc:">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-green-100 mb-8"
                    data-oid="zk-y8q1"
                >
                    <div className="text-center" data-oid="16nxlfo">
                        <div className="text-4xl font-bold text-green-600 mb-2" data-oid="6lj0r8_">
                            {readBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="1llmc2c">
                            Books Completed
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="swvb7r_">
                            Great job on your reading journey! 🎉
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {readBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="_i86z7m"
                    >
                        {readBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="lyu6_3p"
                            >
                                <div className="mb-4" data-oid="mpxwan:">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="fi4yhn6"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="seo-t2-">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="1glc_.j">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="y_s2k8n">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="scbknja"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-green-50 p-3 rounded-lg border border-green-100"
                                            data-oid="::a6o.7"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="whidlev"
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
                    <div className="text-center py-12" data-oid="ftd4bsm">
                        <div className="text-6xl mb-4" data-oid="1.pn0p3">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="v0wte3-">
                            No books read yet
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="hc7fvnz">
                            Start your reading journey by adding some books!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="-54gfre"
                        >
                            Add Your First Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
