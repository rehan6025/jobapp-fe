import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../../store/slices/authSlice";
import {
    Briefcase,
    Eye,
    EyeOff,
    Lock,
    LogIn,
    Mail,
    Search,
    User,
    UserSearch,
} from "lucide-react";

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "seeker" | "poster";
};

const RegisterFrom = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "seeker",
    });
    const [showPass, setShowPass] = useState(false);
    const { isLoading, error, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/jobs");
        }
    }, [user, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password) {
            return;
        }
        dispatch(
            register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            })
        );
    };

    useEffect(() => {
        dispatch(clearError());
    }, [formData, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
            <div className="relative max-w-md w-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="text-center ">
                        <h2 className="font-bold text-3xl mt-6 text-gray-900">
                            Create your account
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-blue-600 font-medium hover:text-blue-500"
                            >
                                Sign in
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
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700 mb-3"
                            >
                                I am a
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <label
                                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                        formData.role === "seeker"
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    <Search className="h-5 w-5 mr-2" />
                                    Seeker
                                    <input
                                        type="radio"
                                        name="post"
                                        value={"seeker"}
                                        checked={formData.role === "seeker"}
                                        onChange={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                role: "seeker",
                                            }))
                                        }
                                        className="sr-only"
                                    />
                                </label>

                                <label
                                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                        formData.role === "poster"
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    <Briefcase className="w-5 h-5 mr-2" />
                                    Employer
                                    <input
                                        type="radio"
                                        name="post"
                                        value={"poster"}
                                        checked={formData.role === "poster"}
                                        onChange={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                role: "poster",
                                            }))
                                        }
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <div className="mt-1 relative">
                                <div
                                    className="absolute inset-y-2  pl-3
                                 flex items-center "
                                >
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    required
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }))
                                    }
                                    className=" rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

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
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
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
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
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
                        <div>
                            <label
                                htmlFor="confirmPass"
                                className="text-sm font-medium text-gray-700 block"
                            >
                                Confirm password
                            </label>
                            <div className="mt-1 relative">
                                <div className="flex items-center absolute pl-3 inset-y-2">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    id="confirmPass"
                                    name="confirmPass"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                    placeholder="Confirm your password"
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
                                    Sign up
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterFrom;
