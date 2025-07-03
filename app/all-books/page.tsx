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
                data-oid="zxv.jd7"
            >
                <div className="text-center" data-oid="udv_b1b">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid=".8gcgkg"
                    ></div>
                    <p className="text-gray-600" data-oid="ogyp8j7">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="2rzwy_k"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="y060x--">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="-4im4n0">
                    <div className="flex items-center justify-between" data-oid="2c.kxb7">
                        <div className="flex items-center space-x-3" data-oid="54tt:ws">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="tm2aisf"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="c5ka:7_"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="i3hfhzl"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ioxwdu9">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="eogjb-k"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="yqlbe-o">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="w18a1f4">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid=".tqfdll">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="1qlvhlw"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="x02kojz">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="w81x1.g">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid=":g90z16"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="14jooi3"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="rk0:b8."
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid=":b9u8:l"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="7lppogs">
                {/* Connection Status */}
                <JSONBinStatus data-oid="5p-kmxw" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="e_5qrag">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="wrlxs3l"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="-_xdgbi">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="maosjfs">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="k46jx7q"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="yar1xt2">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="9gka57z">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="f_3a6_a"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="64oob5m">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="fpkj7v5">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="a.uywdn"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="haj2bvp">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="374ejg6">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="d6q7fyu"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="zoxow4s"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="ku7cq96"
                            >
                                <div className="flex-1" data-oid="pg7mm14">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="ht7afv-"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="5._d5mf">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="ebk2-zq">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="y3.tm_z">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="7:mkblp"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="7:s--my"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="b-ifn3t">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="3n028f6"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="s7c95.4">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="-jjpmdl"
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
                    data-oid="waa:fcc"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="4rxo_48">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="0g3ic8u">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="m5:dih_">
                            <div data-oid="7jays5o">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="_7o:dv_"
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
                                    data-oid="zp0r3sd"
                                />
                            </div>

                            <div data-oid="idm-or:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="f1erz-h"
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
                                    data-oid="6h79trq"
                                />
                            </div>

                            <div data-oid="tkylqz6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="uqpz-ct"
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
                                    data-oid="5dbhh7k"
                                />
                            </div>

                            <div data-oid="h1oy_b4">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="o557hsh"
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
                                    data-oid="e1qzigk"
                                >
                                    <option value="Want to Read" data-oid="fq1iwaz">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="1:bmj45">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="1k_wrh0">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="8ya29fr">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="6vthqwl"
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
                                    data-oid="zt257xk"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="5rxti8v">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="yy1zvy8"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="qn34ulf"
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
                    data-oid="lsza8.:"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="tsof93f">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="0qjkb6v">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="oiyamb9">
                            <div data-oid="g0svdg8">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="mum41lj">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-fvycv4">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="5ksi7:4"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="05.bd9e">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="4t0_icm">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="94posa6">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="lob9ji5"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="2y-mvy0"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="dvjj8br">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ovd0_0p">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="agvve82">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="s90-61k"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="mhvhe1c">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="i6tp5h3">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="o_6xutq">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="wv8cbno"
                                    >
                                        <span data-oid="5qcho0h">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="z_tn9eh"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="uhrm68i"
                                    >
                                        <span data-oid="7agcynx">Books:</span>
                                        <span className="text-gray-600" data-oid="ylkjayt">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="z_4yhr5"
                                        >
                                            <span data-oid="tr0i15k">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="njator0"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="x9i8a.-">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="wglc:gl"
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
