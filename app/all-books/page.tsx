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
                data-oid=".gplklu"
            >
                <div className="text-center" data-oid="urxd4f1">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="-l_b06-"
                    ></div>
                    <p className="text-gray-600" data-oid="gz-sur3">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="xrhy3n0"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="98gv8x3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="sqf7-p6">
                    <div className="flex items-center justify-between" data-oid="5rjno3j">
                        <div className="flex items-center space-x-3" data-oid="o2uvlsz">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="l0u2ioz"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="_1492aj"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="_or0xhx"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="p36i0xe">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="5.28e64"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="bk1j4.h">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="efruhwc">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="pfd4u60">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="5prr58_"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="h233z8l">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="v1qcqzi">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="eeagc0p"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="puepiej"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="w.o6eqr"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="d84g-co"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ygsjf0l">
                {/* Connection Status */}
                <JSONBinStatus data-oid="ahcd27q" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="b7qak4d">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="xv843sf"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="qsajo_p">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="hyjfiuq">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="55hsqxg"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="im:sr7l">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="i91i-k6">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="a698uli"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="zo9r2f_">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="9t:bl_h">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="9jv0dc9"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="d0jidqc">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="i.4kutq">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="6azg6br"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="f-5xkp7"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="ql86vtx"
                            >
                                <div className="flex-1" data-oid="yrb06l5">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="39vc2x2"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="-cik_e:">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="__bsbza">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="8dkzhnx">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="uxo5z1_"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="7-ssz:r"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="kvoua.u">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="0d1t4k8"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="1_pdzpb">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="z90sr93"
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
                    data-oid="qg-ekpz"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="wloxgo.">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid=".mzyquc">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="h:lju69">
                            <div data-oid="ojs-rbi">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="_k8d1i_"
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
                                    data-oid="n_jc80x"
                                />
                            </div>

                            <div data-oid="i4kgtxe">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="46_:d5m"
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
                                    data-oid="xzb8_:8"
                                />
                            </div>

                            <div data-oid="2:_k1j8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="bfz3dcv"
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
                                    data-oid="fvkz9wu"
                                />
                            </div>

                            <div data-oid="ci-ip2o">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="0ktz-cu"
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
                                    data-oid="9vrk:by"
                                >
                                    <option value="Want to Read" data-oid="354l:ng">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="5h9004e">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="yv.o4t9">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="t58aj-6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4zxrg5w"
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
                                    data-oid="vvh7uxm"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="y0egs7s">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="wkg:6je"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="wbqg.9v"
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
                    data-oid="93cq-x-"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="9s7q-cz">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="0g0socf">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="normjwh">
                            <div data-oid="gk05s4s">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="s.n25na">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="clk6tw0">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="9pyvrn7"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="-0j7_4d">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=".zxt4.k">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="1e4t3xj">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="iw4mxhb"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="_ztblkl"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="n9j5a0-">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="mi-yuqm">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="0pret:o">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="hhm0xj1"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="lyeon45">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="i4s2bfd">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="xnm9kzb">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="a.-gxib"
                                    >
                                        <span data-oid="i6.q14e">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="g2l23xm"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="i-21vab"
                                    >
                                        <span data-oid="z8or4bp">Books:</span>
                                        <span className="text-gray-600" data-oid="4grm4jb">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="3_j5b7d"
                                        >
                                            <span data-oid="8.44s_y">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="r59-3y-"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="k1ko.fe">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="p12.hip"
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
