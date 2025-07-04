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
                data-oid="4ap.fbn"
            >
                <div className="text-center" data-oid="cg_.cex">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="llhai:l"
                    ></div>
                    <p className="text-gray-600" data-oid="zb1l6tn">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="rgjcqby"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="3vb5w2y">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="t_-lue5">
                    <div className="flex items-center justify-between" data-oid="79ceaut">
                        <div className="flex items-center space-x-3" data-oid="a12nbyv">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="cdza5xk"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="pgucitk"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="p1f76b6"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="gfixmh2">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="-g2fz:t"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="z._wfyz">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="ema56q-">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="l5.tw6h">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="3t772_g"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="dxcawpo">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="vievi9m">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="07n2a_o"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="cjv:ira"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="4ojmql2"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="u.a6pg2"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="r6f0.qi">
                {/* Connection Status */}
                <JSONBinStatus data-oid="p_xfej8" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="g8bz5xo">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="i-8:.hm"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="yanjsgm">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="nu8s9da">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="hcyoe_h"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="_e5cpmh">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="58m:rqb">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="rn2j4lf"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="3bwae_b">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="_.9upo3">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="lc.qz4s"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="q2xdgr4">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="4_.yh9:">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="5gp3jtq"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="kdbw80d"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="6fmv4wz"
                            >
                                <div className="flex-1" data-oid="wwncw9r">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="iux2cdv"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=":omcn0r">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="yin9j9s">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="et6uo8p">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="etpoxmi"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="n8pgi5j"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="ov0a_iu">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="3:p5r.s"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="591b2z_">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="vk3n3e8"
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
                    data-oid="t27rck-"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="1w5_ltu">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="2vnq_.e">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="lgb3x6w">
                            <div data-oid="tbi0arc">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="lof09ua"
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
                                    data-oid="n9iz5cw"
                                />
                            </div>

                            <div data-oid="wrvmcmp">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="bf9aeh-"
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
                                    data-oid="r9gtn2h"
                                />
                            </div>

                            <div data-oid="_z5ip_f">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="adxyq_0"
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
                                    data-oid="_7kiug2"
                                />
                            </div>

                            <div data-oid="8oq6v3h">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="1:e5v8b"
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
                                    data-oid=":ob9ly0"
                                >
                                    <option value="Want to Read" data-oid="9:6ow9d">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="znkw_9h">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="3uqn-4t">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid=":96yq2j">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="slwxgc5"
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
                                    data-oid="f5.wyc9"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="zm.1n01">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="0n46zxj"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="2ld0f7-"
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
                    data-oid="57vq0pn"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="tren4tz">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="aubt:6:">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="q-guyb4">
                            <div data-oid="4vp2u:5">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="_54k13h">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid=":eyis6b">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="hi2a782"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="mt8x2mw">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="vnvylw8">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="dt9lo.f">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="cwjcjg:"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="u9g-akj"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="jx:_ui6">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="jkntjb.">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="i1dj4m3">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="bhk2s_h"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="1jj2pq0">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="p7ukx4:">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="epeas0i">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid=":3zi9d2"
                                    >
                                        <span data-oid="wwy9h4:">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="4p2f2_u"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="e9hekcs"
                                    >
                                        <span data-oid="jex1s:v">Books:</span>
                                        <span className="text-gray-600" data-oid="rv0hc48">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="ioo_7v6"
                                        >
                                            <span data-oid="qj8j6:4">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="x4durxp"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="z3c6t:2">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="-z:-to2"
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
