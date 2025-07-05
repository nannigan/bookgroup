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
                data-oid="xp.erm1"
            >
                <div className="text-center" data-oid="7bddhu3">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="r7hkxfw"
                    ></div>
                    <p className="text-gray-600" data-oid="ktqx0zy">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="nos_9j:"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="4y530v0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="uws2gdg">
                    <div className="flex items-center justify-between" data-oid="tbr73b6">
                        <div className="flex items-center space-x-3" data-oid="fc7vqs.">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="aavhs0x"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="b0flc6b"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="7gjo3ab"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ekhtzlt">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="k2qj3gd"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="z4olcnu">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-up_26b">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="zl_5dc-">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="8b.r_ii"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="iiybuz4">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="pr864:d">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="dzt351d"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="xhvlcs6"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="8lxmhjw"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="3rz3.x_"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="p5qzhid">
                {/* Connection Status */}
                <JSONBinStatus data-oid="fe74aay" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="cmdogq1">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="qrwqzwg"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="-gl5w_i">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="blclfj8">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="zvltg.t"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="bz2bbo.">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="g8417-c">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="j7wga4q"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="2dw4mjf">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="cwqe_zx">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="_w.2_tg"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="qb6pjkc">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="jrix97d">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="9:b8rv7"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="mqy75a-"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="58:ejlu"
                            >
                                <div className="flex-1" data-oid="f5bfb2h">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="pjsbnml"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="i4xsvp-">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="mb8eqyc">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="2a.xg3:">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="1v9__zl"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="yfnr.27"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="m32uptj">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid=":iw4r9i"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="rpibcwj">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="bgvyou9"
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
                    data-oid="jj75cxf"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="94hqmwu">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="qbh_-w8">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="rpe2mu9">
                            <div data-oid="sx8654h">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wnvzkt_"
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
                                    data-oid="91cjgo6"
                                />
                            </div>

                            <div data-oid="e5oma.g">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xhmj:r7"
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
                                    data-oid="s6-trn3"
                                />
                            </div>

                            <div data-oid="cszef_3">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ze1ro13"
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
                                    data-oid="i1nec8f"
                                />
                            </div>

                            <div data-oid="j37v_af">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="445t09_"
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
                                    data-oid="89ry1_s"
                                >
                                    <option value="Want to Read" data-oid="0jbt73n">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="flx:-11">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="vj9gotu">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="f:9lm-x">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="nbq1xsr"
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
                                    data-oid="lyvnvzl"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="ai_ej-4">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="k_ws9jf"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="2ogzdb3"
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
                    data-oid="415ypc9"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="25rk3c5">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="88morab">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="967bmsx">
                            <div data-oid="uzrubdv">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="aythm7k">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="-x5sxbv">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid=":h03-od"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="7eix0gn">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="wwbyhaq">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="nk14r6p">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="gpaee62"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="uu6.gtt"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="xiiqi_m">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="4-578iy">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="s4kuu37">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid=":dil1aj"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="ns_-xne">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="o2_7kq4">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="y6oe2.f">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid=".j7sgpy"
                                    >
                                        <span data-oid="cn9rape">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="89_dafy"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="uevnljq"
                                    >
                                        <span data-oid="5ct2n4z">Books:</span>
                                        <span className="text-gray-600" data-oid="s4j60bu">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="gd5-g:i"
                                        >
                                            <span data-oid="2gun4lx">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="tuvff0h"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="z7v4_:2">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="mi:9w9j"
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
