import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterFrom from "./components/auth/RegisterFrom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import SingleJob from "./pages/SingleJob";
import ProfilePage from "./pages/ProfilePage";
import PostJobPage from "./pages/PostJobPage";
import ActivityPage from "./pages/ActivityPage";

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterFrom />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/jobs/:jobid"
                element={
                  <ProtectedRoute>
                    <SingleJob />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create-job"
                element={
                  <ProtectedRoute requiredRole="poster">
                    <PostJobPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/activity"
                element={
                  <ProtectedRoute>
                    <ActivityPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
