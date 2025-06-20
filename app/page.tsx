'use client';

import Link from 'next/link';

export default function Page() {
    const categories = [
        {
            title: 'All Books',
            description: 'Browse your complete book collection',
            icon: '📚',
            color: 'from-purple-600 to-indigo-600',
            borderColor: 'border-purple-100',
            textColor: 'text-purple-600',
            href: '/all-books',
        },
        {
            title: 'Books Read',
            description: 'View all the books you have completed',
            icon: '✅',
            color: 'from-green-600 to-emerald-600',
            borderColor: 'border-green-100',
            textColor: 'text-green-600',
            href: '/books-read',
        },
        {
            title: 'Currently Reading',
            description: 'Books you are actively reading',
            icon: '📖',
            color: 'from-blue-600 to-cyan-600',
            borderColor: 'border-blue-100',
            textColor: 'text-blue-600',
            href: '/currently-reading',
        },
        {
            title: 'Want to Read',
            description: 'Your reading wishlist and future reads',
            icon: '🔖',
            color: 'from-yellow-600 to-orange-600',
            borderColor: 'border-yellow-100',
            textColor: 'text-yellow-600',
            href: '/want-to-read',
        },
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100"
            data-oid="l66_ymm"
        >
            {/* Header */}
            <header
                className="bg-white shadow-sm border-b border-purple-100"
                data-oid="x3o9nza"
                key="olk-P4ML"
            >
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
                                <p
                                    className="text-sm text-gray-600 w-[220px] h-[59px]"
                                    data-oid="9t:o1yy"
                                >
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                                <p
                                    className="w-[30px] h-[30px]"
                                    data-oid="89sdq0x"
                                    key="olk-e_eu"
                                ></p>
                            </div>
                        </div>
                        <p className="w-[30px] h-[30px]" data-oid="2.bwow3" key="olk-jWXI"></p>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="doinu-n"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}

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
                                    Comment
                                </label>
                                <textarea
                                    value={newBook.comment}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            comment: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    placeholder="Add your thoughts about this book..."
                                    rows={3}
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
                                        comment: '',
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
            <main
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                data-oid="2.jb75k"
                key="olk-alSM"
            >
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="1lanv3l">
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
                        data-oid="qj3ityl"
                    >
                        <div className="text-2xl font-bold text-purple-600" data-oid="6o850td">
                            {books.length}
                        </div>
                        <div className="text-gray-600" data-oid="blh19-g">
                            Total Books
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
                        data-oid="zj73xj5"
                    >
                        <div className="text-2xl font-bold text-green-600" data-oid="zkmzp1v">
                            {books.filter((book) => book.status === 'Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="2cj73p4">
                            Books Read
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-blue-100"
                        data-oid="g6qpg3-"
                    >
                        <div className="text-2xl font-bold text-blue-600" data-oid="2bwrepi">
                            {books.filter((book) => book.status === 'Currently Reading').length}
                        </div>
                        <div className="text-gray-600" data-oid="qh9q_b6">
                            Currently Reading
                        </div>
                    </div>
                    <div
                        className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
                        data-oid="lvm5_o3"
                    >
                        <div className="text-2xl font-bold text-yellow-600" data-oid="n-s23m0">
                            {books.filter((book) => book.status === 'Want to Read').length}
                        </div>
                        <div className="text-gray-600" data-oid="-39hxfm">
                            Want to Read
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="7anmr3s"
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                            data-oid="aifw1lc"
                        >
                            <div
                                className="flex justify-between items-start mb-4"
                                data-oid="u06etzg"
                            >
                                <div className="flex-1" data-oid="afrfnjh">
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        data-oid="6hy44xy"
                                    >
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2" data-oid="ofwnatn">
                                        by {book.author}
                                    </p>
                                    <span className="text-sm text-gray-500" data-oid="ozzfaz1">
                                        {book.genre}
                                    </span>
                                </div>
                                <div className="flex space-x-2" data-oid="jg8joy5">
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                        data-oid="jqhc0of"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        data-oid="91echt4"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3" data-oid="3aie07r">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}
                                    data-oid="o.0jyp7"
                                >
                                    {book.status}
                                </span>
                                {book.comment && (
                                    <div className="bg-gray-50 p-3 rounded-lg" data-oid="kzfr0ki">
                                        <p
                                            className="text-sm text-gray-700 italic"
                                            data-oid="miuw_lh"
                                        >
                                            "{book.comment}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
