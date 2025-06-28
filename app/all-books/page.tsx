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
                data-oid=":oa_-vg"
            >
                <div className="text-center" data-oid="cc1aj8y">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="bxnf0g4"
                    ></div>
                    <p className="text-gray-600" data-oid="3ar81cd">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="_s-6gkj"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="x2wuh-l">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid=":oqesim">
                    <div className="flex items-center justify-between" data-oid="q0:5wt4">
                        <div className="flex items-center space-x-3" data-oid="-rvb9ko">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="gqnq0mw"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="-ejx-o0"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="pmofhy_"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="f.ve8aj">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="m7as8lf"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="l1bxc43">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="oap9:y:">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="oi3r0fh">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="xdx4pue"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid=":5z2sd8">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="8we8y7t">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="46.oy4."
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="ix9gnk7"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="weuu-wx"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ayu1n.a"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="iy69qut">
                {/* Connection Status */}
                <JSONBinStatus data-oid="_rhth66" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="5lxuea2">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="prkz5l-"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="qcbs9a7">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="ijlp9ds">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="e7f7q5_"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="d6sp52:">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="3sy3h8d">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="4c_iuz_"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="dkez637">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="0vak57l">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="mz1rflm"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="s:_wbb1">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="19qoxyy">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="okn4qtp"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="n6vvyt7"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="_1e0-a_"
                            >
                                <div className="flex-1" data-oid="x9sb00v">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_k.w5j4"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="ub:uham">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="v3fh_zd">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="o7p.a9u">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="nzt5j3m"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="zb_vusg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="_vx.mtv">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="p1c78x3"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="jn_gwvz">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid=".c5wa_-"
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
                    data-oid="7e6rn6z"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="2dxcr8z">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="-t7.jta">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="_erstj4">
                            <div data-oid="sic0uhu">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="h1t1z61"
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
                                    data-oid=":805t1z"
                                />
                            </div>

                            <div data-oid="u-u7l6.">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="mzh097l"
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
                                    data-oid="x:0_tj4"
                                />
                            </div>

                            <div data-oid="pfikdi8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="q3zbfez"
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
                                    data-oid="s7716.g"
                                />
                            </div>

                            <div data-oid="5q2ui0u">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=".g4wvmw"
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
                                    data-oid="apbyf.6"
                                >
                                    <option value="Want to Read" data-oid="r3--led">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid=".6w-p2f">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="fg:jb_u">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="le9.a0g">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=".z4c13a"
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
                                    data-oid="aahczsk"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="emessj1">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="e9ehgjh"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="kda8j-0"
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
                    data-oid="g5fv3ni"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="wmnm76t">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="s2v6zu.">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="j8i__un">
                            <div data-oid="lv-nnyq">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="j4j::9t">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="6x3:ads">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="3fr6iln"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="6q_8ge2">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="d6xlymp">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-1e3m_-">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="8c_:7de"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="71lpjsa"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="kmo-_f2">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="fc9tk8_">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="h25853d">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="u8a4wva"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="gxyb8ff">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="f6qnphg">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="m4geqp:">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="5apu15f"
                                    >
                                        <span data-oid="qubn6h1">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="p4cgtkm"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="e.myeo7"
                                    >
                                        <span data-oid="stm0jur">Books:</span>
                                        <span className="text-gray-600" data-oid="r-b61-8">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="o:djdcq"
                                        >
                                            <span data-oid="xfj_czi">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="syllvw:"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="ooa9hzq">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="fgq2c_p"
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
