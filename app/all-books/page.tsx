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
                data-oid="35v72hv"
            >
                <div className="text-center" data-oid="rnppsl0">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="qqbg3:h"
                    ></div>
                    <p className="text-gray-600" data-oid="gl6tu-6">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="-jf94u5"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="upny7zu">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="1xy1q6y">
                    <div className="flex items-center justify-between" data-oid="pz30t7:">
                        <div className="flex items-center space-x-3" data-oid="xinik2v">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="vn9rjvt"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="ubd7xr0"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="u8.:q8y"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="mp-0a_-">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="hro-lx-"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="xwlsncn">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="--i2m_n">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="o-i5757">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="zctqijq"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="g5xsf4n">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="3uxvsex">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="c341qc8"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="r23fpod"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="usf6x.5"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="dp284nz"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="t.axpfd">
                {/* Connection Status */}
                <JSONBinStatus data-oid="ocebkoa" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="qv76:1v">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="dgwlr7e"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="r8s2z-.">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="cyqjjzl">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="3zrgnxa"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="lfpfx-o">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="z4kuki8">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="_xrkym."
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid=".5qa3sb">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="5281nb4">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="nmg4tj5"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="2jyey0r">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="1blmv9i">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid=".er-g8s"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="btgjpkg"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="8k4v388"
                            >
                                <div className="flex-1" data-oid="2tev4q3">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="80tno0_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="..c0j1w">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="3x.v2.u">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="6op39w6">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=".4.pu31"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="orr20:8"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="ro5h3r_">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="5q5bbzh"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="l:ph-nm">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="j-tgl5r"
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
                    data-oid="k3f7nx."
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="37gb4b-">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="04xu6ak">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid=".lfwip-">
                            <div data-oid="-48ds1v">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="1pa2skp"
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
                                    data-oid="ko5o4hk"
                                />
                            </div>

                            <div data-oid="zb69xh6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="g9ok04j"
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
                                    data-oid="jkrjo1k"
                                />
                            </div>

                            <div data-oid="t5o8w62">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="mmrc7i4"
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
                                    data-oid="zwfv8nn"
                                />
                            </div>

                            <div data-oid="q7_waic">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="_zox6:x"
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
                                    data-oid="sdvybqa"
                                >
                                    <option value="Want to Read" data-oid="gnou7i:">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="t_cxhpp">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid=".0ojrwi">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="_52z:2u">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="i:dp63h"
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
                                    data-oid="o1g:eca"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="g_uwjbk">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="x1.pa8s"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="co:p83a"
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
                    data-oid="5d8d0b5"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="quqp_:x">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="5p2w2t-">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="inrl.fh">
                            <div data-oid="dyh7dj5">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="65s84z8">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="_fef27f">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="wyl7wx1"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="-23iogf">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="m6jem1-">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="8sddojy">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="ye9e6x9"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="q78c6jz"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="da1h-xy">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=":1iaws1">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="0qi42oo">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid=".nbzir2"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="7ymz17c">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="9luovlk">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="ci112qe">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="ndebxo2"
                                    >
                                        <span data-oid="60e1:c9">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="xun_ts9"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="7rk_u9b"
                                    >
                                        <span data-oid="g9shc71">Books:</span>
                                        <span className="text-gray-600" data-oid="e:-39zq">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="cr4m1j3"
                                        >
                                            <span data-oid="ko0b50e">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="rvd5z3k"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="lx87i.b">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="chz1y-u"
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
