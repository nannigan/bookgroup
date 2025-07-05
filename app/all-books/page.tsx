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
                data-oid="qiyryx5"
            >
                <div className="text-center" data-oid="ubtxxtq">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid=":vq9f1v"
                    ></div>
                    <p className="text-gray-600" data-oid=".gtfsm4">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="kozeq7c"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="sgc29tb">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="7_vn-y7">
                    <div className="flex items-center justify-between" data-oid="9t5.o1y">
                        <div className="flex items-center space-x-3" data-oid="eu6eaf.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="q7lo2io"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="plw.r:2"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="s1tm.su"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="xiu1iy4">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="0ch4-7v"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="_l4o281">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="agc3.0v">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="3oo344g">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="lewcrmw"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="tf_5c97">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="9jp:z38">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="av68lfo"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="93x6fd3"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="3c-mbb5"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="iv_ecc5"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="xxc0cc1">
                {/* Connection Status */}
                <JSONBinStatus data-oid="72e.ge:" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="5_jv32j">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="a9osutg"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="opwr6ph">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="7rzsrbl">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="jzin.dp"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="-mghzf9">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="i03lyn_">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="l3.qs-e"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="7zpu91o">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="mh63lqq">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="dnj54gs"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="y9i_hfl">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="g_jp517">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="fd7n8kw"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="742tf5g"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="g0z.n6-"
                            >
                                <div className="flex-1" data-oid="b3h_kzc">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="-blxr40"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="5wo582e">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="kuuz6gj">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="za2pl.n">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=".g0pg3r"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="8m.ii_9"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="_64zcbs">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="15:3nf6"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="6-z.a-6">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="f_kl59m"
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
                    data-oid="w-17woa"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="f57-847">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="afnsm7.">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="dd1qrs.">
                            <div data-oid="zwjcfl4">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wzwmfz_"
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
                                    data-oid="0pgfuks"
                                />
                            </div>

                            <div data-oid="hzcoagz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="-n5rrm1"
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
                                    data-oid="un:1965"
                                />
                            </div>

                            <div data-oid="vsuihad">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="k1o6jzz"
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
                                    data-oid="uym25p1"
                                />
                            </div>

                            <div data-oid="u81.gq:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="yalmd2_"
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
                                    data-oid="6-y31ua"
                                >
                                    <option value="Want to Read" data-oid="bur87gl">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="5vc43ip">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="uol_.o.">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="5ivjy2p">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="-c:6a_p"
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
                                    data-oid="j8y_yk8"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="m37pls9">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="7l8qy2d"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="gq80mi5"
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
                    data-oid="4uistdr"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="s80tdy_">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="p592ye.">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="p6j39y3">
                            <div data-oid="rh5i:t6">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="xf61gk9">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid=":yodueo">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="-p:11oe"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="-igs5da">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="fmvk6va">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="cfhpgzw">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="btdf18h"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="6w5k7a7"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="otz_.my">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="nk6bemy">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="xl-cj:m">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="s0sb9-5"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="_6bhsa0">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="uy3-ddx">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="92b4yi_">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="xdbug.m"
                                    >
                                        <span data-oid="2paux9s">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="jd2y3sv"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="-5g52ma"
                                    >
                                        <span data-oid="jk_6bmu">Books:</span>
                                        <span className="text-gray-600" data-oid=".41g-be">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="_yuz5l3"
                                        >
                                            <span data-oid="q13zx2b">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="jzfuit4"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="dew5aho">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="ypwso3o"
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
