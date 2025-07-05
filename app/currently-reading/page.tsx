'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="-h54njr">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="w-h5du5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="u4e6whw">
                    <div className="flex items-center justify-between" data-oid="2ereeoy">
                        <div className="flex items-center space-x-3" data-oid="o2qh89h">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="qviovz3"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="ze9i4rd"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="h8:9n-r"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="82a24bb">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="ut25o28"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="iz5.n.e">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="b7.a47d">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="h93:o.p"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="evwqyth"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="wo79d_k">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="l6o_rmv"
                >
                    <div className="text-center" data-oid="rto_38x">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="sn3e9x3">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="d3t_xf6">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="vhm.zk1">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ewbn:zj"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="znjm_ik"
                            >
                                <div className="mb-4" data-oid="hl1o54v">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="7:t0pph"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="0dn5u:p">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="wdm2u4o">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="0.fawx6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="bb._6lr"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="y9cjn-y"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="-e0qf9f"
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
                    <div className="text-center py-12" data-oid="3cancx9">
                        <div className="text-6xl mb-4" data-oid="u.2txrv">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="9ko1rdv">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="dhyn3:g">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="qw80x65"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
