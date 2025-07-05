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
                data-oid="n_hrv3-"
            >
                <div className="text-center" data-oid="e2:735y">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="eb9mhiy"
                    ></div>
                    <p className="text-gray-600" data-oid="-3a:rh.">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="ipr4.46"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="n7c--fk">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="y1v-pi0">
                    <div className="flex items-center justify-between" data-oid="_-u1-d1">
                        <div className="flex items-center space-x-3" data-oid="tta-aa7">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="w0xjo7r"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="a1v83q1"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="qgzc.91"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="09y.2zl">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="4r176x1"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="vtzfkf1">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid=".1.i.0o">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="7hjt5pu">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="-tjge5k"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="q23l:tq">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="t4shrsv">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="ubs:25d"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="e:88ab5"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="kronlw9"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="ak-ty_t"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="3neosf9">
                {/* Connection Status */}
                <JSONBinStatus data-oid="fpyxa3p" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="pz4s3.b">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="h3fhf:i"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="swhi3eb">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="crvs:xy">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="g4kcnha"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="0-r11ps">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="x-8sy2n">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="_j0_bqg"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="geyyvjy">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid=":3-w.m-">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="g69xx2-"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="699y7.:">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="_.ywh-y">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid=":czel0c"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="ny528:8"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="tgk_ykd"
                            >
                                <div className="flex-1" data-oid="w57k3_o">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="65-uevv"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="b42o-o9">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="wspu7rr">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="qf-djas">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="vwwl:s8"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="sv5ftb8"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="vixzoft">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="xzxoma_"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="x8hor_v">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="3swt:kj"
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
                    data-oid="72ett20"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="sf6-pf7">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="jlnb7dy">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="h:nd0r-">
                            <div data-oid="_k-rlf5">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="r4mdum9"
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
                                    data-oid="s78fkv9"
                                />
                            </div>

                            <div data-oid="977urcs">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="v:cib1s"
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
                                    data-oid="hdvrfx."
                                />
                            </div>

                            <div data-oid="g:nqw.6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="xadg-k4"
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
                                    data-oid="6v746bd"
                                />
                            </div>

                            <div data-oid="u159z-o">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="d3a8sp7"
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
                                    data-oid="y03w5bi"
                                >
                                    <option value="Want to Read" data-oid="wyqm197">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="4uuku6b">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="qt4v8ow">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="csg:a0e">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="2hgsyz6"
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
                                    data-oid="lwlijis"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="0edb_04">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="o:x7mch"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="v_-i_.4"
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
                    data-oid=".nu51.2"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="a5wqknv">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="u1dvfab">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="5u6f8.l">
                            <div data-oid="rvh9eku">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="2aqp4id">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="k-nd6ja">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="om5afkm"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="483gzjs">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="rlwojiz">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="k08fqlk">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="wo6u:s_"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="4vjk3vn"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="nbj1_z5">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid=".shuaz9">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="s68gi7z">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="0_y6dof"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="wm-zbyn">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="96-w4cn">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="ngc1isr">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="tu.1mkb"
                                    >
                                        <span data-oid="2pac28-">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="hnwhexn"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="3sd.y0v"
                                    >
                                        <span data-oid="i:hp6rs">Books:</span>
                                        <span className="text-gray-600" data-oid="_2sbh3l">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="8z0f:cd"
                                        >
                                            <span data-oid="-a-kb:f">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="383l7m."
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="u51y896">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="hlh79ng"
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
