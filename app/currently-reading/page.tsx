'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="09_fbvc">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="--v2hlk">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="a3jhank">
                    <div className="flex items-center justify-between" data-oid="v13j:9q">
                        <div className="flex items-center space-x-3" data-oid="q5pkj28">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="7i.p.3u"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="ce9zny_"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="pfeko-y"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="uerpvxj">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="vtjeksu"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="jw8jpvb">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="_83ptu_">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="rmtho:2"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="91f7-s8"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="jk04nl3">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="gsru0ir"
                >
                    <div className="text-center" data-oid="f0lpm1y">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="94chdr.">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="l20zw-7">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="j7-07tf">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="8lkyjlk"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="sa-wt1_"
                            >
                                <div className="mb-4" data-oid="2b56bz6">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="r_p7z7r"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="cv8-1_a">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="o6i3:pb">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="tnk6_93">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="qd_x.bn"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="2-1ngfz"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="-6-u5b_"
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
                    <div className="text-center py-12" data-oid="z_zip-d">
                        <div className="text-6xl mb-4" data-oid=":w9xj7d">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="sh71hmi">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="eob8y3a">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="7mpi6nj"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
