import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, login } from "../../store/slices/authSlice";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const { isLoading, user, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/jobs");
        }
    }, [user, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        dispatch(clearError());
    }, [email, password, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
            <div className="relative max-w-md w-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or{" "}
                            <Link
                                to="/register"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                create a new account
                            </Link>
                        </p>
                    </div>
                    <form className="space-y-6  p-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div
                                    className="absolute inset-y-2  pl-3
                                 flex items-center "
                                >
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className=" rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700 block"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="flex items-center absolute pl-3 inset-y-2">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="relative pl-10 pr-3 block w-full placeholder-gray-500 text-gray-900 border border-gray-300 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-0 inset-y-0
                                     pr-3 flex items-center"
                                >
                                    {showPass ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700  relative py-2 rounded-lg px-4 text-white font-medium disabled:opacity-50 transition-all duration-200"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-b-2 border-white  rounded-full  animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn className="w-6 h-6 mr-2" />
                                    Sign in
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
