'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="-vy7w_m">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="ij6vu_g">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="vokeyuh">
                    <div className="flex items-center justify-between" data-oid="x_76-.5">
                        <div className="flex items-center space-x-3" data-oid="bblpauy">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="mk2m4-a"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="34drdfg"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ja8ws-3"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="m2nwq1w">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="b0mxbu."
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="tg9xrkr">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="jjh8sj.">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="8z90fyk"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="bh.uqr2"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="-l4j51t">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="ch_se.y"
                >
                    <div className="text-center" data-oid="1dwlnr8">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="eb99w0h">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="3_kvl1b">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="8so:uiy">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="_.p-r2n"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="pq..xfr"
                            >
                                <div className="mb-4" data-oid="thw9ig-">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="gnbg5xu"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="cpqk:h_">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="hlx-f2j">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="tf-jnp1">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="hlqi5:8"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="wxwdcd7"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="k17-5yt"
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
                    <div className="text-center py-12" data-oid="lk8amb5">
                        <div className="text-6xl mb-4" data-oid="tq2lzkl">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="uvoi5gs">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="hm33jet">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="gu4rva2"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
