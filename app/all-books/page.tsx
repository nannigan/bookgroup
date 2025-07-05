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
                data-oid="pi6.-6."
            >
                <div className="text-center" data-oid=".fiq:df">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="gw1qbh9"
                    ></div>
                    <p className="text-gray-600" data-oid="l:d1zwe">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="-o26vpc"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="eeh81wb">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="pmcbvww">
                    <div className="flex items-center justify-between" data-oid="2yf7enj">
                        <div className="flex items-center space-x-3" data-oid="0:ri-t_">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="2c4wjdl"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="wn7r5eo"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="l9n-gj2"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="cnnqbhk">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="r2032p7"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="j65v90z">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="iry.tj-">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid=":11:pvp">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="2i9s1pf"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="xaiysen">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="2h5fz4g">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="1j:b9z7"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="jqgld4y"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="lle0gao"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="swgjk-m"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="vgix0vz">
                {/* Connection Status */}
                <JSONBinStatus data-oid="6in7exa" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="x9zvybv">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="68d_094"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="64ais49">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="-ix473u">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="nw-z:xe"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="kfm6912">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="r:p:03:">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="v4_2z59"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="5zvy2cq">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="8-hk2ad">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="q0cmzbl"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="-qqk5ya">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="knufnkb">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="xvorj4x"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="8_f.raj"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="5o12kdj"
                            >
                                <div className="flex-1" data-oid="tmw.pei">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="8tmhij9"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="gfzqggt">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="lgii83s">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="wxq0q1c">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=".kyyznn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="ojitnj5"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="yvzkwse">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="36obmib"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="j1btq86">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="cpa3717"
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
                    data-oid="pv_cwuw"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="b4m-dex">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid=".sslk.5">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="tjiv8un">
                            <div data-oid="xr::t1k">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xwi4w7m"
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
                                    data-oid="8fsp-qo"
                                />
                            </div>

                            <div data-oid="5x.8cuq">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="7_:qxdj"
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
                                    data-oid="2iukaom"
                                />
                            </div>

                            <div data-oid="v.u_cmz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xg0yzyx"
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
                                    data-oid="3vvtme1"
                                />
                            </div>

                            <div data-oid="48yn_vr">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="pc:4v-c"
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
                                    data-oid="xj8.1vm"
                                >
                                    <option value="Want to Read" data-oid="w3lnhut">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="1v.ui6-">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="j42kivd">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="y5953d7">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kzpvhi9"
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
                                    data-oid="li-cq-a"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="psh5z-r">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="wckrnbl"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="9dvzmb-"
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
                    data-oid="v.kane:"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="um6r2:e">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="kz9o--c">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="1s8g39p">
                            <div data-oid="bv8mgln">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="mu9cws.">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="br_5.k6">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="m6mz6cl"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="usufic7">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ee6kfsd">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="v9u3izj">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="74zr65f"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="yeo8:fh"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="h:qluno">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="j7xo:g8">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="_yg97c:">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="e5ulhih"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="v3n13:x">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="2vx:ugg">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="kq-3_fq">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="0rn12fu"
                                    >
                                        <span data-oid="sqp1c4z">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="5j6w4f_"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="2vrqw2n"
                                    >
                                        <span data-oid="esfw24d">Books:</span>
                                        <span className="text-gray-600" data-oid="2j57elm">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="z8o2o09"
                                        >
                                            <span data-oid="b3qkl52">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="r3mx:7a"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="ded940m">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="ti1hrkm"
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
