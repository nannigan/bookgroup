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
                data-oid="jm7rxp_"
            >
                <div className="text-center" data-oid="y_qewck">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="fj2m7a9"
                    ></div>
                    <p className="text-gray-600" data-oid="ha5v4g1">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="u3e-q2-"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="cg6-tw-">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="acqvq2d">
                    <div className="flex items-center justify-between" data-oid="eaoj7c_">
                        <div className="flex items-center space-x-3" data-oid="amlkf4r">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="vf9byt:"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="xhnwwm8"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="mpu7oan"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="ilb1:_8">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid="miftifr"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="wfs:wds">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="ap-bb4j">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="8qshh8d">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="q0semyn"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="0_:.gry">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="8kiatkv">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="gwp1w1l"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="r54nedx"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="i0w02z8"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="xf6g8sg"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="tg_ve9u">
                {/* Connection Status */}
                <JSONBinStatus data-oid=":9clr30" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="1nzps.i">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="fjgqedp"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="8-i6c2p">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="x-wz3v2">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="6xhanqs"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="0wvedfk">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="cgaylz1">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="68uuw4_"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="2m4l_su">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="w7pnr9c">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="z.0s_a8"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="-uwab3e">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="w2_mu1m">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="4nilgx0"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="c8-l:4:"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="d:zrdz."
                            >
                                <div className="flex-1" data-oid="8sezcse">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="xmr2xgd"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="u4i0qbm">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="j.vxmtc">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="7q5ry3u">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="egmelya"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="1rj9p-p"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="pyv1.wr">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="mi..z:o"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="00hbrar">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="ru.h9q6"
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
                    data-oid="mog8am:"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="4dlsntk">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="m909pni">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="m16.33n">
                            <div data-oid="ef8-99u">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="yd3w45r"
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
                                    data-oid=".xup_lc"
                                />
                            </div>

                            <div data-oid="-.4-gt-">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="ya3khda"
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
                                    data-oid="kzldkpo"
                                />
                            </div>

                            <div data-oid="ia1:27-">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="bukgd:f"
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
                                    data-oid="04g9fvu"
                                />
                            </div>

                            <div data-oid="231ekbw">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="kcx6fzb"
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
                                    data-oid="m9:9b3n"
                                >
                                    <option value="Want to Read" data-oid="5imae95">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="40thc_9">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="jue1f2.">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="hx5006j">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="cujo:91"
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
                                    data-oid="t3vg2k_"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="8v___iu">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="2o6j2t2"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="42w8xfd"
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
                    data-oid="bzei.3r"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="ziyhicy">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="m1v_kqw">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="1bw7frm">
                            <div data-oid="fg_liru">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="dfj_3sj">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="ivtih_h">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="qminvxa"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="ais6wat">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ty8q1n-">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="43ewmp9">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="a5o4-ep"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="1w7rxfq"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="h31erw-">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="xc7vyg_">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="4ubuqi-">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="g15nn5d"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="66rkzp4">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="luzdoyr">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="v:b7.l.">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="6kqf-r7"
                                    >
                                        <span data-oid="n7wfysr">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="xu6xq82"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="fq6l5f0"
                                    >
                                        <span data-oid="ok9.yh2">Books:</span>
                                        <span className="text-gray-600" data-oid="jcv1f_:">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="piz40gk"
                                        >
                                            <span data-oid="52b:xiu">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="gptt5id"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="iwo97iu">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="opp5lg4"
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
