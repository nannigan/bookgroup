'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function CurrentlyReadingPage() {
    const [books] = useState(initialBooks);
    const currentlyReadingBooks = books.filter((book) => book.status === 'Currently Reading');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100" data-oid="7j3_0wc">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100" data-oid="w5lldpt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ymiguqz">
                    <div className="flex items-center justify-between" data-oid="sa0vx77">
                        <div className="flex items-center space-x-3" data-oid=":u36r:9">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="5n.vriv"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
                                    data-oid="zytdtba"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="oe3muvn"
                                    >
                                        📖
                                    </span>
                                </div>
                                <div data-oid="jsou9fn">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="3gfinyf"
                                    >
                                        Currently Reading
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="n1hxhet">
                                        Books you are actively reading
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="c4f3t:2">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="5f91h7e"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="r0mpkxc"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="k88geex">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-8"
                    data-oid="ioc4wr-"
                >
                    <div className="text-center" data-oid="xa3soel">
                        <div className="text-4xl font-bold text-blue-600 mb-2" data-oid="w43xh:5">
                            {currentlyReadingBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="uvihpjn">
                            Books in Progress
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="cf_-53c">
                            Keep up the great reading momentum! 📚
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {currentlyReadingBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid=".ky9tji"
                    >
                        {currentlyReadingBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="gfsbjaf"
                            >
                                <div className="mb-4" data-oid="93-7cns">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="wzw6rou"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="cl1-iet">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="px77f_t">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="f.ka.e8">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="q61o0h8"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-blue-50 p-3 rounded-lg border border-blue-100"
                                            data-oid="j4fqaep"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="_9joqwh"
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
                    <div className="text-center py-12" data-oid="12nit:c">
                        <div className="text-6xl mb-4" data-oid="sqn2.g9">
                            📖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="67r4awc">
                            No books currently being read
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="0dpf:6m">
                            Pick up a book and start reading today!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="1:sgka9"
                        >
                            Start Reading a Book
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
