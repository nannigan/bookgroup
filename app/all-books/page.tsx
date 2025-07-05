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
                data-oid="uqd-6n7"
            >
                <div className="text-center" data-oid="9p11h7b">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="4d9cc4l"
                    ></div>
                    <p className="text-gray-600" data-oid="hjho9b8">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="j7t74jk"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="2bdyery">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="10p_w74">
                    <div className="flex items-center justify-between" data-oid="ejo_x0g">
                        <div className="flex items-center space-x-3" data-oid="c7u5n1d">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="884zj_u"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="b_5b350"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="oovzr8q"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="womrz63">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="xj1:rtc"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="144aqd6">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="p0eicgn">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="_01ir93">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="2i54ati"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="yu7ttip">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid=".7xoy0c">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="bumo.lw"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="wn3iu7h"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="ponsbcg"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="p080x69"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="0-t.vd7">
                {/* Connection Status */}
                <JSONBinStatus data-oid="qjmk_pp" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="qpynzp-">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="0dhu3am"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="r2krd.6">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="4yio-q9">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="xjhu_zf"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="84f6ma9">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="1roprev">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="t6vo6_c"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="saemjam">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="rcxjdzt">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="q8-38ne"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="n5_fqn.">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="emaf9sl">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="6_n92me"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="ovuzi4."
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="32ccdf8"
                            >
                                <div className="flex-1" data-oid="yy1rftb">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="fq53wlb"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="u7i3eh8">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="9fcu3xt">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="-s6jgmy">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="ykzq4-y"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="9otzcau"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="7wn1-2p">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="mchpsro"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid=":r67xen">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="9vpjzk2"
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
                    data-oid="8:eaggp"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="snn_3v9">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="1njdhst">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="o6n6h75">
                            <div data-oid="fa4w-bl">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xk9q:4n"
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
                                    data-oid="jvz-mnu"
                                />
                            </div>

                            <div data-oid="20p9t62">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="dsg-a1s"
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
                                    data-oid="t05aqao"
                                />
                            </div>

                            <div data-oid="-7h__a_">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="mdeof3b"
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
                                    data-oid=".8y24bz"
                                />
                            </div>

                            <div data-oid="_k96coz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="898.rn_"
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
                                    data-oid="7qbwns8"
                                >
                                    <option value="Want to Read" data-oid="d1erk2f">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="l_ei904">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="::_beg2">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="32ticvl">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xrq5_et"
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
                                    data-oid="s-o:bs3"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="r.bgett">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="e6uo4hj"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="v5.-o0u"
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
                    data-oid="ezhlr77"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="79u3cu2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="3op25rw">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="mp0zwby">
                            <div data-oid=":o9xu9_">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="6r2-s9d">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="4f93b-6">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="h-nx3_j"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="1ed395x">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="f5ie9-4">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="imo12u8">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="2e73cmm"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid=".mwy68l"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="lx99t.1">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="2zpl5n8">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="eiamt1o">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="1s0le.o"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="0j157ka">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="pw5d29v">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="5b29dtp">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="i6m.0uz"
                                    >
                                        <span data-oid="irimm2.">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="-_u3_i8"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid=":ikyd75"
                                    >
                                        <span data-oid="z0t50.h">Books:</span>
                                        <span className="text-gray-600" data-oid="6xt469z">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="m4151sr"
                                        >
                                            <span data-oid="mjtvlfk">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="nop5ip3"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="jgzeeyv">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="jxi63lc"
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
