'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="pkcyxnl">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="1mrbu84">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="1k:f4-4">
                    <div className="flex items-center justify-between" data-oid="0_wfc9l">
                        <div className="flex items-center space-x-3" data-oid="g2t5mas">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="8yysttu"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="g0.zl2t"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="u_uwsd8"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="i-6k:a8">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="wotyg6v"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="wczo272">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="bkw_42s">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="6isg:0."
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="menylut"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="9emx667">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="t:khikv"
                >
                    <div className="text-center" data-oid="fukt.zn">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="galnrqt">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="663rr88">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="_:wwv.7">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="5:t:08o"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid=":kc3wln"
                            >
                                <div className="mb-4" data-oid="ebqkrdu">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=".t8a34_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="sj:jm1j">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="zofa7ke">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="rgsuejw">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="zcbun1c"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="1t:m9nc"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="4o372ve"
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
                    <div className="text-center py-12" data-oid="ycn3tp:">
                        <div className="text-6xl mb-4" data-oid="zy5_pla">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="qvni2..">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="15nb.nr">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="3seoy7w"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
