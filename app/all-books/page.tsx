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
                data-oid="y0uv.9t"
            >
                <div className="text-center" data-oid="lutjcvy">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="9q1o7c0"
                    ></div>
                    <p className="text-gray-600" data-oid="9_foweq">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="m51-n:w"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="e7r1-d1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="ft0.u6y">
                    <div className="flex items-center justify-between" data-oid="rszyqcj">
                        <div className="flex items-center space-x-3" data-oid="_3p4cai">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="hui3b08"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="r0t72b5"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="_j9n8ay"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="oh11yc8">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="2n4fv23"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="4qy8xxv">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-rxz_n6">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="i_ip4__">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="fvq9uzl"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="kovx05.">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="cq:kv6k">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="0:9e6h_"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="y58uodx"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="c2j5.ib"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="-94r_nn"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="jjqk153">
                {/* Connection Status */}
                <JSONBinStatus data-oid="hro1o12" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="jw1:h:m">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="p-q66az"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="95-1u9c">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="a7wumi0">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="cqrlzt:"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="z5ccb_p">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="e0gs2ps">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="gxd95jo"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="l304djg">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="xwn7kwc">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="qx08nxb"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="9tymsxd">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="8i_lcd_">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="1y799do"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="xmb0q8z"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="8mmhlm_"
                            >
                                <div className="flex-1" data-oid="nvo89mb">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_k5q_6w"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="2sac_v2">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="3fult_1">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="kkhzm5t">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="9ng_6gn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="yg6wiyp"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="7sup8k9">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="1..rdlu"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="tdvn71l">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="24t0iu2"
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
                    data-oid="s_0a:.l"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="1k5uv79">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="a8-1o_9">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="d2gegec">
                            <div data-oid=":x:c-fs">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="z_x:mo9"
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
                                    data-oid="nw6kx1f"
                                />
                            </div>

                            <div data-oid="-fgcnxz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="a.h8fr-"
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
                                    data-oid="7r0vunr"
                                />
                            </div>

                            <div data-oid="44:8d6_">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="idk_ccu"
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
                                    data-oid="bqob.0_"
                                />
                            </div>

                            <div data-oid="vxz3j-8">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="_l3-j.3"
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
                                    data-oid="9ivm6py"
                                >
                                    <option value="Want to Read" data-oid=".ynj1y_">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="ivhcw9p">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="5a5wf6:">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="xi_sa9k">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="vsoy-rk"
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
                                    data-oid=":fnz1v5"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="o6qu3dm">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="vjxrcvg"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="b5fmtis"
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
                    data-oid="mq974oi"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="j60avwv">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="jhpf1q2">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="-e6_aqg">
                            <div data-oid="gizel3m">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="0-a.owd">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="wwm:l1t">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="0n1emyb"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="6r_rbuo">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="d1ubf8k">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="1kzty1g">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="w4dly2t"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="ncvx589"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="zz.:sv1">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="j13gpbo">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="6t29okw">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="-1nym.o"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="7t8vh3z">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="6cw7f:_">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid=":vu-r6v">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="rpu1la0"
                                    >
                                        <span data-oid="_z9drkx">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="1z:z1aa"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="o2-ygnf"
                                    >
                                        <span data-oid="nkvl6sr">Books:</span>
                                        <span className="text-gray-600" data-oid=".a7h:7e">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="0m794if"
                                        >
                                            <span data-oid="w8avz9c">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="d_b.4a3"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="esnscd5">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="1-3p38k"
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
