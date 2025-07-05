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
                data-oid="crg31lp"
            >
                <div className="text-center" data-oid=":ht3za.">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="n77octb"
                    ></div>
                    <p className="text-gray-600" data-oid="59m80v7">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="qjgok6_"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="kceqt-_">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="s2h-z18">
                    <div className="flex items-center justify-between" data-oid="ub3zu9z">
                        <div className="flex items-center space-x-3" data-oid="yr5ujyp">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="fw8p2a-"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="h3yjja:"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="xe3q8-i"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="t2ev7gf">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="uhrmujy"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="32xt5e3">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="k-k_u0y">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="_a_kn3z">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="ya_4z2p"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="j_km2:a">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="7um1bzb">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="qj.d6ld"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="6aucm0c"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=".-ypn:1"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="eu_:n7w"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=":balp:_">
                {/* Connection Status */}
                <JSONBinStatus data-oid="wni91::" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="wlysomm">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="7lxqtfp"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="os693oc">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="srt6t3p">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="_ga8f86"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="405xe6s">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="9w624rm">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="c9oqwtm"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="_xhrq5l">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="ng58uhf">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="_vrm_zy"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="wpvhstk">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="vpyoz1i">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="bxyzs2v"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="k8gcerj"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="k-a2oh-"
                            >
                                <div className="flex-1" data-oid="owl:toc">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="pquqm2m"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="qx5:go:">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="jqigurj">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="wg2.vvf">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=".lc5tk."
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="6ai3oot"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="74_ne4f">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="p3xdeo."
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid=":e8fkpz">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="r:q-kxl"
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
                    data-oid="bv1nmbi"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="zu9oxl9">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="lz2rlew">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="wvdk16n">
                            <div data-oid="gqg-c_h">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=":dyptl1"
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
                                    data-oid="v_plam."
                                />
                            </div>

                            <div data-oid="gyp1j6y">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4bvhsqs"
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
                                    data-oid="9l2:-0q"
                                />
                            </div>

                            <div data-oid="7e1i4:c">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="lxevu1h"
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
                                    data-oid="mhm:k8u"
                                />
                            </div>

                            <div data-oid="z.uv5ur">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="p01it7:"
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
                                    data-oid="ax2_u.2"
                                >
                                    <option value="Want to Read" data-oid="o0ad5-p">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid=":0kc6o7">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="z4v4lxz">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="vo1gfpy">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="8f1frui"
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
                                    data-oid="kg8o0g:"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="w93yf:5">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="fre6a0l"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="edjg8j9"
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
                    data-oid="osy:9sn"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="5onx:e:">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="qpk3fmg">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="td_-87y">
                            <div data-oid="i_9a.6o">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="zt3ext4">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="3q92yif">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="m-lopc7"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="dfqnmsy">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="bwvgm5q">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="4cq21_f">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="izk-r18"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid=".ioijop"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid=".7eop1k">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="pg.p9y9">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="nzu7rl.">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="td1agqz"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="e_q:ils">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="olj:kxc">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="ios:o_t">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="n-aedo0"
                                    >
                                        <span data-oid="n.-cnt0">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="0:6v8fk"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="sj_.80x"
                                    >
                                        <span data-oid="cbcnqp6">Books:</span>
                                        <span className="text-gray-600" data-oid="so.i6xj">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="7vo:5av"
                                        >
                                            <span data-oid=".xmducn">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid=":fd6gvx"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid=":2e.x31">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="7j7yp_a"
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
