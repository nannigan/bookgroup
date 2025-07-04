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
                data-oid="c4jal9h"
            >
                <div className="text-center" data-oid="zqgnz3a">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="6vu3_lc"
                    ></div>
                    <p className="text-gray-600" data-oid="b_znwn-">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="d:2oi5z"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="p626qcp">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="r3pptpr">
                    <div className="flex items-center justify-between" data-oid="2mntqlw">
                        <div className="flex items-center space-x-3" data-oid="qwtmtfp">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="4tucz_l"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="s3aab61"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="vg-2qsn"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="_44n.pq">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid=".7.aqej"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="cfy_j-j">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="zozxhip">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="e.qnm15">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="i:ru20e"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="aq0mjl_">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="hdcr4p.">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="h2c1dag"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="oc71770"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="ntnrtuy"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="zh:6d6d"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=":nze9xr">
                {/* Connection Status */}
                <JSONBinStatus data-oid="0_vdp4t" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="bcwrs0y">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="v0gd3o:"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="f622bkj">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="jspwz59">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="6y8ugsv"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="h.6cbzd">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="tqn4h4v">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid=":y7_447"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="i8o-onw">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid=".4nl9v_">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="2ckhe28"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="x5ci-b2">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="8w6qpiv">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="fa774q3"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="_6hmg8u"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="3-m1d9k"
                            >
                                <div className="flex-1" data-oid="xwh1mi8">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="lln_.im"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="90n638.">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="dmioowm">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="rbdqrvn">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="ay8o9g5"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="lhcrt_y"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="cufg6t_">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="g4vgps_"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="ghw2fqp">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="gzogk3q"
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
                    data-oid="tejj665"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="lwns7_r">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="sta3cer">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="tsvkjb5">
                            <div data-oid="lbisxrk">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="zv1azn."
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
                                    data-oid="19uf00e"
                                />
                            </div>

                            <div data-oid="jli0wa4">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="pdfntu_"
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
                                    data-oid="sura93l"
                                />
                            </div>

                            <div data-oid=".i:0xgm">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="arbg83r"
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
                                    data-oid="w5iq808"
                                />
                            </div>

                            <div data-oid="-ahh01m">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4dpcpqk"
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
                                    data-oid="jmztllc"
                                >
                                    <option value="Want to Read" data-oid="l6h.c8i">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="ukqq83o">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="pu6fau8">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="pwfdh:2">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=".-d2a9m"
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
                                    data-oid="5-t75nv"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="oohgzm7">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="r_.a.xx"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="61yc4zk"
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
                    data-oid="nu7:p2k"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="ehli6:j">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="5cf-yw-">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid=".9kd5hm">
                            <div data-oid="kbjwef:">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="6ymr20d">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="tyq.86o">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="2elftvb"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="oq8h1sd">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="t4gdcqv">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="9v1n5j3">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="5gkizsf"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="qnvg_t5"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="sfi038r">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=".di..34">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="81zs6br">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="vec_2zs"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="c-9dhvo">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="7tlz2v4">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="h6wl2v4">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="5e6f3j9"
                                    >
                                        <span data-oid="rhia7gm">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="tijz.vt"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="qv6gg0t"
                                    >
                                        <span data-oid="pa9zwb:">Books:</span>
                                        <span className="text-gray-600" data-oid="8c4hkl8">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="-l7bpyh"
                                        >
                                            <span data-oid="dtn:f_i">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="derbn.g"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="oodm9sp">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="xj9xvh1"
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
