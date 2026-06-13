import { Briefcase, FileText, LogOut, Plus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/slices/authSlice";

const NavBar = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg ">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            JobBoard
                        </span>
                    </Link>

                    <div className="flex space-x-6 items-center">
                        {user ? (
                            <>
                                <Link
                                    to="/jobs"
                                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Browse Jobs
                                </Link>

                                {user.role === "poster" ? (
                                    <>
                                        <Link
                                            to="/create-job"
                                            className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Post Job</span>
                                        </Link>

                                        <Link
                                            to="/activity"
                                            className="sm:flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            <Briefcase className="w-4 h-4" />
                                            <span>My Jobs</span>
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        to="/activity"
                                        className="hidden md:flex  items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>Applications</span>
                                    </Link>
                                )}

                                <div className="hidden md:flex items-center space-x-4 ">
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>{user.username}</span>
                                    </Link>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
