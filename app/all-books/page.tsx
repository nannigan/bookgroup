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
                data-oid="nllf-z6"
            >
                <div className="text-center" data-oid="ei7p_gx">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="9i02yyt"
                    ></div>
                    <p className="text-gray-600" data-oid="_t2rplu">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="pnii:zd"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="v2s0mh.">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="gpff_ye">
                    <div className="flex items-center justify-between" data-oid="0p-p0h7">
                        <div className="flex items-center space-x-3" data-oid=":iam6k6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="u3c3z5s"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="pzrahlz"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="30un3f7"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="a2g-wod">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="uhv1fcb"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="htiwf7m">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="7nri0up">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="-hjirr6">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="llqhc:3"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="0_x57l9">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="yzw09:f">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="n7e.wx."
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="phtnb8j"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="mun4wpm"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="g7.6ze_"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="u9oog_x">
                {/* Connection Status */}
                <JSONBinStatus data-oid="j--jkyw" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="nnypa9v">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="4_n6j5v"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="o.ct8ep">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="etn31jo">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="g241xo."
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="2wzq5ss">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="x9ym.0r">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="fna_5a."
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="s.jk9bd">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="m92-vzq">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="ju4.bw_"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="4h15tty">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="vv-.z_2">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="e62m588"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="wj277n2"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="z998v0n"
                            >
                                <div className="flex-1" data-oid="7imdbk0">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="zvue.bp"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="kzahw03">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="k86u.vq">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="0b9cx-c">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="7laxir4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="45_9a:v"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="qwimwks">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="t6z0xod"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="vz5kph:">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="sxismnc"
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
                    data-oid="5.douxo"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="v9ogaxc">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="qbrfr7z">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="ic7-gqw">
                            <div data-oid="550adou">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="oo5e:v1"
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
                                    data-oid="9dgvm7u"
                                />
                            </div>

                            <div data-oid="0kuyz76">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="36g.uu_"
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
                                    data-oid=":6s:ia7"
                                />
                            </div>

                            <div data-oid="z9khllh">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="p5p2wd6"
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
                                    data-oid="ze.u2p1"
                                />
                            </div>

                            <div data-oid="fw674uw">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kk5:_be"
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
                                    data-oid="v8m:kqe"
                                >
                                    <option value="Want to Read" data-oid="l6j3xog">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="oe8ur8d">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="kqghfm-">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="53pp5k:">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=":0wj.88"
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
                                    data-oid="n5nt0s_"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="ax48tg:">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="6vho3a2"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="-zxlqds"
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
                    data-oid="oxwf1mo"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="2bszb.2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="pgtr3id">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="5eky5hr">
                            <div data-oid="-9xl5vc">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="1f25n60">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="30cds2_">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="hrb7gih"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="z0t4es2">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="y:ylccz">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="kzd_6yq">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="26x4d:e"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="k2tdxe5"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="a0fxsqh">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="24:btpv">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="6n8em03">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="84b9xgq"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="lcvza1s">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="te9ayoq">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="mmrscdt">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="n.0.cw1"
                                    >
                                        <span data-oid="q.q7d26">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="d..wwcu"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="o_dnsx0"
                                    >
                                        <span data-oid="unujl.s">Books:</span>
                                        <span className="text-gray-600" data-oid="vofy2v-">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="xfb6eaw"
                                        >
                                            <span data-oid="vocxtwe">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="_m.-:ut"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="ww4-m4_">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="6b.7ijx"
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
