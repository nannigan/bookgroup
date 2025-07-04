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
                data-oid="dbck5w."
            >
                <div className="text-center" data-oid="wdc6blw">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="w06qzy8"
                    ></div>
                    <p className="text-gray-600" data-oid="qd.b47j">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="4d5g39u"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="mkg55:o">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="y7gmrr0">
                    <div className="flex items-center justify-between" data-oid="-9pemul">
                        <div className="flex items-center space-x-3" data-oid="cv:h1u6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="8eiqe1p"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="nuz7vzy"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="onjqae9"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="iv0ngbc">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid=".wtqpu1"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="xy86hym">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="sw6umle">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="grz2_40">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="kvedjn4"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="r-dzjd9">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="m-e4.jn">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="_jm_yr_"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="qpfzfqv"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="6_k.g0b"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="8rojo80"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="u-.jzg5">
                {/* Connection Status */}
                <JSONBinStatus data-oid="t4efc7w" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="4e0bj9:">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="dgv9_uq"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="i7.qmam">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="en:vgri">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="6jrf8mx"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="9xt87rn">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="9ff20f9">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="qti9o3u"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="3w41t.s">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="qb6-uc1">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="w0zm:1c"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="2zgdu3r">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="k-l8_ms">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="ub9iyu4"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="ndf3nlm"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="8-fj4dn"
                            >
                                <div className="flex-1" data-oid="t0kls9j">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="1q3phfn"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid=".3h9q9.">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="6.mwabm">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="vgf9cdu">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="zo5u62w"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="r8ecxpo"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="5vah:u:">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="3jmg2du"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="2j4gn5t">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="u1l1a4:"
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
                    data-oid="oe57y4v"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="nlkgk8q">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="-e8d7q-">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="tbbksrd">
                            <div data-oid="_h.x:z5">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="u2hqf4d"
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
                                    data-oid="4:ew-s2"
                                />
                            </div>

                            <div data-oid="g1rrid8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="5_h0tn6"
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
                                    data-oid="qsxs9_0"
                                />
                            </div>

                            <div data-oid="-zry3od">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kvtsei0"
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
                                    data-oid="zb30xij"
                                />
                            </div>

                            <div data-oid="oxeupjb">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="q6:9umz"
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
                                    data-oid="ql4idn8"
                                >
                                    <option value="Want to Read" data-oid="81nx8_f">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="h0f6kw:">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="z1_as0x">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="pd7hmi8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="r8g1yn5"
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
                                    data-oid="2xt5a6x"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="wyvltln">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="z6s9_9u"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="gyn1wev"
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
                    data-oid="7kt-_nz"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="5hzldwv">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="ivm_j9o">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="c9:vk7m">
                            <div data-oid="mak.h6k">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="kv_ukoi">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="ikev6xp">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="o:ti7v:"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="r56dy-8">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="rjla.s0">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="vqfww4.">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="08gng6z"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="_3bj.xk"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="lcv6x7y">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=":e3_u32">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-xpnmf_">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="ru2mb2_"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="kvwm8v1">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="8pyk3x4">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="vv4pzh3">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="4ajx5:t"
                                    >
                                        <span data-oid="h:t::dh">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="dpmsljw"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="q.zr3fs"
                                    >
                                        <span data-oid="2_rc2vc">Books:</span>
                                        <span className="text-gray-600" data-oid="tavozwp">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="223q354"
                                        >
                                            <span data-oid="m0uhs4m">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="3:539:8"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="66k6fx0">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="q_v43x4"
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
