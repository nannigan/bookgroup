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
            data-oid="vvvh72g"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="5jh_moc">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="pm-p5.o">
                    <div className="flex items-center justify-between" data-oid="wytagnn">
                        <div className="flex items-center space-x-3" data-oid="pthlfyo">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="5waq60l"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="djp6q60"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="tgg1:xw"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid="bm4py47">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid=":3dtmdu"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="kd6a1_6">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="73.j:00">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="eli06f:"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="pjw299q"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="s:j81jc">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="otj45rj"
                >
                    <div className="text-center" data-oid=".i:cgs2">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="_xcgw3k">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="sc2h4nr">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="qo-cx:a">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="..knyaw"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="x4iocfe"
                            >
                                <div className="mb-4" data-oid="svj-7:y">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="-_b3uj2"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="qw6zabf">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="k4nv4la">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="romp3ku">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="lg7.mk2"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="q3gxoht"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="96rlh64"
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
                    <div className="text-center py-12" data-oid="i.bd82i">
                        <div className="text-6xl mb-4" data-oid="n_:b_yt">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="1io_0y:">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="1i::fri">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="v8nrcai"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
