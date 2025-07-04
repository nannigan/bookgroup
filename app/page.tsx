'use client';

import Link from 'next/link';
import { DebugJSONBin } from '../components/DebugJSONBin';

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
            data-oid="80j4-bh"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="ddwd25y">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="jppxtlj">
                    <div className="flex items-center justify-between" data-oid="n:cirh9">
                        <div className="flex items-center space-x-3" data-oid="sh3.1z2">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="8zju2q0"
                            >
                                <span className="text-white font-bold text-lg" data-oid="3bq3091">
                                    📚
                                </span>
                            </div>
                            <div data-oid="7c-bpcs">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="f2fh44j">
                                    Resistor Sisters Bookgroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="bfow73q">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="lfi4._7"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="hq95p43">
                {/* Debug Section - Remove this after debugging */}
                <DebugJSONBin data-oid="smougtm" />

                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="5dcxzke">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="ap:c_mt">
                        Welcome to All the Books in One Place!
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="cz:6hl-">
                        Organize organize  organize
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="kc5wjp9"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="782o-oh"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="vzasc6y"
                            >
                                <div className="text-center" data-oid="5xmu4.5">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="yyxkgx5"
                                    >
                                        <span className="text-2xl" data-oid="3v3o161">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="qvgyngs"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="u4tdtvn"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="u6eh7jl">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="g55tmz1"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="4-xm4zg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid="a77sfqe"
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
                    data-oid="-wupj4k"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="1m8_21q"
                    >
                        what shall we use this for or not?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="r:c3m5i">
                        <div className="text-center" data-oid="ekya7zr">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="y706.:4"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="q251k38">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="up1ag.8">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="hypi__-"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="cp4ja9w">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="wywbb94">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="81b9m6c"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="pj:pm.r">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="qk..acn">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="_eqe3y2"
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="47gneef">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
