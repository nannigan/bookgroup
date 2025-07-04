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
                data-oid="vo91p5k"
            >
                <div className="text-center" data-oid="l0ici2l">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"
                        data-oid="phkzk_l"
                    ></div>
                    <p className="text-gray-600" data-oid="uh3mo2e">
                        Loading your books...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="t-6uaen"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="8el10ij">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="yld:cam">
                    <div className="flex items-center justify-between" data-oid="imtszc.">
                        <div className="flex items-center space-x-3" data-oid="0u7op6w">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                                data-oid="sukdcld"
                            >
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                    data-oid="4jsmr4:"
                                >
                                    <span
                                        className="text-white font-bold text-lg"
                                        data-oid="pb1y.yp"
                                    >
                                        📚
                                    </span>
                                </div>
                                <div data-oid="4yci30f">
                                    <h1
                                        className="text-2xl font-bold text-gray-900"
                                        data-oid=":5r-j4y"
                                    >
                                        All Books
                                    </h1>
                                    <p className="text-sm text-gray-600" data-oid="m2q.4p6">
                                        Your complete book collection
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="gao_fpf">
                            {/* Connection Status */}
                            <div className="flex items-center space-x-2" data-oid="rm5xu3l">
                                <div
                                    className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                                    data-oid="r1h4td3"
                                ></div>
                                <span className="text-xs text-gray-500" data-oid="xqsetj4">
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {lastSync && (
                                    <span className="text-xs text-gray-400" data-oid="vll64s3">
                                        • Last sync: {new Date(lastSync).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="aa:_8ij"
                            >
                                ← Back to Home
                            </Link>

                            {isOnline && (
                                <button
                                    onClick={forceSync}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Sync with shared data"
                                    data-oid="k8bsra4"
                                >
                                    🔄
                                </button>
                            )}

                            <button
                                onClick={() => setShowImportExport(true)}
                                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                data-oid="w5noff6"
                            >
                                ⚙️ Manage Data
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                data-oid="mohhhzt"
                            >
                                + Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="f9y-xy3">
                {/* Connection Status */}
                <JSONBinStatus data-oid=":toawvk" />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="mmfxslj">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="g:rwj9p"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="zn3jrj4">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="4cgg.9_">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="f3j0sn8"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="2whexyg">
                            {books.filter((book: Book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="pi9j-z4">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="v_s8:zn"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="96fbrrg">
                            {
                                books.filter((book: Book) => book.status === 'Currently Reading')
                                    .length
                            }
                        </div>
                        <div className="text-gray-600" data-oid="8rpv5k5">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="a69vegc"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="_r_-qhc">
                            {books.filter((book: Book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="81yj4gp">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="s9orf0g"
                >
                    {books.map((book: Book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="pbs459a"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="ehj6pw3"
                            >
                                <div className="flex-1" data-oid="f8aaka_">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="0yca2o6"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="n9zgkqr">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="jb3_hhg">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="33s73mb">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="4f-pmhi"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="mijrnhu"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="a40:rc6">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="7pqs3x8"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="bmdxly_">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="437ps4-"
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
                    data-oid="mplboif"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="qhs3l5e">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="p7aljn7">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid=":.j-ipa">
                            <div data-oid="0j_a_fu">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="08p51sn"
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
                                    data-oid="tgdbpj3"
                                />
                            </div>

                            <div data-oid="tzbh:7f">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="zdu2o3f"
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
                                    data-oid="d_n.arw"
                                />
                            </div>

                            <div data-oid="ed5anth">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid=":len9_q"
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
                                    data-oid=":gghtxh"
                                />
                            </div>

                            <div data-oid="7qevid4">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="5p.s--p"
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
                                    data-oid="0w6kvuu"
                                >
                                    <option value="Want to Read" data-oid="8q722nm">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="9pn9:zx">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="qa:4b3j">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="b0sr7:0">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="zk.:e:w"
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
                                    data-oid="sam_wib"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="2:_5_db">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="irj8nw4"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="cy7d1zp"
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
                    data-oid="2j40exn"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="y4ijl3q">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="vpaz_58">
                            Manage Your Data
                        </h2>

                        <div className="space-y-4" data-oid="7uo::vw">
                            <div data-oid="vxx035:">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="w5hq3o_">
                                    Export Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="flzjt6u">
                                    Download your books as a JSON file for backup or sharing.
                                </p>
                                <button
                                    onClick={exportBooks}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    data-oid="l5fpruf"
                                >
                                    📥 Export Books
                                </button>
                            </div>

                            <div data-oid="2abq0b0">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="7nd_bby">
                                    Import Books
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="rgrfzuu">
                                    Import books from a JSON file. This will add to your existing
                                    books.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImportBooks}
                                    accept=".json"
                                    className="hidden"
                                    data-oid="4jdx2ye"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    data-oid="qyapnmp"
                                >
                                    📤 Import Books
                                </button>
                            </div>

                            <div data-oid="rpc-gwa">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="ujl8att">
                                    Reset Data
                                </h3>
                                <p className="text-sm text-gray-600 mb-3" data-oid="1yen2p-">
                                    Reset to the original sample books. This will delete all your
                                    custom data.
                                </p>
                                <button
                                    onClick={handleResetData}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    data-oid="jffs4z:"
                                >
                                    🔄 Reset to Defaults
                                </button>
                            </div>

                            <div data-oid="k15qgap">
                                <h3 className="font-semibold text-gray-700 mb-2" data-oid="4fc0ibs">
                                    Connection Status
                                </h3>
                                <div className="space-y-2 text-sm" data-oid="ezxpktt">
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="e9::0tx"
                                    >
                                        <span data-oid="jeab:lt">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                isOnline
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                            data-oid="z33g:kh"
                                        >
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="f2lzdxc"
                                    >
                                        <span data-oid="c7xugzv">Books:</span>
                                        <span className="text-gray-600" data-oid="qjl7fcc">
                                            {books.length} total
                                        </span>
                                    </div>
                                    {lastSync && (
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="yr5uwl-"
                                        >
                                            <span data-oid=":b27tvh">Last Sync:</span>
                                            <span
                                                className="text-gray-600 text-xs"
                                                data-oid="k5_y59x"
                                            >
                                                {new Date(lastSync).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6" data-oid="l1qwes2">
                            <button
                                onClick={() => setShowImportExport(false)}
                                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                data-oid="n7-uoor"
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
