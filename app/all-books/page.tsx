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
                data-oid="vgpg-4y"
            >
                <div className="text-center" data-oid="0lj71yi">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="b.pao6n"
                    ></div>
                    <p className="text-gray-600" data-oid="8nvpw-a">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="w.t0-tx"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="9ol7ru-">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="at2-znf">
                    <div className="flex items-center justify-between" data-oid="09wj52w">
                        <div className="flex items-center space-x-3" data-oid=":m1r5b:">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="6.kom.y"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="t00d3o7"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="3i:h2de"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="0xv696f">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="4h3g_.r"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="-w4bnqo">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="cy.z99t">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="z9bjk6i">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="fb__4co"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="rq:.4so">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="h242exj">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="k-.we62"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="_7dxx71"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="g7a8jo7"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="h_7wdma"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="x134z1q">
                {/* Connection Status */}
                <JSONBinStatus data-oid="1nabs8z" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="6erb6yw">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="33r48hu"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="ez_f:3:">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="ax:bi0e">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="7z.b:zi"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="7ixizde">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="1z90-0w">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="s9iwtr."
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="3emfg6e">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="j18t34r">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="1f.3s4-"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="gyjm.mq">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="bntg2wi">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="q8qm35n"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="p5-rell"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="z1xl-vh"
                            >
                                <div className="flex-1" data-oid="2bcwwoz">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="sz9ghv."
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="ht.zlew">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="m_t.h45">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="5krv-zb">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="a5wb6dv"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="0vn8392"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="h50hynf">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="e--vgqw"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="e-m1r8l">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="muzpkz1"
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
                    data-oid="qgtax7v"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="0-:9wc7">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="fpf_owv">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="71dz4ey">
                            <div data-oid="7hg3sye">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="s4pc.s-"
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
                                    data-oid="0_8.4rj"
                                />
                            </div>

                            <div data-oid="s8f5r.9">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="7rkqz74"
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
                                    data-oid="ol-vol9"
                                />
                            </div>

                            <div data-oid="9v3vfy9">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="i5.qb:q"
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
                                    data-oid="jpy598q"
                                />
                            </div>

                            <div data-oid="rl.tjr3">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=".4epw1e"
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
                                    data-oid="btrmnzr"
                                >
                                    <option value="Want to Read" data-oid="z1my.mh">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="ht47pup">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="nqzxu3-">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="kyw4cql">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="w4mzje7"
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
                                    data-oid="s8_c:bl"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="eunj1ze">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="2r8pr7g"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="hyphzxd"
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
                    data-oid="rmbkp4b"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="pdg7o5t">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="80-61fy">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="omqzmbz">
                            <div data-oid="cgijqib">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="151t4ky">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="05pcmkm">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="lnfhd1w"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="23cas2q">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=".-8tw:0">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="c6bada3">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="b80l53t"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="x8g:jyq"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="5ybpe3f">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="0gi8jv4">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="qdq4efx">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="t_p5pqv"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="::ppmcq">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="xg.a62e">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="u9cxo9f">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="ohtiu-d"
                                    >
                                        <span data-oid="wwtl0.g">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="aiy6ice"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="d5fgpc:"
                                    >
                                        <span data-oid="jekoc00">Books:</span>
                                        <span className="text-gray-600" data-oid="gykeqeq">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="-v34giq"
                                        >
                                            <span data-oid="9mz8:um">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="x:c_6u2"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="o.glq4y">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="g1.epv3"
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
