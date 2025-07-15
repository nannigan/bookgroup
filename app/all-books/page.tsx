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
                data-oid="a-2i7cx"
            >
                <div className="text-center" data-oid="hl9cey4">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="fkjm0ip"
                    ></div>
                    <p className="text-gray-600" data-oid="7s_5bfg">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="zsmobmj"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="ghwybwj">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="5idcqk4">
                    <div className="flex items-center justify-between" data-oid="oe9_4-7">
                        <div className="flex items-center space-x-3" data-oid="xis536p">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="xalp8fe"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="u1eyxtl"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="w_52kmy"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="x0reoc9">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="x10-0_m"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="d7t3pn3">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="_ql8f6w">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="7wz72la">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="_ggj9.2"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="g:xfkp.">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="so-hkok">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="kmvfd0-"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="0tekx-d"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="96309_o"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ar_p2ea"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid=".f2rmw.">
                {/* Connection Status */}
                <JSONBinStatus data-oid="lbpttfm" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="8wcm0ep">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="oe-zsqd"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="dmgxsbh">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="b0i3.ns">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="du92brn"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="6u79776">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="gd67vx-">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="cn8_wsx"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="5jnw9rf">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="mqwzz_i">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="9k09_rp"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="y8o4e24">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="gkx3rg_">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="q.h93m-"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="dm6ae43"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="9auyfha"
                            >
                                <div className="flex-1" data-oid=".929k2s">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="wspd.zt"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="vt239mm">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="rjuo2t-">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="6amynpa">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="khv9q32"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="tm9g5wd"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="bfh::_0">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="u4a:nna"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="lg9m92k">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="n:jf6gt"
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
                    data-oid="9fr8:aw"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="kc9:u9b">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="0qfzvxp">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="18jnasx">
                            <div data-oid="g-jpxq:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="lfh9_xb"
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
                                    data-oid="s86vqbi"
                                />
                            </div>

                            <div data-oid="aswvp9h">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="jbrkknp"
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
                                    data-oid="2ok546s"
                                />
                            </div>

                            <div data-oid="9ywu1c-">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="j4zoueu"
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
                                    data-oid="canf3o_"
                                />
                            </div>

                            <div data-oid="5ew.wpm">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="7bg6t3."
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
                                    data-oid="voun350"
                                >
                                    <option value="Want to Read" data-oid="m.w7lm_">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="681nlqu">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="h2jonj6">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="p_t1pe7">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="87wl9:3"
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
                                    data-oid="c.:j67x"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="0q0wg_r">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="5isub1w"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="0yt3qu2"
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
                    data-oid="._ma.or"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="ttjzo.:">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="g0es5ir">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="874fl01">
                            <div data-oid=":t6kylt">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="6_4oc4x">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="ex5cz1e">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="4_g0q_4"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="_8prybi">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="mhloj.f">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="vm_b18w">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="i7qjd6c"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="myfi5jh"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="bvx7v_e">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="b8vj2mw">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="0m2vqgz">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="9ijc-6v"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="-0mcf8d">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="fzw77d4">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="dg9c.vg">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="nv36osk"
                                    >
                                        <span data-oid="94fc7-u">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="vjhi_tk"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="w891.sn"
                                    >
                                        <span data-oid="ugt7:p.">Books:</span>
                                        <span className="text-gray-600" data-oid="l43s3dt">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="x7bh:l5"
                                        >
                                            <span data-oid="djrww.3">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="cpahltb"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="vo3c9ze">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="pk15ev_"
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
