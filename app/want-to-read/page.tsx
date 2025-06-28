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
            data-oid="jva:cy-"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-yellow-100" data-oid="e-ko77s">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="v:ke:a5">
                    <div className="flex items-center justify-between" data-oid="n-f1cuy">
                        <div className="flex items-center space-x-3" data-oid="0hd8-xd">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="4g-t:4d"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center"
                                    data-oid="t-l.4zh"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="juy5a2u"
                                    >
                                        🔖
                                    </span>
                                </div>
                                <div data-oid=":p_:r8o">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="cm702tm"
                                    >
                                        Want to Read
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ots2n_h">
                                        Your reading wishlist
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="2p:noc2">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="_hkts05"
                            >
                                ← Back to Home
                            </Link>
                            <Link
                                href="/all-books"
                                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="1j:.0-w"
                            >
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="em4ctkx">
                {/* Stats */}
                <div
                    className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 mb-8"
                    data-oid="8wm6lae"
                >
                    <div className="text-center" data-oid="ik5iz.b">
                        <div className="text-4xl font-bold text-yellow-600 mb-2" data-oid="yaz-z0c">
                            {wantToReadBooks.length}
                        </div>
                        <div className="text-gray-600" data-oid="to635s6">
                            Books on Wishlist
                        </div>
                        <p className="text-sm text-gray-500 mt-2" data-oid="2970k2.">
                            So many books, so little time! 📖
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {wantToReadBooks.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="ob2owcv"
                    >
                        {wantToReadBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                data-oid="p6xtt17"
                            >
                                <div className="mb-4" data-oid="om3rt:2">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="ebd78k9"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=":44bd46">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="o7z-don">
                                        {book.genre}
                                    </span>
                                </div>

                                <div className="space-y-3" data-oid="w:ysgv3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                        data-oid="98ql23g"
                                    >
                                        {book.status}
                                    </span>
                                    {book.comment && (
                                        <div
                                            className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                                            data-oid="np_rete"
                                        >
                                            <p
                                                className="text-sm text-gray-700 italic"
                                                data-oid="ujko1q:"
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
                    <div className="text-center py-12" data-oid="v79odch">
                        <div className="text-6xl mb-4" data-oid=".u3t:61">
                            🔖
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-oid="dv-heff">
                            No books on your wishlist
                        </h3>
                        <p className="text-gray-600 mb-6" data-oid="fna:_bi">
                            Add some books you&apos;d like to read in the future!
                        </p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="vjkf0mn"
                        >
                            Add Books to Wishlist
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
