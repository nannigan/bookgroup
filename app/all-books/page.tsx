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
                data-oid="vev1fs:"
            >
                <div className="text-center" data-oid="werm::2">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="oesjfqt"
                    ></div>
                    <p className="text-gray-600" data-oid="626cfoi">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="jph2:uj"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="xmc7go9">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="vl3sdze">
                    <div className="flex items-center justify-between" data-oid=":6p5zj-">
                        <div className="flex items-center space-x-3" data-oid="35:::s-">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="tofl_0e"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="cz14s2t"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="ntgewao"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ga:-qj4">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="qm5vas5"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="kf:3acr">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="di1ua74">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="a5fmd4g">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="t-y.m-e"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="cucchkt">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="eaj2.f4">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="1wh4dgf"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="icmg-nl"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="gn4ud_r"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="zb.6gbv"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="63r.4.s">
                {/* Connection Status */}
                <JSONBinStatus data-oid="_4-ow96" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="x1cnc9i">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="62oua0d"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="tmjzp-c">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid=".tb0a-v">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="tq4lf1o"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="u:flpaw">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid=":_oelu0">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="o_g8opi"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid=":t_ia_6">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="insy6.t">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="5gghf8g"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid=":la5kc:">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="6stkkmg">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="nj7r03d"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="1jzxf04"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="5i7u2g6"
                            >
                                <div className="flex-1" data-oid="wfujhzi">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="g65-wmh"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="u.eh:bn">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="5_2p98a">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="9wqi112">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=".718s4f"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="m2riwi_"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="cw_:ssz">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="_xt27j1"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="kan:5sm">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="h7s9vn3"
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
                    data-oid="2m0wddj"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="36i5nka">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="6i1q.e:">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="_42xznv">
                            <div data-oid=".taf8vq">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="p1lj1oc"
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
                                    data-oid="77kqmmy"
                                />
                            </div>

                            <div data-oid="2s7_ha.">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="jnfk:mk"
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
                                    data-oid=":48gt7h"
                                />
                            </div>

                            <div data-oid="5nj30c1">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="o6b419f"
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
                                    data-oid="weqtpu1"
                                />
                            </div>

                            <div data-oid="g7altwf">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="t4-0ggs"
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
                                    data-oid="y72qvz:"
                                >
                                    <option value="Want to Read" data-oid="39.rmt-">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="v5wf60f">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="7bo9x4e">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="__sbwkk">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ued02j6"
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
                                    data-oid="l4s04kh"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="evmntzs">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="qvzshjl"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="c6cz06r"
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
                    data-oid="gry7se0"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="tf.5dt-">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="k:2.-p0">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="awz-ou0">
                            <div data-oid="twclnhv">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="me4r52b">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid=".5wjl_s">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="w_slaor"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="xshb-3c">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="d-5siq7">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="p2tf9e1">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="tk8v87s"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="0x2nrst"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="qx.43zh">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="3vu1w7l">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="bs4abc1">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="tua6zxh"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid=".34z2h_">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="g0:2gx9">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="l6d81a4">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="_vttb05"
                                    >
                                        <span data-oid="m8s6o7a">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="aj:dq58"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="__eh6nx"
                                    >
                                        <span data-oid="57ai1fu">Books:</span>
                                        <span className="text-gray-600" data-oid="qlmw:j0">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="k_prhg9"
                                        >
                                            <span data-oid="b.f-x7l">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="u7yh.g3"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid=":-zxve-">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="8igxga3"
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
