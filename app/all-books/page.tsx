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
                data-oid="7vfwebs"
            >
                <div className="text-center" data-oid="8p00u2v">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="felmar5"
                    ></div>
                    <p className="text-gray-600" data-oid="-mz4pso">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="s8_9an:"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="0wif_nk">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="sa2:6vz">
                    <div className="flex items-center justify-between" data-oid="pkh86g2">
                        <div className="flex items-center space-x-3" data-oid="w2.o03x">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="agd1o.r"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="-gj.9._"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="j4p9dg-"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="18tq6qu">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="6wv31v_"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="twq_hfx">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="2latxcm">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="i2l38qa">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="jmspt4e"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="kl-bptu">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="4.7xt0x">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="p5vtpxy"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid=":6susdp"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="aj58k2v"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="e3qrfer"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="8jt-2cm">
                {/* Connection Status */}
                <JSONBinStatus data-oid="zebt2pn" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="uzyst:c">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="g-cx0py"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="yx-aqmo">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="mq24s.7">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="pf1tjvy"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="c0f8v1z">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="hcxzm6f">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="ohrj3lg"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="-dk:5x6">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="vqwb8b6">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="4_h0dkx"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="5nj6iom">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="k21y4a_">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="cesxc8b"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="1n57ybz"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="a9xhtwk"
                            >
                                <div className="flex-1" data-oid="7_0tig_">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="_p40hpd"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="r-t:9.t">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="-3ohkgv">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="14atll-">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="x55g7ut"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="9g::--5"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="sr_:5-n">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="dyzznqq"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="u3b5w83">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="x1m5.ye"
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
                    data-oid="j7qqj3y"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="3yfx-8q">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="myr-ybc">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="yl16wjw">
                            <div data-oid="pf-f5_o">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="6.928v6"
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
                                    data-oid="b9acbl6"
                                />
                            </div>

                            <div data-oid="i:wh3bz">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="bp8a3ao"
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
                                    data-oid="tv4o5ea"
                                />
                            </div>

                            <div data-oid="y1vqio.">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="uwlg:yw"
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
                                    data-oid="a5_9dco"
                                />
                            </div>

                            <div data-oid="sspxwt-">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="z2twy9v"
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
                                    data-oid="_wnj6kv"
                                >
                                    <option value="Want to Read" data-oid="9x7zn8f">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="xtp6cuf">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="io5b7ss">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="1sdbpy6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="mkqto-:"
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
                                    data-oid="1xhibnq"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="mssxpzg">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="wcd73uv"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="owwoxok"
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
                    data-oid="p15inc5"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="ugdgocr">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="tvngjr_">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="g4i2qjc">
                            <div data-oid="q-4s:y1">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ju-3s3o">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid=".s0l4n2">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="9z12njs"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="xchu2e5">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="8lf_8o3">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="9bg2sox">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="sfan6g0"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="wx__96a"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="rkzconx">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="vqutxue">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="3wjx:ck">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="xe1p3lj"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="e3qj4og">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="pjc0:eb">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="oi_ic3h">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="r_0e6aq"
                                    >
                                        <span data-oid="3o:qh:r">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="a0stb.-"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="vn48k48"
                                    >
                                        <span data-oid="rvlr6rp">Books:</span>
                                        <span className="text-gray-600" data-oid="p_aobt9">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="cy_ymcc"
                                        >
                                            <span data-oid="cn4xsyv">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="7-:xt2d"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="89.d2a9">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="a-hdej:"
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
