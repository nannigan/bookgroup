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
            data-oid="n4z559t"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="pi8tw7.">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="hxc5n3t">
                    <div className="flex items-center justify-between" data-oid=":fqf63s">
                        <div className="flex items-center space-x-3" data-oid="1esdhkl">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="owxs387"
                            >
                                <span className="text-white font-bold text-lg" data-oid="6vu.5db">
                                    📚
                                </span>
                            </div>
                            <div data-oid="s34ze2d">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="za09zu7">
                                    BookGroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="ci7h0-u">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="eb-fy97"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="tua:agq">
                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="v_a.ws5">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="zkl1g-p">
                        Welcome to Your Personal Library
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="kqf5rza">
                        Organize your reading journey by exploring different categories of books.
                        Track what you&apos;ve read, what you&apos;re currently reading, and plan
                        your future reads.
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="51d.o:k"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="h_dyadz"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="o0:-ozg"
                            >
                                <div className="text-center" data-oid="nm:f4u7">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="480d9mo"
                                    >
                                        <span className="text-2xl" data-oid="6wwrw6k">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="1ehfnwo"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid=".l1x7d4"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="cd07eii">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="ga3-1yj"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="0b1s-n5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid=".kn491i"
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
                    data-oid=":h50whe"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid=":a4zmgi"
                    >
                        Quick Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="y6l8cwk">
                        <div className="text-center" data-oid="cecplam">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="h-3fy9b"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="d4tjd1v">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="wwmdzqa">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="y6f_kr3"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="axb1a5k">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="y0.i8.-">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="3iw6u42"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="3ucb0i5">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="3:0a8jm">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="x269h.y"
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="uuft0e9">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
