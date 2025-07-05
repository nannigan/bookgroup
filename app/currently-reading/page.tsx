'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="fbb-c-z">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="2103otl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="w1j0z7v">
                    <div className="flex items-center justify-between" data-oid="1r3r8dn">
                        <div className="flex items-center space-x-3" data-oid="qzbp:m:">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="tkla2o."
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="vbdwfmj"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="flujj5v"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="-_tzkiw">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid=".4ik3.4"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=":vvl1y1">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="bcqpns7">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="o99j-9f"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="q0m6vjo"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="cuaqtag">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="onmc_2q"
                >
                    <div className="text-center" data-oid="6uhil1e">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="h8ws5yu">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="qrdoh61">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="7ofpx4u">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="r4ya9ea"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="rfckj-o"
                            >
                                <div className="mb-4" data-oid="enq5.by">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="y9:hb4d"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="swsirrb">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="nj69e.r">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="z55pbsm">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="1f6.k00"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="9p.:2a:"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="dup99_v"
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
                    <div className="text-center py-12" data-oid="f3ihe3z">
                        <div className="text-6xl mb-4" data-oid="a7.rzgk">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="ym8wf.k">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="v32q4.8">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="wpginq3"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
