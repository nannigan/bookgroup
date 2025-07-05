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
                data-oid="wk9ep0-"
            >
                <div className="text-center" data-oid="fhfcz97">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="mbafwbk"
                    ></div>
                    <p className="text-gray-600" data-oid="n.:ca.4">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="fmi2nxm"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="6rdj0tt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="1z3yz2s">
                    <div className="flex items-center justify-between" data-oid="86zolmj">
                        <div className="flex items-center space-x-3" data-oid="3pxcm5x">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="7xkdc-_"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="sjyc9ja"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="-yl37iw"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="u:6sj6t">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="obd7gli"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="j31qtok">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="8r8ye6r">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="fa5c1zu">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid=":y_6h-k"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="ycll4gx">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="s6o8-g-">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="lltbtxe"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="zm7ff84"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="wnf6aa6"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="awb3dxp"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="_c:69tk">
                {/* Connection Status */}
                <JSONBinStatus data-oid="l8v1h7z" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="8:8cx_7">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="k:c_5k0"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="5ulc9zb">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="8qz4s2r">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="1a2a8zz"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="70ciebz">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="13y431s">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="c7nalhm"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="io_kq08">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="lfockdy">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="lisn.vj"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="ani.loe">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="60:o-iw">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="jdajgyd"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="c:-t93n"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="52klc9n"
                            >
                                <div className="flex-1" data-oid="rvb_i_t">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="kkkn58v"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="iz.fkob">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="x8w-41_">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="sr8lhnc">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=":fk8sz9"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="dh957xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="5p39sbk">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="zs3xjou"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="ihfyi44">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="ruw2wgu"
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
                    data-oid="o37e-u2"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="7agp-de">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="gilcj9.">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="r.8p9-f">
                            <div data-oid="8b2mti5">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="k:n.cjf"
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
                                    data-oid="m61u1yt"
                                />
                            </div>

                            <div data-oid="_dlrjcs">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="i:gjos-"
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
                                    data-oid="3.hy9q6"
                                />
                            </div>

                            <div data-oid="hxmxyi6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="5vun.3x"
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
                                    data-oid="_2.2vss"
                                />
                            </div>

                            <div data-oid="ln.rs11">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="23rnn60"
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
                                    data-oid="m1j:q1z"
                                >
                                    <option value="Want to Read" data-oid="prys4p7">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="0038npw">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="6f:_ixg">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="kjcu5it">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4jxbes:"
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
                                    data-oid="crexq-a"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="-fu-rlc">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="f:3h9:t"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="pqwr1ls"
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
                    data-oid="qusd-kb"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="psay3jr">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="4dt.5ks">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="omys2.0">
                            <div data-oid="::yytw_">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="_ro8c6_">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="r8-6.i5">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="l2nt3z2"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="8en-c1l">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="1k.qqc7">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="fe-c8ct">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="izbz3r4"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="w4lp5q7"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="odzzuz4">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="h2gokpl">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="db12-3-">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="k56s.0c"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="d743u0j">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="w8j3qxm">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="thi23u_">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="4k22:4h"
                                    >
                                        <span data-oid="7ni33o7">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="fe_cggy"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="zjyeima"
                                    >
                                        <span data-oid="yyr289s">Books:</span>
                                        <span className="text-gray-600" data-oid="a5ku1a7">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="45141e0"
                                        >
                                            <span data-oid="4sg0ym2">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="lrjpk00"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid=":j4-gmn">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="tvr.fkq"
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
