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
            data-oid="lmo5aw_"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="d_se9hi">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="-27upm6">
                    <div className="flex items-center justify-between" data-oid="4eq-0a-">
                        <div className="flex items-center space-x-3" data-oid=":t0v2y4">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="qxhejog"
                            >
                                <span className="text-white font-bold text-lg" data-oid="nq2d:9z">
                                    📚
                                </span>
                            </div>
                            <div data-oid="r8nl_-d">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="nhy:avs">
                                    BookGroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="jack6nw">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="qaujbjf"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="q04f8-n">
                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="c57n3ua">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="rf2.ss2">
                        Welcome to Your Personal Library
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="d:zxa35">
                        Organize your reading journey by exploring different categories of books.
                        Track what you've read, what you're currently reading, and plan your future
                        reads.
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="0:k6tk0"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="6p50yvn"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="uqsduyx"
                            >
                                <div className="text-center" data-oid="un9.m1f">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="kjzuylj"
                                    >
                                        <span className="text-2xl" data-oid="arg6_5o">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="7-m67_e"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="p:vjri4"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="-q4z8gu">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="ek3admr"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="0pf-g64"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid="n2ez91i"
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
                    data-oid="z0fnm_f"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="d5ufr3r"
                    >
                        Quick Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="cs5gy-f">
                        <div className="text-center" data-oid="jiot4-v">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="g.yg9hw"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="_4a0xn5">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="mxewiau">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid=":0zglgx"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="4t4g9gt">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="30ij1si">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="q5oocj:"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="o6a00eo">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="7c0pc-e">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="gki09t."
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="3624qht">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
