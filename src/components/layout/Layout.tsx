import { useEffect, type FC, type ReactNode } from "react";
import NavBar from "./NavBar";
import { Footer } from "./Footer";
import { useAppDispatch } from "../../hooks/redux";
import { getProfile } from "../../store/slices/authSlice";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            dispatch(getProfile());
        }
    }, [dispatch, token]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
            <NavBar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
