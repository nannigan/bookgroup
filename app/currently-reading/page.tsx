'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="bb5az:d">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="oj:eijr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="onoqdkt">
                    <div className="flex items-center justify-between" data-oid="kx803w8">
                        <div className="flex items-center space-x-3" data-oid="d1:xyio">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="kvsuc.m"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="pve2v2w"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="o8_6toa"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="d620i05">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="ejl:7r3"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="xx_bm49">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="uvb-90.">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=":mkyhq."
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="225_ydq"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="jjtt7lu">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="1snxgtv"
                >
                    <div className="text-center" data-oid="ox0w:.c">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="xkjst-m">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="9xgmfsa">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="fa2wrnn">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="xikvpma"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="lfepjhb"
                            >
                                <div className="mb-4" data-oid="34-dk-k">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="qn1svgi"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=":40365j">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="3421ln6">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="pdrmy3o">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="0-dou2p"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="qtoty6m"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="2yv7dpt"
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
                    <div className="text-center py-12" data-oid=".hnb:po">
                        <div className="text-6xl mb-4" data-oid="p5vlndh">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="_jk_04o">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="f7-pqr4">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="lcwoxs4"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
