'use client';

import { useState } from 'react';
import Link from 'next/link';
import { initialBooks, getStatusColor } from '../../lib/books-data';

export default function AllBooksPage() {
    const [books, setBooks] = useState(initialBooks);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        status: 'Want to Read',
        comment: '',
    });

    const handleAddBook = () => {
        if (newBook.title && newBook.author) {
            setBooks([...books, { ...newBook, id: Date.now() }]);
            setNewBook({ title: '', author: '', genre: '', status: 'Want to Read', comment: '' });
            setShowAddForm(false);
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setNewBook(book);
        setShowAddForm(true);
    };

    const handleUpdateBook = () => {
        setBooks(books.map((book) => (book.id === editingBook.id ? newBook : book)));
        setEditingBook(null);
        setNewBook({ title: '', author: '', genre: '', status: 'Want to Read', comment: '' });
        setShowAddForm(false);
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="h4kj:3c"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="31.4btu">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="kuupg.5">
                    <div className="flex items-center justify-between" data-oid="6v2qil:">
                        <div className="flex items-center space-x-3" data-oid="hv0guoq">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="utg7nh5"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="0663b_d"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=".tlcddq"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="bidrjkx">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="a29dams"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="0foww4k">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="99qfx4y">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="04lggn0"
                            >
                                ← Back to Home
                            </Link>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="q5:x7w8"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="05a:csf">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="3t03obv">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="e570m4r"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="i5ciyyr">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="qw_695r">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="6zed31k"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="qikatlt">
                            {books.filter((book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="1784bow">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="lf220-6"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="m:j4vis">
                            {books.filter((book) => book.status === 'Currently Reading').length}
                        </div>
                        <div className="text-gray-600" data-oid="u36hey2">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="60uvey-"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="q68fpe4">
                            {books.filter((book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="moq6p45">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="kax28a5"
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="o_w:4v."
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="-6ur-t2"
                            >
                                <div className="flex-1" data-oid="qs_efb5">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="i:0pxxc"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="wm:tk3r">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="coxnm-3">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="0jr1brb">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="r:4ea.y"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="cv7:4fs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="221g4tj">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="sukywh7"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="1.j2zt:">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="qoft7t:"
                                        >
                                            "{book.comment}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Add/Edit Book Modal */}
            {showAddForm && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    data-oid="_px46pk"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="77m0c1a">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="xkq5tho">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="u3h-wqw">
                            <div data-oid="0k.s64_">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=".tfq6rc"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={newBook.title}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, title: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter book title"
                                    data-oid="gmrz.s6"
                                />
                            </div>

                            <div data-oid="w:yihyh">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="7fxe_kw"
                                >
                                    Author
                                </label>
                                <input
                                    type="text"
                                    value={newBook.author}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, author: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter author name"
                                    data-oid="m1xz8dx"
                                />
                            </div>

                            <div data-oid="ef:i9.i">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ghl1fr8"
                                >
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    value={newBook.genre}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, genre: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter genre"
                                    data-oid="yt133sv"
                                />
                            </div>

                            <div data-oid="wurs5-s">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="bpumxfl"
                                >
                                    Status
                                </label>
                                <select
                                    value={newBook.status}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, status: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    data-oid="ji67rpz"
                                >
                                    <option value="Want to Read" data-oid="wm2pnxw">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="hrdj.8h">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="k_o480:">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="ez:6g23">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="9b3df51"
                                >
                                    Comment
                                </label>
                                <textarea
                                    value={newBook.comment}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, comment: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    placeholder="Add your thoughts about this book..."
                                    rows={3}
                                    data-oid="81h671d"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="lnr_sxf">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="eihux90"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setEditingBook(null);
                                    setNewBook({
                                        title: '',
                                        author: '',
                                        genre: '',
                                        status: 'Want to Read',
                                        comment: '',
                                    });
                                }}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="_no82du"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
