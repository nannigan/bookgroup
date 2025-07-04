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
                data-oid="73a.nwk"
            >
                <div className="text-center" data-oid="_api19c">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="5vaivl-"
                    ></div>
                    <p className="text-gray-600" data-oid="avp9:uj">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="n73iq7z"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="5zlb-oj">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="81xilqx">
                    <div className="flex items-center justify-between" data-oid="1ekk197">
                        <div className="flex items-center space-x-3" data-oid="-.xfs8t">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="qi.umzm"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="2rmgivz"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="d9s_o79"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="fqv1zhg">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="6ixxobz"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="3x.s5ee">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="oon-k_f">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="py22cvy">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="cl:ulm3"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="1hd2751">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="oah-mjg">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="w8ecsn3"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="aim67yo"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="rd5sey7"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="yj1ac1g"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="yr3-di9">
                {/* Connection Status */}
                <JSONBinStatus data-oid="gudt8ht" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="5_s3wbu">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="7q1rjfd"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid=".q58le6">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="ht:sxwq">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="j51d4em"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="co.gj8f">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="..i58ug">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="m1-9fs2"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="bh7iz60">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="f:gnlpq">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="b4hboa4"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="yn9zui.">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="-hccq94">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="qgk:ux4"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="6.dw1lb"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="3.b1k6:"
                            >
                                <div className="flex-1" data-oid="sfl.k_0">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="6syemgl"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="_sfjwqd">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="g.b1:ev">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="9p-j.iw">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid=":1gh_8l"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="z5bxuba"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="k8luo:b">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="69a7d4n"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="feok6ah">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="smkz:1x"
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
                    data-oid="a:vzu.5"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="rzaf0oj">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="a1__s2x">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="xl4d9gk">
                            <div data-oid="m-s1-42">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="m.:buu0"
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
                                    data-oid="dsdi73t"
                                />
                            </div>

                            <div data-oid="adeknlu">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="qo52a.2"
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
                                    data-oid=":.r-x5u"
                                />
                            </div>

                            <div data-oid="7iqd6un">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="5qe61tp"
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
                                    data-oid="hw:8nq5"
                                />
                            </div>

                            <div data-oid="3e7fp6y">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="1wg0b19"
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
                                    data-oid="0amgq3l"
                                >
                                    <option value="Want to Read" data-oid="n1xbzpd">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="-56coiw">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="9w8w1na">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="oprdy:w">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="wva_l2c"
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
                                    data-oid="wph83pl"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="bgvc-vk">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="uvq42hc"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="nmc6xzx"
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
                    data-oid="junave7"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="5-25ilt">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="r70pzhx">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="2:or2s1">
                            <div data-oid="6mq5v1n">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="-:8o7dg">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="0x3lu9j">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="i6px0_p"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="f7t_.yt">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="32c2a0q">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="w4_g6kn">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="cp0e01q"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="lqt452y"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="ueb2bkh">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="a_qjz7p">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="wwg:4tn">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="xhc1i.1"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="z9sthf-">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="09l767l">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="s6_a2fr">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="ssjrrw1"
                                    >
                                        <span data-oid="519yg_:">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="ufxtw74"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="vn-f48z"
                                    >
                                        <span data-oid="9608tcp">Books:</span>
                                        <span className="text-gray-600" data-oid="ulv1.sf">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="ii:uvf9"
                                        >
                                            <span data-oid="j4kmp4s">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="pxy62m5"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="3fakep6">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="xpv:z_u"
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
