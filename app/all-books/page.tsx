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
                data-oid="ttakk9h"
            >
                <div className="text-center" data-oid="p1:kb0e">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid=".p.uuf5"
                    ></div>
                    <p className="text-gray-600" data-oid="12tflz5">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="v-yqi9b"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="d1wdvsk">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="q-g952o">
                    <div className="flex items-center justify-between" data-oid="9l1zpno">
                        <div className="flex items-center space-x-3" data-oid="-_jd8o6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="0j5xr8_"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="xcr3w6x"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="s.o8e2t"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="5mo1b75">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="g482u5:"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="wo4cag.">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=":1koy4y">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="g0obx.y">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="q6dh:u:"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="2olqk0l">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="2-ky6ln">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="ombiicf"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="l1lj9.6"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="njna_fo"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="m-eikpd"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=".z:j0nc">
                {/* Connection Status */}
                <JSONBinStatus data-oid="v92pc1u" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="_o-239n">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="fn4du_z"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="014mu38">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="--r2e-3">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="7tm-cs4"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="2jnapzp">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="27aohnx">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="ec8jp7u"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="b:a55mv">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid=".epio.p">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="1:h.pue"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="zlzoczn">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="toy9ems">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="-uum.4:"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="e4g6-77"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="s.h_.9r"
                            >
                                <div className="flex-1" data-oid="-414e_l">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_-yt9mi"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="lxyp3d5">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="om3u4fj">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="gl6rmov">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="8obecjx"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="ozabuik"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="iwu0hjk">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="q3-7yjy"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="z.rpsdw">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="ygjwdaz"
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
                    data-oid="j2oyv_0"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="6x:7o_l">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="sb8.k4b">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="5btd:8o">
                            <div data-oid="z_-6mx2">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wa38l:a"
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
                                    data-oid="--k_sfb"
                                />
                            </div>

                            <div data-oid="fusviwk">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="npwgefy"
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
                                    data-oid="70..1ua"
                                />
                            </div>

                            <div data-oid="kw-nrw3">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="d485sef"
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
                                    data-oid="2maw:xo"
                                />
                            </div>

                            <div data-oid="g2ilrug">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="_8il1ng"
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
                                    data-oid="swi37ma"
                                >
                                    <option value="Want to Read" data-oid="dz.wk:7">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="-pcbyb9">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="etn._dt">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="41_2f0e">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="e2cm2fh"
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
                                    data-oid="9nkppsc"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="6tu3o9n">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="skp2l-o"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="mg5_a0w"
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
                    data-oid="2im2i_c"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid=":8pb.gw">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid=".:e10l.">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="bt_p_dw">
                            <div data-oid="3bwwjus">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="07w2smz">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="jvmqny6">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid=":_rgsih"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="rnnh41p">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="lfrb1j0">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="v5g-clb">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid=".f-lvna"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="g671274"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="cf4xx5w">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="s_yjonn">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="mt94mcj">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="_qn0xxi"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid=".pn9za4">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="5rqc:pk">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="x2-df9u">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="42n-820"
                                    >
                                        <span data-oid="8z4k4x0">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="_at5.hu"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="99ayc7x"
                                    >
                                        <span data-oid="qood11i">Books:</span>
                                        <span className="text-gray-600" data-oid="a--dws:">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="7n6k3zl"
                                        >
                                            <span data-oid="6duqbp_">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="pdqz5w."
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="x0xt2ie">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="v3cs8l3"
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
