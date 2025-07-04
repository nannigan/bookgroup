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
            data-oid="ioo7dai"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="s4s41rr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="babjdl3">
                    <div className="flex items-center justify-between" data-oid="l8y:km4">
                        <div className="flex items-center space-x-3" data-oid="e4no5v5">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="admuvmn"
                            >
                                <span className="text-white font-bold text-lg" data-oid="1x:ko7t">
                                    📚
                                </span>
                            </div>
                            <div data-oid="4hvh5s2">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="kdcv2wb">
                                    Resistor Sisters Bookgroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="fu8_lgr">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="_i5yt.2"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="9mmqyef">
                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="wyaqdee">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="c4xfa-r">
                        Welcome to All the Books in One Place!
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="f-athg_">
                        Organize organize  organize
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="s5jve9y"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="f1n1:5e"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="ijd81hc"
                            >
                                <div className="text-center" data-oid="cz_-29t">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="kqgunkg"
                                    >
                                        <span className="text-2xl" data-oid="1mli4m3">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="n:30skq"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="gcpk:3i"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="h37gsav">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="hg82088"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="ij3stjt"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid="0..m_e9"
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
                    data-oid="dsnzyr2"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="v.1.8d-"
                    >
                        what shall we use this for or not?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="y8chbxg">
                        <div className="text-center" data-oid="s3g1x9f">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="kpb7y3n"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="l6kc498">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="5bt8l1f">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="pjzm4o:"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="0oygh_e">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid=".kke0pm">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="9ql9wym"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="_vhq8yn">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="vg0uta5">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="vvcsj1h"
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="b9nu_mu">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
