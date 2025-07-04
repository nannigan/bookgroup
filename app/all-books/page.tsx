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
                data-oid="8:q57v-"
            >
                <div className="text-center" data-oid="eyr4jxo">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="eop.3ti"
                    ></div>
                    <p className="text-gray-600" data-oid="f3wdpma">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="imzd0ii"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="55mamoo">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="5nky-03">
                    <div className="flex items-center justify-between" data-oid="zou45n4">
                        <div className="flex items-center space-x-3" data-oid="fx9nsc2">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="rgn10ql"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="c6ttb1b"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="-u:6m3n"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="gh3cl63">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="v0_76l1"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="19a0rev">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="ex-lh93">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="qyf2f5o">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="f:.z:vl"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="f8m1t7h">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="eld66-.">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="57x:mvt"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="_2f53lk"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="j7d.dwm"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="oqkyeyy"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="tl02usx">
                {/* Connection Status */}
                <JSONBinStatus data-oid="tjkujun" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="g79aw3_">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="5t:nvzh"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="b11e:pk">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid=".5-p_kw">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="d79a-_d"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="ns_it5f">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="rf4-5.v">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="olyu51g"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="ionpqe:">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="tiq24ol">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="8vc79tp"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="qyih.yu">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid=".eo5_qf">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="1bm1ssg"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid=":3xm3re"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="tqvga4g"
                            >
                                <div className="flex-1" data-oid="17salq2">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="y2a0lfa"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="gewwjyc">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="9.rwlos">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="8e.gddz">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="nk0s8x8"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="lr80o8a"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid=".288:p_">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="w02omt8"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="y5scan8">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="12utik9"
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
                    data-oid="hqmlnkf"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="eljj:3g">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="xdvrp02">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="6o3vu_w">
                            <div data-oid="1z8vbtd">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="hpkhoec"
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
                                    data-oid="puixq34"
                                />
                            </div>

                            <div data-oid="b7fpbb2">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="mw4o:14"
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
                                    data-oid="siw1box"
                                />
                            </div>

                            <div data-oid="5k1b2d-">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ouin91a"
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
                                    data-oid="bqkdb8h"
                                />
                            </div>

                            <div data-oid="wnsovfi">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="nptlur-"
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
                                    data-oid="lp19dlm"
                                >
                                    <option value="Want to Read" data-oid="knedt10">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid=":46ydtt">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="eor0s1r">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="zh8na-u">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ji8h96w"
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
                                    data-oid="1geqiig"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="sk8yab3">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="u26g40j"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="w0aix44"
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
                    data-oid="87_q04p"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="46nfqvl">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="85ylz21">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="u4nq.j0">
                            <div data-oid="xrmg_pz">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="hr2et:u">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="crso-t1">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="1tdqpkz"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="5-p_m17">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="wd_9wqc">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="psse.rd">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="d_ghhrp"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="-92.k11"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="n:11cn8">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="35yjxxw">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="mc.wbtr">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid=".qs89_0"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="9q_b3b_">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="zqzljth">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="n6.5i7r">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="020stzz"
                                    >
                                        <span data-oid="n_wker8">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="e7qgs1f"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="74k0__t"
                                    >
                                        <span data-oid="r4_fkxk">Books:</span>
                                        <span className="text-gray-600" data-oid="hnulxwe">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="17rnvnw"
                                        >
                                            <span data-oid="ns8v3f6">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="p3yjyx6"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="ohwmd:-">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="l_:r50_"
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
