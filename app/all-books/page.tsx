'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { getStatusColor } from '../../lib/books-data';
import { useBooks } from '../../lib/useBooks';
import { JSONBinStatus } from '../../components/JSONBinStatus';

export default function AllBooksPage() {
    const {
        books,
        isLoading,
        addBook,
        updateBook,
        deleteBook,
        resetToDefaults,
        exportBooks,
        importBooks,
    } = useBooks();

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        status: 'Want to Read',
        comment: '',
    });
    const [showImportExport, setShowImportExport] = useState(false);
    const fileInputRef = useRef(null);

    const handleAddBook = () => {
        if (newBook.title && newBook.author) {
            addBook(newBook);
            resetForm();
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setNewBook({ ...book });
        setShowAddForm(true);
    };

    const handleUpdateBook = () => {
        if (newBook.title && newBook.author) {
            updateBook(editingBook.id, newBook);
            resetForm();
        }
    };

    const handleDeleteBook = (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            deleteBook(id);
        }
    };

    const resetForm = () => {
        setEditingBook(null);
        setNewBook({ title: '', author: '', genre: '', status: 'Want to Read', comment: '' });
        setShowAddForm(false);
    };

    const handleImportBooks = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const success = importBooks(e.target.result);
                if (success) {
                    alert('Books imported successfully!');
                } else {
                    alert('Error importing books. Please check the file format.');
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
                data-oid="i094hbx"
            >
                <div className="text-center" data-oid="i0zvu:0">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="g737avv"
                    ></div>
                    <p className="text-gray-600" data-oid="e7_cmoo">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="tj.p6al"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="7e81oz3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ygxop:_">
                    <div className="flex items-center justify-between" data-oid="9l84ety">
                        <div className="flex items-center space-x-3" data-oid="9kp4lb8">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="d:y4jto"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid=":kfbg-d"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="oqcxls6"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="u58md.p">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="pwgal9z"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid=":kcl2_x">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="zu6-2bd">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="elbaoi2"
                            >
                                ← Back to Home
                            </Link>
                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="pf8k0su"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="21rw5l8"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="yd74d36">
                {/* Connection Status */}
                <JSONBinStatus data-oid="dl2qp5j" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="4o1ka.y">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="0m.02nq"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="sf:y-u.">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="eam4n:v">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="5l-bzx."
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="j7s4j8h">
                            {books.filter((book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="1jh9ari">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="5gd0qwr"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="dhfsak1">
                            {books.filter((book) => book.status === 'Currently Reading').length}
                        </div>
                        <div className="text-gray-600" data-oid="a8ssbur">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="j1fewb4"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="qsxwj15">
                            {books.filter((book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="res3bsn">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="sx.38g8"
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="g6ni4:a"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="5iidme8"
                            >
                                <div className="flex-1" data-oid="r0ylhc4">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="vmz.mzo"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="nr-9u_h">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="iraz.hq">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="kgtr.s5">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="o91wrd0"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="s24mf94"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="88hlxci">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="wsylb14"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="pyvwh3f">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="tzq0ce0"
                                        >
                                            "{book.comment}"
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
                    data-oid="2t:tqb7"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="1.lzfki">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="eh68u94">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="8vz.o11">
                            <div data-oid="cpr1im_">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="h23cq7p"
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
                                    data-oid="bwplgk1"
                                />
                            </div>

                            <div data-oid=":t_.dww">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="bfz.29l"
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
                                    data-oid="gzwkm1p"
                                />
                            </div>

                            <div data-oid="_5l:eq9">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kmulg2b"
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
                                    data-oid="tog9kqr"
                                />
                            </div>

                            <div data-oid="rok:f_g">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wavhgzn"
                                >
                                    Status
                                </label>
                                <select
                                    value={newBook.status}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, status: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    data-oid="l9xh8c:"
                                >
                                    <option value="Want to Read" data-oid="7zqwh9i">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="wkt67pz">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="5l03ckl">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="ygv0p.p">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4:hjqku"
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
                                    data-oid="89wxous"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="7ecqyt_">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="_porwzh"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="n5v9.u9"
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
                    data-oid="nydr297"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="kt1orbw">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid=":nzgxn4">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="x65r9:3">
                            <div data-oid="6aak3hn">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="gj2ye1f">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="l_6lm4a">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid=":eqrj5j"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="p9w6x5m">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="7cg1oyd">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="d1020my">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="kma:u6o"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid=".ew6txi"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="96oqae8">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="...34ln">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="7aur8:g">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid=".l.9z6x"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="zi6xfa8">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="hl.6z3i"
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
