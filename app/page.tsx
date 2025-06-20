'use client';

import { useState } from 'react';

export default function Page() {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic',
            status: 'Read',
            rating: 4.5,
        },
        {
            id: 2,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            genre: 'Fiction',
            status: 'Currently Reading',
            rating: 4.8,
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            genre: 'Dystopian',
            status: 'Want to Read',
            rating: 4.7,
        },
        {
            id: 4,
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            genre: 'Romance',
            status: 'Read',
            rating: 4.3,
        },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        status: 'Want to Read',
        rating: 0,
    });

    const handleAddBook = () => {
        if (newBook.title && newBook.author) {
            setBooks([...books, { ...newBook, id: Date.now() }]);
            setNewBook({ title: '', author: '', genre: '', status: 'Want to Read', rating: 0 });
            setShowAddForm(false);
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
        setNewBook(book);
        setShowAddForm(true);
    };

    const handleUpdateBook = () => {
        setBooks(books.map((book) => (book.id === editingBook.id ? newBook : book)));
        setEditingBook(null);
        setNewBook({ title: '', author: '', genre: '', status: 'Want to Read', rating: 0 });
        setShowAddForm(false);
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Read':
                return 'bg-green-100 text-green-800';
            case 'Currently Reading':
                return 'bg-blue-100 text-blue-800';
            case 'Want to Read':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="l66_ymm"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="x3o9nza">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="z_xyck1">
                    <div className="flex items-center justify-between" data-oid="vy5f_m5">
                        <div className="flex items-center space-x-3" data-oid="4x:jk7x">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="61o-o64"
                            >
                                <span className="text-white font-bold text-lg" data-oid="ij93kbd">
                                    📚
                                </span>
                            </div>
                            <div data-oid="0rksdfy">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="7nk28tc">
                                    BookGroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="9t:o1yy">
                                    Manage your reading community
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="doinu-n"
                        >
                            + Add Book
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="2.jb75k">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="f61q494">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="wdqcer3"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="6rzv1bb">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="auq6zm-">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="b50_.oc"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="t-cws5.">
                            {books.filter((book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="g9h26.o">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="qcnyj9b"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="us832i0">
                            {books.filter((book) => book.status === 'Currently Reading').length}
                        </div>
                        <div className="text-gray-600" data-oid="8330mev">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="bt:.jm_"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="-62a31_">
                            {books.filter((book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="qaru2sz">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="e89wrjr"
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="x8x:95g"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="4pdez91"
                            >
                                <div className="flex-1" data-oid="ego34s5">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="6atia1j"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="wjnforr">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="ee7n9zc">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="rfwwypl">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="braqtxz"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="fl8k0t6"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between" data-oid="c2qbbfh">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="r5_1rt:"
                                >
                                    {book.status}
                                </span>
                                <div className="flex items-center space-x-1" data-oid="hlvg9ce">
                                    <span className="text-yellow-400" data-oid="h8ixlwi">
                                        ⭐
                                    </span>
                                    <span className="text-sm text-gray-600" data-oid="ynh2g-v">
                                        {book.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Add/Edit Book Modal */}
            {showAddForm && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    data-oid="iibj1v6"
                >
                    <div className="bg-white rounded-xl p-6 w-full max-w-md" data-oid="cdjgftp">
                        <h2 className="text-xl font-bold text-gray-900 mb-4" data-oid="4tu5gbc">
                            {editingBook ? 'Edit Book' : 'Add New Book'}
                        </h2>

                        <div className="space-y-4" data-oid="-qdq1b8">
                            <div data-oid="lsoi0aa">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="4lms4hj"
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
                                    data-oid="qw0k5p4"
                                />
                            </div>

                            <div data-oid=":p2p7ah">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="qj:cc9d"
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
                                    data-oid="o.laa-8"
                                />
                            </div>

                            <div data-oid="vvdon32">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="787thnv"
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
                                    data-oid="oi9rl9-"
                                />
                            </div>

                            <div data-oid="_9fu0ds">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="9pn7glc"
                                >
                                    Status
                                </label>
                                <select
                                    value={newBook.status}
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, status: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    data-oid="x_:7wzj"
                                >
                                    <option value="Want to Read" data-oid="nlougye">
                                        Want to Read
                                    </option>
                                    <option value="Currently Reading" data-oid="g_abudu">
                                        Currently Reading
                                    </option>
                                    <option value="Read" data-oid="m3gbz-g">
                                        Read
                                    </option>
                                </select>
                            </div>

                            <div data-oid="h51srsg">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    data-oid="2pq_-yc"
                                >
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={newBook.rating}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            rating: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="0.0"
                                    data-oid="q32.ixl"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6" data-oid="n2j.gpy">
                            <button
                                onClick={editingBook ? handleUpdateBook : handleAddBook}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                                data-oid="3q.1_hy"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setEditingBook(null);
                                    setNewBook({
                                        title: '',
                                        author: '',
                                        genre: '',
                                        status: 'Want to Read',
                                        rating: 0,
                                    });
                                }}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                data-oid="1qwcaba"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
