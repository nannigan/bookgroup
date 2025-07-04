'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="01mrz61">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="d3gklak">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="jsn6nzt">
                    <div className="flex items-center justify-between" data-oid="w7avou6">
                        <div className="flex items-center space-x-3" data-oid="o4w:czx">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid=":y8ki5u"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="4p60ihn"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="6_8a721"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="bswxwq1">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="eu-k8je"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ksx:nwb">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="8d3em3-">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="omftnm_"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="jor2iqb"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="6.h_-zm">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="ppe7p1r"
                >
                    <div className="text-center" data-oid="jlqa6v1">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="j81.b3c">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="vvlhrs7">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid=":bmril-">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="k-l3naq"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="50:o-kz"
                            >
                                <div className="mb-4" data-oid="xbqev6.">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="0keh.k:"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="fj1plrv">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="4lkl.1e">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="sq79zle">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="gyxtgu:"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="rkd_j9d"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="22ivolr"
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
                    <div className="text-center py-12" data-oid="::1o9-v">
                        <div className="text-6xl mb-4" data-oid="gg9wvn8">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="ip:cq-j">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid=":s.t8uh">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="v2wy-ks"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
