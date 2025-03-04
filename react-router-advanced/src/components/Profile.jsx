import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Profile</h1>
      {isAuthenticated && (
        <button
          onClick={logout}
          className="bg-red-500 text-white p-2 rounded mb-4"
        >
          Logout
        </button>
      )}
      <nav className="mb-4">
        <Link to="details" className="mr-4 text-blue-600 hover:underline">
          Profile Details
        </Link>
        <Link to="settings" className="text-blue-600 hover:underline">
          Profile Settings
        </Link>
      </nav>
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;
