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
                data-oid="jycits."
            >
                <div className="text-center" data-oid="z8kq8py">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="fcc465v"
                    ></div>
                    <p className="text-gray-600" data-oid="f9g_7y.">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="z-::.kh"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="7nn0ssd">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="vfip7xm">
                    <div className="flex items-center justify-between" data-oid="h-nsdq8">
                        <div className="flex items-center space-x-3" data-oid="xojwzot">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="w9iu5kl"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid=":82xpib"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="hs-gahu"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="n2etx.c">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="99elvg-"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="qy15pdf">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="oh4mpn6">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="5r77xy3">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="kzxlgil"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="lv6pc5v">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="xr9v:zr">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="f1mgfx9"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="ij6wasq"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="iwlqc6h"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="vpqin:0"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="zezzt68">
                {/* Connection Status */}
                <JSONBinStatus data-oid="xqvpsr6" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="acfgufy">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="-utxh.f"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="9pxr0-y">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="oofb8v1">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="0p5c01w"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="evc8f36">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="3u3a3yf">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="70rjr-f"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="u_::lhr">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="6a2wb8s">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="qc85hta"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="--q0o97">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="-tj90w1">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="ptg43_:"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="t.jm-83"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="_lidg0h"
                            >
                                <div className="flex-1" data-oid="c46zdup">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="4_kpxqb"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="w97_-l7">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid=".kmn8:-">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="h1t3ned">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="ldn51g4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="c_4h:_j"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="jvs4lt-">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="s-dh9dj"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="81cdtc-">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="2pv7out"
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
                    data-oid="bhxd-de"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="gcjvcks">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="y9rv6mu">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="yncr9tf">
                            <div data-oid="aldmg-9">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="8gpqica"
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
                                    data-oid="po5es5k"
                                />
                            </div>

                            <div data-oid="2-tshjr">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="exq-d72"
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
                                    data-oid="xyy3bys"
                                />
                            </div>

                            <div data-oid="p3c12uk">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="-zbezeb"
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
                                    data-oid="6i.fqpc"
                                />
                            </div>

                            <div data-oid="5aqkp.u">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="7uues-a"
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
                                    data-oid="j6uz5ca"
                                >
                                    <option value="Want to Read" data-oid="p1kec6e">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid=":ikhd.p">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="l..qv:8">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="v:idse9">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="u6x5rm:"
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
                                    data-oid="_1whu5h"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="auejxxw">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="ok0r-ij"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="5hmx9.s"
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
                    data-oid="7xk1upn"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="7r7ae9v">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="tg2.._l">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="x530oyl">
                            <div data-oid="ew1_pd1">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ejz_2yq">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="45n34e6">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="bw-yekf"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="76gvhvi">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="_i31xna">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-jnjnpl">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="fyp3-m:"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid=":s2-e:."
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="d5456a-">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ytsql4o">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="2mtd8xd">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="6b..6mg"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="-t9b192">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="_:l2hiv">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="ysankp9">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="n23xc40"
                                    >
                                        <span data-oid="gv8nt7i">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="ltl1i2c"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="wpsd1hw"
                                    >
                                        <span data-oid="7s89hdm">Books:</span>
                                        <span className="text-gray-600" data-oid="nv7wixp">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="na9envn"
                                        >
                                            <span data-oid="ogjsxh-">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="yxs1lg9"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="k_zc5t6">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid=".6i9n4g"
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
