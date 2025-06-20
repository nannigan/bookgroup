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
            data-oid="6szq1rc"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="l8.n.89">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="jxbxejb">
                    <div className="flex items-center justify-between" data-oid="_init57">
                        <div className="flex items-center space-x-3" data-oid="xd7jf7o">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="qf01l.a"
                            >
                                <span className="text-white font-bold text-lg" data-oid="fh5cwb7">
                                    📚
                                </span>
                            </div>
                            <div data-oid="vxp4lu_">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="skw:qmd">
                                    BookGroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="wg7:.x0">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="onfiqmw"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="ps:3c9r">
                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="at.-_hz">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="v_1jdi.">
                        Welcome to Your Personal Library
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="54zgdr4">
                        Organize your reading journey by exploring different categories of books.
                        Track what you've read, what you're currently reading, and plan your future
                        reads.
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="x_gici4"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="_h3ag0f"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="s0spnly"
                            >
                                <div className="text-center" data-oid="s0mphr0">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="qze0wsj"
                                    >
                                        <span className="text-2xl" data-oid="nzvq87e">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="bh446tw"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="0jb8nu8"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="118nu:1">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="3y0.14x"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="2dfl5wv"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid="6h_r24l"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats Section */}
                <div
                    className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                    data-oid="4ngk3sl"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="pw07qf2"
                    >
                        Quick Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="yqptkpu">
                        <div className="text-center" data-oid="rmsj1qx">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid=".q-yyhb"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="9o60:sw">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="0n0eqv3">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="iv.tt7z"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="3b1lkj7">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="v725440">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="zlq0.4f"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="7am63g_">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="pb8ua_8">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid=":y5_2i6"
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid=":0__3za">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
