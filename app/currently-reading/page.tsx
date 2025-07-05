'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="nq73p1y">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="22kakqj">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="f.zivu_">
                    <div className="flex items-center justify-between" data-oid="r111bbs">
                        <div className="flex items-center space-x-3" data-oid="lz.meer">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="j_s5vkx"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="l25q5dj"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="u-xd3s9"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="zir-if0">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="c243978"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=".:xvon3">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="lpzt53l">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="p7flrvt"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="gyzr:gn"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="7hj30f7">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="k-5nt-n"
                >
                    <div className="text-center" data-oid="qi4guol">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid=":qvirq6">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="u8gru:a">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="nyqc.w-">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="fvmzk92"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="au:p5c5"
                            >
                                <div className="mb-4" data-oid="pkey_ar">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="x1gyuc_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="d9t48dd">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=".841-ji">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="2em95fi">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="k7ibu:1"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="kp:-7l2"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="mzke-3_"
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
                    <div className="text-center py-12" data-oid="jm_qvom">
                        <div className="text-6xl mb-4" data-oid="1aut1tu">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="hsd-fio">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="yh8vo1t">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="2w_0gvb"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
