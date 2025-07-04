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
                data-oid="amfsy0g"
            >
                <div className="text-center" data-oid="tl8b4mc">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="vvbj203"
                    ></div>
                    <p className="text-gray-600" data-oid="7cun6td">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid=":x3lx:s"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="0xzxa.:">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="p6icpn-">
                    <div className="flex items-center justify-between" data-oid="ke4dwqv">
                        <div className="flex items-center space-x-3" data-oid="6oebj9.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="jp4:rht"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="qjm18z3"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid=":liit_5"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="j6x_xjx">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="1d0u295"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="6yv:nbu">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="j6qbgj.">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="t0sulmu">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="f8ick09"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="8.v:xf7">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="mzt7lv_">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="_di2r1s"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="4.vatce"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="h4j2__0"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="x8j2ia."
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="2r7jh3l">
                {/* Connection Status */}
                <JSONBinStatus data-oid="d2usr0q" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="p28rjyy">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="z39gvtn"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="lmgnh96">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="-n8noo-">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="fqgv28_"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="q7_xiug">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="uf35t45">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="ddmcfwt"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="7fbtk31">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid=":8ndb9q">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="9uptsov"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="278715z">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="s:_w.oi">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="sfl74_p"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="uqfejgs"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="g:33446"
                            >
                                <div className="flex-1" data-oid="hiw7bja">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="z12uote"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="2w6bj55">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="5l8x7t1">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="1_ht.oj">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="k:vmv.6"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="-c7h3zt"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="psxvx4o">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="e5wams9"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="3n3dhln">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="iw279km"
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
                    data-oid="79uwndh"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="p3prtv0">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="rm4qvg_">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="ehpx432">
                            <div data-oid="xoi6vsp">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="8mnx7d4"
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
                                    data-oid="wi3fd08"
                                />
                            </div>

                            <div data-oid="9lgbug6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="pd8d0hc"
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
                                    data-oid="av59n.f"
                                />
                            </div>

                            <div data-oid="t8iji9u">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="nbja0yw"
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
                                    data-oid="ylmvc_w"
                                />
                            </div>

                            <div data-oid="wao6_8:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="u4yylli"
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
                                    data-oid="bwnntie"
                                >
                                    <option value="Want to Read" data-oid="ousa0je">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="s3xc_uh">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="a7vg2y2">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="zw_s6l3">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="mu718xg"
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
                                    data-oid="ynrx8yk"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="wtr10e2">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="qcs73i-"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="4kvdo6r"
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
                    data-oid="5tof4o8"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="5zjotwg">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="yan5mma">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="96ygc:e">
                            <div data-oid="x42pkb6">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="lgg9ebq">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="fluevqs">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="fve:x_4"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="vib5vag">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="-v8:a8v">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="ooa-6l5">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="lo9kqpe"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="20ng:h-"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="89pg:no">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="4fj:l9y">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-8xy9ki">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="yf5mstk"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="jwtykkw">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="x:5i:mu">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="2ajublr">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="vnzi14."
                                    >
                                        <span data-oid="1.m6l_7">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="oic_771"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="_ch3wdo"
                                    >
                                        <span data-oid="ddlcxm9">Books:</span>
                                        <span className="text-gray-600" data-oid="1xa5izl">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="l:fo9at"
                                        >
                                            <span data-oid="_06qf_w">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="_64y4.."
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="na391f:">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="jagz9uf"
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
