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
                data-oid="z82tv3f"
            >
                <div className="text-center" data-oid="_him4s6">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="xa6q2au"
                    ></div>
                    <p className="text-gray-600" data-oid="augo_hf">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="h.cr8dd"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="quzk6to">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="17bq.w8">
                    <div className="flex items-center justify-between" data-oid="7d4qp:_">
                        <div className="flex items-center space-x-3" data-oid="6s5hs3d">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="ed96xt8"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="cz29v49"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="-fx_edb"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ouut8ff">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="vsso25e"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ag:g6xb">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-dylcie">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="ptlfdvr">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="9u9f.2q"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="k3e-.6q">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="wq6ub9a">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="nyvfuj_"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="k2.s3s0"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="n98f0dd"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="q4dcdih"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=".6.dwyf">
                {/* Connection Status */}
                <JSONBinStatus data-oid="5feh9uk" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="h-o43k_">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="pve81i."
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="hptn6zk">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="qcw._sg">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="7u3swws"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="4-6ec6t">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="kqx0e1.">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="nc.fl_i"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="0e5i1kg">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid=".ghv6h-">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="2w3r5uu"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="gsmq9:7">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="usoq4dd">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="_b3sf:_"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="je772v0"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="7.njm__"
                            >
                                <div className="flex-1" data-oid="rfqfic1">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="zzi0dq6"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="0.-.jam">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="68irl7o">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="c9qhgbi">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=".3-pp36"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="b3-djvn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid=":u7nijl">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="3j5d74a"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="x3cwyds">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="iot:dtw"
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
                    data-oid="y:.5_zz"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="n4nc:e2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="p00ki5i">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="pwlgt91">
                            <div data-oid="7db09ym">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4-5l:t2"
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
                                    data-oid="57i34bh"
                                />
                            </div>

                            <div data-oid="-lrf_b:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kge1yfd"
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
                                    data-oid="1b0-r0_"
                                />
                            </div>

                            <div data-oid="q20y0qc">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="zdnvcdz"
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
                                    data-oid="4he6lt6"
                                />
                            </div>

                            <div data-oid="qlkmix7">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="aqm.k-a"
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
                                    data-oid="x0u-ihz"
                                >
                                    <option value="Want to Read" data-oid="ea_yph9">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="nzn.fli">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="seh1x9p">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid=".gzvjzg">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="rgi8.5y"
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
                                    data-oid="3jj:0w0"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="x.evk:4">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="_89rwz_"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="wgznvsd"
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
                    data-oid="dyr7yyp"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="jqk0.-h">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="1:urw7f">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="uiob61i">
                            <div data-oid="fx-tq:v">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="o:8o8uz">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-iqknyg">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="_5s58r7"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="n2urjq8">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="3m480yt">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="rh88ov1">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="ymq4joq"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="iki9ui:"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="lysy_x7">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="-f1:z7u">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid=".6vlb.e">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="3az06rg"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="b6-6227">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="48fho7s">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="bts36j0">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="r3yc6aa"
                                    >
                                        <span data-oid="d28ytg_">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="qocto24"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="q_:n154"
                                    >
                                        <span data-oid="r.lyxip">Books:</span>
                                        <span className="text-gray-600" data-oid="kudyx03">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="okygfqe"
                                        >
                                            <span data-oid="89xclgs">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="z_r-qpn"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="0ijibb2">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="8-i:t9q"
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
