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
                data-oid="-bufas-"
            >
                <div className="text-center" data-oid="09fsd_z">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="-kbbqe1"
                    ></div>
                    <p className="text-gray-600" data-oid="z_85zpd">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="j6ct2gs"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="e1-:_8q">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="sz3q3n7">
                    <div className="flex items-center justify-between" data-oid="fa9.66p">
                        <div className="flex items-center space-x-3" data-oid="gma_27u">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="tvciv_l"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="tgds.e6"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="mkt2f7w"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="_-qw2-g">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="htew15p"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="ezgbzan">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="wqj30-l">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="t3t.t.4">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="n:9c9-a"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="tarrhbe">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="byauh_9">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="3clr17f"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="qz1j3mc"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="nx.yj-8"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="7:80fj."
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="jcqsfmk">
                {/* Connection Status */}
                <JSONBinStatus data-oid="qh0yq2-" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="70hp-d-">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="7cnd8gw"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="s9.in_c">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="tcd-pim">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="z:fxiqe"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="tihg0b8">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="0tpbbol">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="z_d8s:u"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="619s9-j">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="tib:2_r">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="a9iwg50"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="5a_14lc">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="ktzsf55">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="-u_1z-h"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="4sey2hr"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="ev0.hr6"
                            >
                                <div className="flex-1" data-oid="8p80an:">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":_28p2_"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="mm51c31">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=".2yh2n-">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="5deyh8z">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="14wqvnw"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="3eg3q0k"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="pmkleu5">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="2nfzdc:"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="t7zykqn">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="cd90:hk"
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
                    data-oid="z_l70_p"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="6p13lks">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="2429ty_">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="2-kck.k">
                            <div data-oid="kt95cti">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="pr1t5x."
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
                                    data-oid="biu8cvt"
                                />
                            </div>

                            <div data-oid="acladx-">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="g4d0gx4"
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
                                    data-oid="5c:-jum"
                                />
                            </div>

                            <div data-oid="vo-oj.d">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="oo0t4ba"
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
                                    data-oid="-fnejcv"
                                />
                            </div>

                            <div data-oid="i:i6ndo">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="gl_0tkm"
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
                                    data-oid="8u43zyx"
                                >
                                    <option value="Want to Read" data-oid="u8du_bk">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="3x079cb">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="r2eqce7">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="njl4loz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kkw7nfb"
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
                                    data-oid="bgcfu4z"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="akrn.7i">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="iik56hc"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="i3q5ryl"
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
                    data-oid="00vx7-5"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="sycri-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="w.lj3o6">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="3.is.ky">
                            <div data-oid="0v1lzag">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="m36icpz">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="nj811ai">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="zu5asfd"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="v5_m7by">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="bvwrs4t">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="63ls3q2">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="gn54fsw"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="8pfjh:y"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="1-_hc2g">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="1u49zqy">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="dpbzgb6">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="vxh-.ez"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="1.p6nk3">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="os9yobh">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="4.0d-d7">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="chwuksp"
                                    >
                                        <span data-oid="l9i:7wq">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="7wxwtse"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="qrf2ck5"
                                    >
                                        <span data-oid="dis.z4n">Books:</span>
                                        <span className="text-gray-600" data-oid="kfa04dr">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid=":cf68at"
                                        >
                                            <span data-oid="_in06au">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="l:v0jj8"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="sibqw8_">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="e--qxx7"
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
