'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="ymlle8a">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="zjm5uk:">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="udo-ilb">
                    <div className="flex items-center justify-between" data-oid="8yaxwst">
                        <div className="flex items-center space-x-3" data-oid="x24ujkp">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="e_p8wti"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid=":n94dyf"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="e1ju3-j"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="044pb.f">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="ydm8:-m"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="b.zsmbc">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="oddyuk7">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="i7595gm"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid=".nwx::4"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="w_-03oa">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="p-v1gz3"
                >
                    <div className="text-center" data-oid="qtsp2cd">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid=".hc2fx-">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="1e41vch">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="5go7f.:">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="l7b7ifj"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="fdd-0ho"
                            >
                                <div className="mb-4" data-oid="mi_18xn">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":olf1b4"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="1rg5a:o">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="jy462a9">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="cdr_8hm">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="ylo8u32"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="7et6klr"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="rg:y-5g"
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
                    <div className="text-center py-12" data-oid="b5ti6gd">
                        <div className="text-6xl mb-4" data-oid="u-3e9ri">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="kb8g.y9">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="3z5wa2b">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="dg.b.vz"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
