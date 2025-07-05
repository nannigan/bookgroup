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
            data-oid="blbyfme"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="_mgosrz">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="96pe-3e">
                    <div className="flex items-center justify-between" data-oid="ncrx905">
                        <div className="flex items-center space-x-3" data-oid="i7xr0n_">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="ew7w2is"
                            >
                                <span className="text-white font-bold text-lg" data-oid="oqasqy:">
                                    📚
                                </span>
                            </div>
                            <div data-oid="1fk2ik0">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="u-:0khc">
                                    Resistor Sisters Bookgroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="1p2lhof">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="8rm:4sr"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="mb:0snn">
                {/* Debug Section - Remove this after debugging */}
                <DebugJSONBin data-oid="o8vcekv" />

                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="fd-oh2l">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="ripmqn_">
                        Welcome to All the Books in One Place!
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="-5r0kla">
                        Organize organize  organize
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="si9i1o_"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="p6oco4r"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="9fl7jup"
                            >
                                <div className="text-center" data-oid="2hh_144">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="5b01u4i"
                                    >
                                        <span className="text-2xl" data-oid="px0:wnu">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="m-s2_tu"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="0mnox5."
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="r45glr6">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="gy220ki"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="j8x7mo9"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid=":0fx-qn"
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
                    data-oid="s6scszx"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="ftordci"
                    >
                        what shall we use this for or not?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="4ga.32s">
                        <div className="text-center" data-oid="uz-qpto">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="mdpgyw9"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="o_gvfz3">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="zgb2af7">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="fxmbey0"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="uzlxnlk">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="9e4nzrt">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="uqmr.va"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="gqfyqzq">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="y0yzuni">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="b9-uuo2"
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="a-80_67">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
