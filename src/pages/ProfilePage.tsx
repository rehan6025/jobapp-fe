import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getProfile } from "../store/slices/authSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { User } from "lucide-react";

const ProfilePage = () => {
    const { user, isLoading, error, token } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            dispatch(getProfile());
        }
    }, [dispatch, token]);

    if (isLoading) {
        return <LoadingSpinner size="lg" />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-xl w-full bg-red-50 text-red-800 border border-red-200 rounded-lg p-6">
                    <p className="font-semibold">Failed to load profile</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-xl w-full bg-white/80 rounded-xl shadow p-8 text-center">
                    <p className="text-gray-700">
                        You're not logged in. Please log in to view your
                        profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="flex items-center gap-6 max-w-3xl mx-auto bg-white/80 rounded-xl shadow-lg p-8 mt-8">
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-100">
                    <User className="w-12 h-12 text-gray-600" />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {user.username}
                    </h1>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 border border-blue-200">
                            Role:{" "}
                            {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
