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

// Dummy data used to visually fill pages
const sampleRecipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    imageUrl:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
  },
  {
    id: 2,
    title: "Classic Margherita Pizza",
    imageUrl:
      "https://images.pexels.com/photos/1580466/pexels-photo-1580466.jpeg",
  },
  {
    id: 3,
    title: "Berry Breakfast Bowl",
    imageUrl:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  },
];

const sampleUser = {
  name: "Alex Johnson",
  bio: "Home cook, pasta lover, and weekend baker. Sharing my favorite comfort food recipes.",
  imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  recipes: sampleRecipes,
};

const sampleRecipeDetail = {
  title: "Creamy Garlic Chicken Pasta",
  imageUrl:
    "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
  viewCount: 1284,
  cookingTime: "35 minutes",
  difficulty: "Medium",
  ingredients: [
    "250g spaghetti or fettuccine",
    "2 chicken breasts, sliced",
    "3 cloves garlic, minced",
    "1 cup heavy cream",
    "1/2 cup grated Parmesan cheese",
    "2 tbsp olive oil",
    "Salt and freshly ground black pepper to taste",
    "Fresh parsley for garnish",
  ],
  steps: [
    "Cook the pasta in salted boiling water according to package instructions until al dente. Reserve 1/2 cup of the pasta water, then drain.",
    "While the pasta cooks, heat olive oil in a large pan over medium heat. Season the sliced chicken with salt and pepper and cook until golden and cooked through.",
    "Add the minced garlic to the pan and sauté for 1–2 minutes until fragrant, being careful not to burn it.",
    "Pour in the heavy cream and bring to a gentle simmer. Stir in the Parmesan cheese until the sauce is smooth and slightly thickened.",
    "Add the cooked pasta to the pan, tossing to coat in the sauce. Use a splash of reserved pasta water if the sauce is too thick.",
    "Taste and adjust seasoning with more salt and pepper if needed. Garnish with chopped fresh parsley before serving.",
  ],
};

const router = createBrowserRouter([
  { path: "", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile/:id", element: <UserProfile user={sampleUser} /> },
  { path: "/create", element: <CreateRecipe /> },
  { path: "/edit/:id", element: <EditRecipe /> },
  { path: "/profile/edit/:id", element: <ProfileEdit /> },
  { path: "/search", element: <SearchResults recipes={sampleRecipes} /> },
  { path: "/recipe/:id", element: <ViewRecipe recipe={sampleRecipeDetail} /> },
]);

export default router;