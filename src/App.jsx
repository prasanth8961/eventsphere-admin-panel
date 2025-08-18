import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { logOut, setCredentials } from "./App/Features/Auth/authSlice";
import Config from "./App/service/config";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import SideMenuBar from "./components/SideMenuBar";
import AddCategory from "./pages/Category/AddCategory";
import CategoriesList from "./pages/Category/CategoriesList";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateEvent from "./pages/Events/CreateEvent";
import EventDetail from "./pages/Events/EventDetail";
import ListEvents from "./pages/Events/ListEvents";
import AddInternalTeam from "./pages/Internal Team/AddInternalTeam";
import InternalTeamList from "./pages/Internal Team/InternalTeamList";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import AddOrganizer from "./pages/Organizer/AddOrganizer";
import ListOrganizer from "./pages/Organizer/ListOrganizers";
import UserManagementPage from "./pages/Users/UserManagementPage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${Config.authBaseUrl}auth/validate-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.success;
      }
      return false;
    } catch (error) {
            return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        console.log(localToken)
        const isValid = await validateToken(localToken);
        if (isValid) {
          dispatch(setCredentials({ token: localToken }));
        } else {
          dispatch(logOut());
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="flex h-screen  items-center justify-center">
          <div className="h-16 w-16 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <NavBar />
          <SideMenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
          <div
            className={`select-none transition-all duration-300 ${showMenu ? "pl-52" : "pl-4"
              }`}
          >

            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/categories-list" element={<CategoriesList />} />
                <Route path="/get-all-user" element={<UserManagementPage />} />
                <Route path="/add-event" element={<CreateEvent />} />
                <Route path="/organizers" element={<ListOrganizer />} />
                <Route
                  path="/add-internal-team"
                  element={<AddInternalTeam />}
                />
                <Route
                  path="/list-internal-team"
                  element={<InternalTeamList />}
                />
                <Route path="/add-organizer" element={<AddOrganizer />} />
                <Route path="/events/active" element={<ListEvents />} />
                {/* <Route path="/events/pending" element={<ListPendingEvents />} />
                <Route
                  path="/events/rejected"
                  element={<ListRejectedEvents />}
                />
                <Route
                  path="/events/completed"
                  element={<ListCompletedEvents />}
                /> */}
                <Route path="/eventdetail" element={<EventDetail />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
