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
                data-oid="zcqey3u"
            >
                <div className="text-center" data-oid="v8l:-.6">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="4vq.2_w"
                    ></div>
                    <p className="text-gray-600" data-oid="9dqsdv7">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="mpnv05u"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="eprlymd">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="eph4g3-">
                    <div className="flex items-center justify-between" data-oid="r125f-d">
                        <div className="flex items-center space-x-3" data-oid="9b21kgx">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="ql8pjss"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="xci6u20"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="m-6rhdk"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="s1cu_yh">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="k.ino-m"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="90mp8u6">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="iesa8xw">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="qy.px3x">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="_3decif"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="0:jcor4">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="j_aewnf">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="-mxdz7o"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="9.duw.4"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="9u_.a6b"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="kco94_4"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=":1ix8uo">
                {/* Connection Status */}
                <JSONBinStatus data-oid="a1vw23v" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="3fwx74k">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="uiwd0.8"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="xnetj-7">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="p4w7mt8">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="ogwohmk"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="b-trtnz">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="x_he9k0">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="y66r-j1"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="ndubdwt">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="tzbsvd2">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="vfdd:n7"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="eiuwh2.">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid=".:3cjxg">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="gtfrqy6"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="n-aq_z2"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="l9fmtgt"
                            >
                                <div className="flex-1" data-oid="w.se6bu">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid=":_0z6iu"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="42nonop">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="faz79tx">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="xw_7skz">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="6-.zj27"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="3unw0c6"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="s:e_akj">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="8g2n4xo"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="395obs2">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="99lukxr"
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
                    data-oid="wf3u3tc"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="_qewr_m">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid=":n1an.2">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="ix_11p9">
                            <div data-oid="xtnxdln">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="l03ku:m"
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
                                    data-oid="3o.0v7q"
                                />
                            </div>

                            <div data-oid="4tywc0h">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="pcl-m67"
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
                                    data-oid="efc5xnb"
                                />
                            </div>

                            <div data-oid="cc108j_">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="aoejtqb"
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
                                    data-oid="9y2kecb"
                                />
                            </div>

                            <div data-oid=":g0rj8m">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="da8nsmo"
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
                                    data-oid="5wh221i"
                                >
                                    <option value="Want to Read" data-oid="1jd-e-o">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="flr__5i">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid=".tic8jw">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="u4dmzcz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="8o2nuno"
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
                                    data-oid=":ok3n_n"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="mwbuxjl">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="2m:dug0"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="67mw9x6"
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
                    data-oid="u-pu4rd"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="4:hmutu">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="ga2is56">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="ruy9.pp">
                            <div data-oid="lpfg0:u">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="c9xq9gh">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="h:7:i.n">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="-9__znn"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="5r4hqu4">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="01x99ji">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-8bkbgz">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="e056qr:"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="y.0ryz_"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="uw-ib2w">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="_mmxc2t">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="wbi6zg2">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="hfd478w"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="8oqte:_">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="lb37kws">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="fg6y6dk">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="0yfpt3p"
                                    >
                                        <span data-oid="q-045yl">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="12muq7."
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="kgt-cde"
                                    >
                                        <span data-oid="r3w0vhh">Books:</span>
                                        <span className="text-gray-600" data-oid="59a910t">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="4z62oex"
                                        >
                                            <span data-oid="6ya_6a1">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="u1ft09g"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="zdexjkl">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="vslwpvd"
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
