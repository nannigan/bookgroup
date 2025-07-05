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
                data-oid="._cpphc"
            >
                <div className="text-center" data-oid="guu5nld">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="r5aj38e"
                    ></div>
                    <p className="text-gray-600" data-oid="ree-ew:">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="4mvl0d3"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="ke86kjd">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="s3fm:tv">
                    <div className="flex items-center justify-between" data-oid="-l.pfjl">
                        <div className="flex items-center space-x-3" data-oid="z9ccpu.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="4aivyfl"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="66yz8j."
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="31awgyb"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="44g02az">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="c:oj1mj"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="uvoy:of">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="s0-s66i">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="n18_u8n">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="3zp9t6j"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="zss7:27">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="s6d0w_:">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="c8dm4dk"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="rh4q:70"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="gzyyj-s"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="-as2e2o"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=".v6tpbg">
                {/* Connection Status */}
                <JSONBinStatus data-oid="625lgs0" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="yklg85.">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="72:0o0-"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid=":292s0t">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="tkp4fdg">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="q_qkfl5"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="jhiz:9n">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="lvggog.">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="e-oi4ns"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="uezx6qq">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="ab-2g6g">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid=":59albu"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="wrbo1bt">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="k7:2gdr">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="t9sdumy"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="m:vz01t"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="we7r1bh"
                            >
                                <div className="flex-1" data-oid="16cfm-k">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="szgp6:3"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="edhuunp">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="48ow83c">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="19ciotr">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="x5a55ag"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="h19sasy"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="ynkc_-y">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="xslk8b."
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="u39t-jp">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="hkt.r9h"
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
                    data-oid="dma.2.t"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="l18a_54">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="rx1pz41">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid=":x4xy9a">
                            <div data-oid="uh29u9w">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="73e6bhk"
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
                                    data-oid="mzj-gat"
                                />
                            </div>

                            <div data-oid=":aqcef5">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="qz62b7_"
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
                                    data-oid=".-5r9vg"
                                />
                            </div>

                            <div data-oid="py8ojn9">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="p:7_1vk"
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
                                    data-oid="8gzm2qd"
                                />
                            </div>

                            <div data-oid="w.1odqg">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="jm_b6p_"
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
                                    data-oid="biktsmy"
                                >
                                    <option value="Want to Read" data-oid="z1bpsj2">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="0faeurv">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="n:99d_5">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="i-tncsr">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="a5:_wmy"
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
                                    data-oid="sr69kl6"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="ap3j-i.">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="_snb-mw"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="eqd84i8"
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
                    data-oid="4px2rkz"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="m8-2i7o">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="60aad04">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="5_6xlc0">
                            <div data-oid="wl6nfb2">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=":18vqv0">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="he-:x:f">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="tng:r4w"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="eh_faff">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="srctscj">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="2flt6kl">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="p17q8b8"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="80jwmj-"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="62p9-lu">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="v42w40h">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="h9kfnj:">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="u9e7bqn"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="b:an7nx">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ptui2t1">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="1i67fxp">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="vlvdmt4"
                                    >
                                        <span data-oid="5ul-.iv">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="cldgd4z"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="gtayfq_"
                                    >
                                        <span data-oid="r9lr299">Books:</span>
                                        <span className="text-gray-600" data-oid="-uc1m2v">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="76-e-ia"
                                        >
                                            <span data-oid="d-01_me">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="d2ebrfc"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="yod2cfk">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="ah2k-1_"
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
