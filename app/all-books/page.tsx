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
                data-oid="2vixq0n"
            >
                <div className="text-center" data-oid="0bfs.w3">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="j_2aux9"
                    ></div>
                    <p className="text-gray-600" data-oid="23_gmps">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="yztv-v1"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="vv0fvjr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="sp.4myd">
                    <div className="flex items-center justify-between" data-oid="xk.boq5">
                        <div className="flex items-center space-x-3" data-oid="572q2ta">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="jshwlsq"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="cbhnk5."
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="tnusx:b"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="1-q1et6">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="sp5vylb"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="78bhtqs">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="u3-2jzj">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="hvw:9ss">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid=":zzi_nh"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="ms-.ioe">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="fu74ih.">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="buwtiqn"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="x1r9di:"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="0.kk1vy"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="v0uayvs"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="7hje6z_">
                {/* Connection Status */}
                <JSONBinStatus data-oid="6z5m1cf" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="g0ujnbg">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="xvpj493"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="b.p9k.n">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="ivfy5g.">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="rpady1a"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="zb9.pk_">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="_rkc0xu">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="toimjh1"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="imme:o2">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="2p-j_3w">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="6v.u2or"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="i6wrmv3">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="ylck7xd">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="9-a032c"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="312796x"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="8zdg9lt"
                            >
                                <div className="flex-1" data-oid="::rh9ab">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="4tgt.1s"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="h58h1:f">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="0.g3i0y">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="1952zqe">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="c7ubu2y"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="s0wi-sq"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="9t-rc0s">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="zzk5-fy"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="0kyuh9f">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="8:xb:1e"
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
                    data-oid="equljp."
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid=".sasu:l">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="xt_6evf">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid=".b..5mf">
                            <div data-oid="od5n4ld">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="c-9bbxl"
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
                                    data-oid="qo.eqfe"
                                />
                            </div>

                            <div data-oid="f:dmgww">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="k0vpov1"
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
                                    data-oid="yw0h378"
                                />
                            </div>

                            <div data-oid="9lu1.:a">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="-0ie.3f"
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
                                    data-oid="t-6y2gg"
                                />
                            </div>

                            <div data-oid="nr4eifr">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="crky4xx"
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
                                    data-oid="wpmokt9"
                                >
                                    <option value="Want to Read" data-oid="z-f.9a3">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="vm.ni.x">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="azdlkk.">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="jkd-kgo">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kctj0-4"
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
                                    data-oid="f5zs..z"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="p5vxc98">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="q25.yfh"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="5u:l2qa"
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
                    data-oid="gklv180"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="styiwn_">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="czu81zc">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="otj:wh.">
                            <div data-oid="qd8.bwk">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ukn2nbv">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="pdw8_0s">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="36:9t0m"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="fd9.-_0">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=":fp532k">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="hp-56ii">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="8i8eqo."
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="nz7xsbi"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="sc8cbpx">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="bnoog:s">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="9ki_-g.">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="dno4a8:"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid=".y.-78g">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="6bkp1kb">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="qcd4-0r">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="gvazv--"
                                    >
                                        <span data-oid="rr0dl:k">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="mtu_c29"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="cb7.1hw"
                                    >
                                        <span data-oid="u_1f:3e">Books:</span>
                                        <span className="text-gray-600" data-oid="z.7z30n">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="5hm:hvf"
                                        >
                                            <span data-oid="veuepg1">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="m796:br"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="m:0.eh-">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="rxvze01"
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
