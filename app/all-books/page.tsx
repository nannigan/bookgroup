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
                data-oid="t4wn8zp"
            >
                <div className="text-center" data-oid="u75l5ye">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="0iaguv5"
                    ></div>
                    <p className="text-gray-600" data-oid="a1.f6-r">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="9zd:ox8"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="5k-2-gy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="i-p4fv_">
                    <div className="flex items-center justify-between" data-oid="sfpwj8y">
                        <div className="flex items-center space-x-3" data-oid="q1m-v_u">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="7u0h_18"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="tmj0lkr"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="r9e8i_8"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ycotdhd">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="s3w6zbz"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="wyj86ti">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="zyrmw2u">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="k.7ezym">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="_dv3i22"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="wpk.z:z">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="5sfd:-u">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="jvnuxu."
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="r-crutw"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="3-o9-sy"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="21y6s:g"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="i34bn3a">
                {/* Connection Status */}
                <JSONBinStatus data-oid="-2ce5_3" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="vw_ytki">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="isnqtn:"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="eot44n0">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="7cvmhm8">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="acn6e8v"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="__6tl2b">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="61x9jn.">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="4yu7-bo"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="fxg1qwp">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="rkd65rc">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="x5wy.cj"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="ebk9z--">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="qepawb0">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="h6acjz:"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="l7qj-4-"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="8931h2h"
                            >
                                <div className="flex-1" data-oid="mo8pby0">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":96-xnn"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="xkw-nzu">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="nwhc89b">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="5-rn0an">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="7ttr29z"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="chxsnb0"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="7h2-97x">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="2072-jh"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="oypor2:">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="olspg2f"
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
                    data-oid="3t1iqrs"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="jjd1.ya">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="wh1:j3l">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="89d0xi.">
                            <div data-oid="cw2z-w8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wkbx.uw"
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
                                    data-oid="4cl-7h7"
                                />
                            </div>

                            <div data-oid="u:._t.w">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="gil1c0h"
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
                                    data-oid="55206eq"
                                />
                            </div>

                            <div data-oid="8m-voht">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="t7g6agg"
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
                                    data-oid="y0:0xla"
                                />
                            </div>

                            <div data-oid="53qtsqg">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="vm9evwh"
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
                                    data-oid="uhdy2-p"
                                >
                                    <option value="Want to Read" data-oid="3sv2:.9">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="ppctujt">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="_9r3dgp">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="zz2pd35">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="e49:rho"
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
                                    data-oid="h:3yo_:"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="sd2g9bm">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="5_hsukw"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="r3tom6-"
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
                    data-oid="m.tfeh1"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="apqx_6k">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="ejbr.xw">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="sm2j.px">
                            <div data-oid="q6w1rb_">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="2xd1ex7">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid=".u57mt_">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="afksb:3"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="gcn02_0">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="8t0nqe0">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="g3ff3py">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="n:ul6b8"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="ib1:chh"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="864d.-f">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=":rx4.43">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="_lgyunu">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="k_ztbjh"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="hl:njz5">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="2:yri1c">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="hc-sso1">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="ys50g6."
                                    >
                                        <span data-oid="j_56.rc">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="adfs7yq"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="duq4pke"
                                    >
                                        <span data-oid="_bx4lkl">Books:</span>
                                        <span className="text-gray-600" data-oid="sqm4ify">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid=":cd.ueg"
                                        >
                                            <span data-oid="l-6l1vi">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="6ym8bn5"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="6cq-_2i">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="npqmojf"
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
