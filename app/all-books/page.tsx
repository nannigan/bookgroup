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
                data-oid="8.qk8ol"
            >
                <div className="text-center" data-oid="fbih13w">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="o278if9"
                    ></div>
                    <p className="text-gray-600" data-oid="c0swi7f">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="ps1uros"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="953k37v">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="9pdk.nn">
                    <div className="flex items-center justify-between" data-oid="_0pebq2">
                        <div className="flex items-center space-x-3" data-oid="gz5_eqr">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="y946fee"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="yhp_es5"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="0mvxrao"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="b8ibx0x">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="kkuq:r7"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="5zl5hwk">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="3uihbxh">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="iykw0yv">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="57zu54p"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="omkcsy2">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="u4i1p1_">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="y-7a.jv"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="agdyv67"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".annv0_"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="65m_it-"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="tjxntga">
                {/* Connection Status */}
                <JSONBinStatus data-oid="n74zi.r" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid=".3dpvi7">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="_lbvmts"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="0s6l-lc">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="3bvv2-k">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="q4p7vl4"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="pivaasw">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="x.lomg6">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="f.xajtt"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="35j8elj">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="e1-4z.g">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="efysl00"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="86:1gu2">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="4pmkpqe">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="xro4j-b"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="c_tr5mj"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="4pgf_f0"
                            >
                                <div className="flex-1" data-oid="6r3foip">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="b8o7mxa"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="hh9agbl">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="j0d691g">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="87d1aox">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="z99ll3i"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="lzuj2vp"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="sc4kpjm">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="h.aaip8"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="6.efnae">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="ethmd3i"
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
                    data-oid="zdg0k2p"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="tx8gh5v">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="hal8_f7">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="7zk._d2">
                            <div data-oid="qfzu2q:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="eyxbc0l"
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
                                    data-oid="f2mz:od"
                                />
                            </div>

                            <div data-oid="tiq-135">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="rvx4vbn"
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
                                    data-oid="kn_in2b"
                                />
                            </div>

                            <div data-oid="iopch3d">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="zc8x.ir"
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
                                    data-oid="qilo_qq"
                                />
                            </div>

                            <div data-oid="1h:dq7f">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="3p98y29"
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
                                    data-oid="-mhc-n5"
                                >
                                    <option value="Want to Read" data-oid="q:_67sm">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="qu96op7">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="ben61-1">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="qecuuyk">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xjdkj.e"
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
                                    data-oid="_ebm2wf"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="h2.ah79">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="f0b-e0x"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="9-gvfcf"
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
                    data-oid="qb4r52u"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="hhydmag">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="d2e0pt_">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="om:mnga">
                            <div data-oid="ea50l77">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="5jgnn:o">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="jelvhq4">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="4:r-o0s"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="f14f2fo">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="k6p8e0h">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="4voix2x">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="z:.99ep"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="6fmqb-n"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="z8c9roq">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="npeqmoi">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="46a_hef">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid=":b:r.qd"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="foc0o5d">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="42_6o45">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="5yacux8">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="jjtt9j5"
                                    >
                                        <span data-oid="w1:nwdb">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="7lnkevz"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="hoog8r2"
                                    >
                                        <span data-oid="jh77rl2">Books:</span>
                                        <span className="text-gray-600" data-oid=".i0afmx">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="0knr4ba"
                                        >
                                            <span data-oid="s9m.j4k">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="5u8b:u_"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="zjleu_g">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid=":6k:my6"
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
