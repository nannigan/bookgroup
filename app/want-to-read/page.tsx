'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function WantToReadPage() {
    const [books] = useState(initialBooks);
    const wantToReadBooks = books.filter((book) => book.status === 'Want to Read');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100"
            data-oid="qlbbs5q"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="3spf-q4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="8-bvouo">
                    <div className="flex items-center justify-between" data-oid="ir7jcxh">
                        <div className="flex items-center space-x-3" data-oid="soua0de">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="h3irgks"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="4j2p581"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="y5p0ex9"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="b3be8ik">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="d8r4qr-"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="h9rbpbk">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="0c2gid7">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="z7a.64j"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="5gffrkd"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="8aetmk_">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="r4qt64u"
                >
                    <div className="text-center" data-oid="b.izg2u">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="tq5.z:x">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="agxz5fs">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="vt64qer">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="w.h0s6t"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="nc9:91g"
                            >
                                <div className="mb-4" data-oid=":_li3qk">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="fln0wu4"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="r3stp32">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="rebdd3p">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="srlm:bz">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="mcrkur1"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="o1tvnwl"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid=":q0.4m2"
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
                    <div className="text-center py-12" data-oid="_nn00oo">
                        <div className="text-6xl mb-4" data-oid="1jtdwyj">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="86n15dz">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="aga0jz2">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="10t6l7z"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
