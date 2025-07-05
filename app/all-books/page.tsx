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
                data-oid="ykem209"
            >
                <div className="text-center" data-oid="-tppjk4">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="6.zah9z"
                    ></div>
                    <p className="text-gray-600" data-oid="opxn3ig">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="gytnu:w"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="q-4yrta">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=".x3ur5j">
                    <div className="flex items-center justify-between" data-oid="vs-a7of">
                        <div className="flex items-center space-x-3" data-oid="6l5kq8r">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="sns_oqp"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="d:3kbbq"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="od40gp7"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ttg_v4j">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="i9hohyd"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="6.lr5tp">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="2m1_bo6">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="ri4cl0h">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="2e-xenm"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="21mu4m9">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="oudy3g_">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="vbxnlvn"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="xyb7s8u"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="f759hww"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="56w0wq6"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="o2w4x0r">
                {/* Connection Status */}
                <JSONBinStatus data-oid="ajqx9jq" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="e:njxze">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="x17dqtt"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="qxqqc6r">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="nz2.w1w">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="vzan26p"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid=":qlx1c4">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="u:ij77s">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="l888ujm"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="xyf-cn:">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid=":1n9wu-">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="d7j5.jd"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid=":5n8h5d">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="gbm_ttk">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="ejnlv9z"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="765dhp8"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="9k1wlxa"
                            >
                                <div className="flex-1" data-oid="s:gvqe0">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_2wzbd9"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=":wqp_o_">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="73y.1wu">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="r4xiijs">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="0m4476."
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="6e_k30l"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="je2u8kd">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="yyicxgg"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="2kycpq8">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="c3cmwdw"
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
                    data-oid="trp8t45"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="ylo64:v">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="j87zsqe">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="ssgxjp1">
                            <div data-oid="2tzbe.y">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="uf0l7_7"
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
                                    data-oid="js.z0bk"
                                />
                            </div>

                            <div data-oid="p-thp6_">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="nfn554i"
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
                                    data-oid="jh_o8wf"
                                />
                            </div>

                            <div data-oid="p90iq9e">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="cxv9:zp"
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
                                    data-oid="b.9v41a"
                                />
                            </div>

                            <div data-oid="k3.82t3">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wnx9qve"
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
                                    data-oid="kptvoww"
                                >
                                    <option value="Want to Read" data-oid="qi9qrr4">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="b076zpi">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="uatvbib">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="wd8ttki">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ba7zwc:"
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
                                    data-oid="o11dq_r"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="l1pdsku">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="ptqvtm5"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="5voxsqo"
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
                    data-oid="fqw428g"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="fr5n2gi">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="kgoki7e">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="h72_kkw">
                            <div data-oid="26cfpbx">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="b6e-59b">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="c1i-vbu">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="_ylwmwh"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="ta1gip7">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="gu-lghx">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="smtkdc8">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="okm6m0p"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="5wfzcsw"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="bnobb5g">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="-rk3.ov">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="xyrp-7:">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="v0f3jg:"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="-z88dp6">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="dtpfye5">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="7j:ar-5">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="jmje3j6"
                                    >
                                        <span data-oid="h5-jv6j">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="742gwjs"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="0yb_2ii"
                                    >
                                        <span data-oid="85q_yj_">Books:</span>
                                        <span className="text-gray-600" data-oid="31m7ctp">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="7_gdtb3"
                                        >
                                            <span data-oid="wboo3vn">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="b21mpu2"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="f09s_9a">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="0j_g3b-"
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
