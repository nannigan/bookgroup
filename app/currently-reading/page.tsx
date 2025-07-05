'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="nz3l:py">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="l-3whtt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="o3v6xja">
                    <div className="flex items-center justify-between" data-oid="2cku-bt">
                        <div className="flex items-center space-x-3" data-oid="rba-efe">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="6u.tv40"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="udzlqlw"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="y8mvqqn"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="o65evhe">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="n3mivv3"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="i46mvcq">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="co3dt3f">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".yvlix3"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="_ov1nkr"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="yaz6wpw">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="lww82t8"
                >
                    <div className="text-center" data-oid="mx8_h2p">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="ez8z1k7">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="wsk:mjj">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="vr92r48">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="idu5qzs"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="p6hsos2"
                            >
                                <div className="mb-4" data-oid="fmx4zha">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="0i.lbqe"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="3_a:1b9">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="exxd-eg">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="v1c-as6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="-957qme"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid=":ls5cwa"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="l0ga_f8"
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
                    <div className="text-center py-12" data-oid="hktidlg">
                        <div className="text-6xl mb-4" data-oid="1jav1po">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="xvurap9">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="iph.0r2">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="12xgk0e"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
