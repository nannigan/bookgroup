'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="-p3jhz5">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="gajg-8x">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ev8bomv">
                    <div className="flex items-center justify-between" data-oid="jlb:jvk">
                        <div className="flex items-center space-x-3" data-oid=":.2ox-u">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="fnrzyvg"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="hgu-o8h"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="xcsqumj"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="j9kufq3">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="_vhye7k"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="wxn8zz4">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="49a4w42">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="glw9:ys"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="k2mzl5e"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=":8cwk-8">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="aty7_62"
                >
                    <div className="text-center" data-oid="obpd544">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="94dakfe">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="pnaghjp">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="ar6gy-h">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="x1sshtw"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="c6ahdas"
                            >
                                <div className="mb-4" data-oid="uh4_ye9">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=".kncgxo"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="09.9i4q">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="dh3avs0">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="8.2j6g4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid=".f_m352"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="-e.ffg0"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="h.v0p7d"
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
                    <div className="text-center py-12" data-oid="4w0hy5n">
                        <div className="text-6xl mb-4" data-oid="emr4yog">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="0z5nh.x">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="v53fjb8">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="nnfz7zn"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
