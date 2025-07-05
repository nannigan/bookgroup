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
                data-oid="52-710b"
            >
                <div className="text-center" data-oid="l:xe19b">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="o2au1yh"
                    ></div>
                    <p className="text-gray-600" data-oid="zlgqf4u">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="3:g9mhh"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="w2le7lb">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="wjjhgn9">
                    <div className="flex items-center justify-between" data-oid="37inwyj">
                        <div className="flex items-center space-x-3" data-oid="om13pyo">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="qwt7egp"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="v0d92bj"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="r7ipc.7"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="vf6b9-i">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="p921.f:"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=".fok87j">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="5c-_52q">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="38lj:6h">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="h_cnq-."
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="ih1v:q7">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="1fqy:kn">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="l09h5np"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="ogwx2:q"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="8e64:gq"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="fbvfwca"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="mj7j6bv">
                {/* Connection Status */}
                <JSONBinStatus data-oid="xxs7xym" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="ew59p9:">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="v:0jkj9"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid=".41jie-">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="pwg7d8m">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="01wf9yv"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="sn54grj">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="ebcq.4o">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="wjd-nw2"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="t5my:4q">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="h1kq2e6">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="9nlqjgi"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="w1y-039">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="7eg9u-w">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="e4z-xxm"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="sg18sn."
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="thzf:85"
                            >
                                <div className="flex-1" data-oid="g70.ab5">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="u222yaa"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="dbmk61r">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="bpzrbf8">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="3xt-m6i">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="ecqf97q"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="m6lkevv"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="p_pcz61">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="unw3966"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="42oxiqf">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="36sntw7"
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
                    data-oid="t6q:3ft"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="bra7.pz">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="o9x4hsx">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="_n:xx:m">
                            <div data-oid="uwa7iio">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=":d53ljn"
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
                                    data-oid="57ic7hm"
                                />
                            </div>

                            <div data-oid="xn65ix0">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4ea8d8l"
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
                                    data-oid="oi9vcqy"
                                />
                            </div>

                            <div data-oid="nj:e5.e">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="tg_ha0e"
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
                                    data-oid="m0lf5tz"
                                />
                            </div>

                            <div data-oid="vt362bh">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xjwmmtp"
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
                                    data-oid="nx9d5wh"
                                >
                                    <option value="Want to Read" data-oid="bcgp8q9">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid=":2hq9de">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="tw1vo8j">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="k68:-2s">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="o:7.ltw"
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
                                    data-oid="iahzefn"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="rdg5ii6">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="p25u69n"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="unkrgay"
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
                    data-oid="cqs7uyt"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid=":f7-dv6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="c3fr156">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="3.-w9s-">
                            <div data-oid="m-kmmls">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=":wlh03v">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="v-unu-_">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="u2bu-ex"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="gqt-72g">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="14yg9ke">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="e0px7gn">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="0cab6mb"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="ytkyxd8"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="o1z8m3.">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="2suqn5m">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="5514f8e">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="81pvhhm"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="c_ijowf">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="zutcaa-">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="q4u9_t5">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="6ne6.yy"
                                    >
                                        <span data-oid="as6ax6d">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="wslzqs2"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="ty5_5v2"
                                    >
                                        <span data-oid="rc-zzhs">Books:</span>
                                        <span className="text-gray-600" data-oid="c22-q4t">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="c9v9an4"
                                        >
                                            <span data-oid="vgja04e">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="_x-q.s1"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="9sunj:k">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="zub83x."
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
