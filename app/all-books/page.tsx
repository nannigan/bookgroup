'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { getStatusColor } from '../../lib/books-data';
import { useBooks } from '../../lib/useBooks';
import { JSONBinStatus } from '../../components/JSONBinStatus';
import { Book, BookFormData } from '../../lib/types';

export default function AllBooksPage() {
    const {
        books,
        isLoading,
        isOnline,
        lastSync,
        addBook,
        updateBook,
        deleteBook,
        resetToDefaults,
        forceSync,
        exportBooks,
        importBooks,
    } = useBooks();

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [newBook, setNewBook] = useState<BookFormData>({
        title: '',
        author: '',
        genre: '',
        status: 'Want to Read',
        comment: '',
    });
    const [showImportExport, setShowImportExport] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddBook = () => {
        if (newBook.title && newBook.author) {
            addBook(newBook);
            resetForm();
        }
    };

    const handleEditBook = (book: Book) => {
        setEditingBook(book);
        setNewBook({
            title: book.title,
            author: book.author,
            genre: book.genre,
            status: book.status,
            comment: book.comment,
        });
        setShowAddForm(true);
    };

    const handleUpdateBook = () => {
        if (newBook.title && newBook.author && editingBook) {
            updateBook(editingBook.id, newBook);
            resetForm();
        }
    };

    const handleDeleteBook = (id: number | string) => {
        if (confirm('Are you sure you want to delete this book?')) {
            deleteBook(id);
        }
    };

    const resetForm = () => {
        setEditingBook(null);
        setNewBook({ title: '', author: '', genre: '', status: 'Want to Read', comment: '' });
        setShowAddForm(false);
    };

    const handleImportBooks = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    const success = await importBooks(result);
                    if (success) {
                        alert('Books imported successfully!');
                    } else {
                        alert('Error importing books. Please check the file format.');
                    }
                }
            };
            reader.readAsText(file);
        }
        setShowImportExport(false);
    };

    const handleResetData = () => {
        if (
            confirm(
                'Are you sure you want to reset all data to defaults? This will delete all your custom books.',
            )
        ) {
            resetToDefaults();
        }
    };

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center"
                data-oid=":cr.6y0"
            >
                <div className="text-center" data-oid="7kmmetn">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="3:hh09:"
                    ></div>
                    <p className="text-gray-600" data-oid="xfx0rzs">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="er.l:tt"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="sfwupir">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="dkff-i0">
                    <div className="flex items-center justify-between" data-oid="oh-tjqw">
                        <div className="flex items-center space-x-3" data-oid="arlt6et">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="ds28_4z"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="97sik54"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="sxvgq7d"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="2qov4od">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="889:8vq"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="doi98:7">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="7-w.3ny">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="6y38v-e">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="fnwpdm7"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="zwizdvp">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="oe.kt1m">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="s:8f8qw"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="r010evc"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="hldn6jp"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="-t2af5x"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="cybid1n">
                {/* Connection Status */}
                <JSONBinStatus data-oid="7ifqny5" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="yb8xen-">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="-zxzkt-"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="91-vjpy">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="3v0y202">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="bqrnlqw"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="m5fc-6:">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="t1amdvl">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="3_9_8ep"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="-2j2w67">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="c4r9ogo">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="n2uz0z-"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="9rvsy4a">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="8:plvb5">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="o:azegf"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="wp71bai"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="hk_ee43"
                            >
                                <div className="flex-1" data-oid="tmt3.2l">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="i19e341"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="9953-8c">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="rq:ewk2">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="z6lxcmo">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="4-7xu_e"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="yt9rikd"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="ctqj1qs">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="pt9ld.x"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="0dkoe6e">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="9vwcffd"
                                        >
                                            &ldquo;{book.comment}&rdquo;
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
                    data-oid="hu.rq2h"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="5msxyoq">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="zbjncxb">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="vq7xc_x">
                            <div data-oid="0oewq8y">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="hr-2ry2"
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
                                    data-oid="4z:pt2z"
                                />
                            </div>

                            <div data-oid="y9ddcbo">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4f5om33"
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
                                    data-oid="ydlzisl"
                                />
                            </div>

                            <div data-oid="7t0mam8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=".6ky2he"
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
                                    data-oid="235xkie"
                                />
                            </div>

                            <div data-oid="t_t0oth">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="g1txpsm"
                                >
                                    Status
                                </label>
                                <select
                                    value={newBook.status}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            status: e.target.value as Book['status'],
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    data-oid="uuy9ytq"
                                >
                                    <option value="Want to Read" data-oid="fcx4-p9">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="0vagbm1">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="q5-zp2z">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="pp61.q5">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="lsyq4i6"
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
                                    data-oid="vv6i:77"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="h086e7n">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="yu-bbra"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="-ucwgjm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Import/Export Modal */}
            {showImportExport && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    data-oid="-j1std3"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="m9ettl2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="_2.7_5z">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid=".2fsbha">
                            <div data-oid="cccv-b.">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="1rmy11r">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="8:9m2w2">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="--5zm06"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="q_kwsi-">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="7dkahjo">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="4fpuvyd">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="qg1lyg-"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="b7:xbcc"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="jmusald">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="m6ro5pp">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="kzufol0">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="pe8_y6w"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="qop9yl:">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="zh:qc5l">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="ophp64s">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="h:b-:wp"
                                    >
                                        <span data-oid="q878y8r">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="ki034pb"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="rryycy1"
                                    >
                                        <span data-oid="m5qqgot">Books:</span>
                                        <span className="text-gray-600" data-oid="7a4y9m0">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="-hil68a"
                                        >
                                            <span data-oid="qgnd6u.">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="ol9z9ta"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="ayz.zri">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="mr6l7qt"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
