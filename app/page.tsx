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
            data-oid=":bqlbhg"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="u8gu5:8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="77g84y:">
                    <div className="flex items-center justify-between" data-oid="un4n5cs">
                        <div className="flex items-center space-x-3" data-oid="6rpi1du">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="nx-d:1s"
                            >
                                <span className="text-white font-bold text-lg" data-oid="no_wa_g">
                                    📚
                                </span>
                            </div>
                            <div data-oid="sp84ht.">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="o2fru30">
                                    Resistor Sisters Bookgroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="q9w1vp1">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="h60ggu4"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="_9ezpsg">
                {/* Debug Section - Remove this after debugging */}
                <DebugJSONBin data-oid="ik27x1h" />

                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="g0i3_3k">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid="7ty3def">
                        Welcome to All the Books in One Place!
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="eayfbpz">
                        Organize organize  organize
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid=":nb-.de"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="nv9cu1."
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="gx9xz.0"
                            >
                                <div className="text-center" data-oid="1wve79h">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="t7vag7p"
                                    >
                                        <span className="text-2xl" data-oid="jxk_an7">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="8-_ctwe"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="jkhqn4m"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="kpfpjpv">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="qjgwfjz"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="f_9g0xh"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid="hit9pr8"
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
                    data-oid="18u_x_o"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="ikhguxr"
                    >
                        what shall we use this for or not?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="lfdtlsx">
                        <div className="text-center" data-oid="::-u:pm">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="htz4ecx"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="9dc2n_4">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="w9-fgqu">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="wvohbxm"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="2bmgdd8">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="0pelumi">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="whefbt0"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="wl27-bc">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="3moo9nn">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="1f6-uhm"
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="_evo.zq">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
