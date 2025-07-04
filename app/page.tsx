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
            data-oid="1vw9u.1"
        >
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-purple-100" data-oid="a:9ucav">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-oid="g5-8pv2">
                    <div className="flex items-center justify-between" data-oid="f1fuhza">
                        <div className="flex items-center space-x-3" data-oid="z9c7b3l">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center"
                                data-oid="bxy:30i"
                            >
                                <span className="text-white font-bold text-lg" data-oid="vkdkdqn">
                                    📚
                                </span>
                            </div>
                            <div data-oid="7hhxj_x">
                                <h1 className="text-2xl font-bold text-gray-900" data-oid="6zu7mt-">
                                    Resistor Sisters Bookgroup
                                </h1>
                                <p className="text-sm text-gray-600" data-oid="entttee">
                                    Say here kitty kitty, and you will find your next favorite book!
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/all-books"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            data-oid="o2:_frf"
                        >
                            Manage Books
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="qz6jpmr">
                {/* Welcome Section */}
                <div className="text-center mb-12" data-oid="gzcz1w5">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-oid=":4rkjb9">
                        Welcome to All the Books in One Place!
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-oid="d::4a6:">
                        Organize organize  organize
                    </p>
                </div>

                {/* Category Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-oid="uout:o0"
                >
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group block"
                            data-oid="7-dwzuf"
                        >
                            <div
                                className={`bg-white rounded-xl p-8 shadow-sm border ${category.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                                data-oid="omwn8eu"
                            >
                                <div className="text-center" data-oid="2sdn-hi">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        data-oid="8gavf-q"
                                    >
                                        <span className="text-2xl" data-oid="qs_2bra">
                                            {category.icon}
                                        </span>
                                    </div>
                                    <h3
                                        className={`text-xl font-bold ${category.textColor} mb-2`}
                                        data-oid="ofh:jsf"
                                    >
                                        {category.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="a_:d7t2"
                                    >
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-6 text-center" data-oid="7s-aj0f">
                                    <span
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${category.color} text-white group-hover:shadow-md transition-shadow duration-200`}
                                        data-oid="5wbnkd:"
                                    >
                                        Explore
                                        <svg
                                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="1x7:523"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                                data-oid="l:2dfo8"
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
                    data-oid="f-7_ywo"
                >
                    <h3
                        className="text-2xl font-bold text-gray-900 text-center mb-8"
                        data-oid="s.mkf_h"
                    >
                        what shall we use this for or not?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-oid="56s43sy">
                        <div className="text-center" data-oid="hg3el3a">
                            <div
                                className="text-3xl font-bold text-purple-600 mb-2"
                                data-oid="sk.k189"
                            >
                                4
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="zdlseut">
                                Categories
                            </div>
                        </div>
                        <div className="text-center" data-oid="cfn237a">
                            <div
                                className="text-3xl font-bold text-green-600 mb-2"
                                data-oid="d7cc4yu"
                            >
                                ∞
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="64fvlvh">
                                Possibilities
                            </div>
                        </div>
                        <div className="text-center" data-oid="itdhk5l">
                            <div
                                className="text-3xl font-bold text-blue-600 mb-2"
                                data-oid="cj_5_:4"
                            >
                                📖
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="roxim5g">
                                Reading
                            </div>
                        </div>
                        <div className="text-center" data-oid="e3q10uu">
                            <div
                                className="text-3xl font-bold text-yellow-600 mb-2"
                                data-oid="lfwzlf."
                            >
                                🎯
                            </div>
                            <div className="text-gray-600 text-sm" data-oid="a0o9auw">
                                Goals
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
