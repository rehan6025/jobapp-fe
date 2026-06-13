import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Briefcase, Users, Search, Zap } from "lucide-react";

const HomePage: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const features = [
        {
            icon: <Search className="h-8 w-8 text-blue-600" />,
            title: "Find Your Dream Job",
            description:
                "Browse thousands of job opportunities from top companies worldwide.",
        },
        {
            icon: <Briefcase className="h-8 w-8 text-emerald-600" />,
            title: "Post Jobs Easily",
            description:
                "Reach qualified candidates with our simple job posting platform.",
        },
        {
            icon: <Users className="h-8 w-8 text-purple-600" />,
            title: "Connect Talent",
            description:
                "Bridge the gap between talented professionals and great opportunities.",
        },
        {
            icon: <Zap className="h-8 w-8 text-amber-600" />,
            title: "Fast & Efficient",
            description:
                "Streamlined application process that saves time for everyone.",
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Find Your Perfect{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600">
                                Career Match
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Connect talented professionals with exceptional
                            opportunities. Whether you're seeking your next
                            career move or looking to hire top talent, we've got
                            you covered.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {user ? (
                                <Link
                                    to="/jobs"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 "
                                >
                                    <Search className="h-5 w-5" />
                                    <span>Browse Jobs</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-102 transition-all duration-200"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 hover:scale-102 transition-all duration-200"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose JobBoard?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We make it easy to connect the right people with the
                            right opportunities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of professionals who have found their
                        perfect career match
                    </p>
                    {!user && (
                        <Link
                            to="/register"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
                        >
                            <Users className="h-5 w-5" />
                            <span>Join Today</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
