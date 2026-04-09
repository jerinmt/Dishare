import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import App from "../App";
import UserProfile from "../components/UserProfile";
import CreateRecipe from "../components/CreateRecipe";
import EditRecipe from "../components/EditRecipe";
import ProfileEdit from "../components/ProfileEdit";
import SearchResults from "../components/SearchResults";
import ViewRecipe from "../components/ViewRecipe";
import About from "../components/About";
import Contact from "../components/Contact";
import Terms from "../components/Terms";

const router = createBrowserRouter([
  { path: "", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile/:id", element: <UserProfile /> },
  { path: "/create", element: <CreateRecipe /> },
  { path: "/edit/:id", element: <EditRecipe /> },
  { path: "/profile/edit/:id", element: <ProfileEdit /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/recipe/:id", element: <ViewRecipe /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/terms-of-service", element: <Terms /> },
]);

export default router;