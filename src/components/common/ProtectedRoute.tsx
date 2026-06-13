import type React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { getProfile } from "../../store/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "poster" | "seeker";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const dispatch = useAppDispatch();
  const { user, token, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user && !isLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, token, user, isLoading]);

  if (token && isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!token || (!user && !isLoading)) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/jobs" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
