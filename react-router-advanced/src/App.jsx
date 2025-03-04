import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import BlogPost from "./pages/BlogPost";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />}>
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>
            </Route>

            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
