A react application for the frontend user interface of the Dishare project. The application will allow users to view and share dishes, as well as interact with other users through comments and ratings. The frontend will be built using React and will communicate with a backend API to fetch and update data. The application will also include features such as user authentication, search functionality, and responsive design for mobile devices.

The project has a react routing with the following routes:
1 home page: "/" in the App.jsx file
2 recipe page: "/recipe/:id" in the ViewRecipe.jsx file with components Navbar.jsx, RecipeImage.jsx, IngredientsList.jsx, Steps.jsx and Footer.jsx. The appearance is similar to the viewRecipe.html file in the backend.
 The IngredientsList.jsx file contains component Ingredient.jsx which is used to display each ingredient in the list.
3 user profile page: "/profile/:id" in the UserProfile.jsx file with components Navbar.jsx, UserImage.jsx, RecipeList.jsx and Footer.jsx The appearance is similar to the userProfile.html file in the backend. The RecipeList.jsx file contains component RecipeCard.jsx which is used to display each recipe in the list.
4 search results page: "/search" in the SearchResults.jsx file with components Navbar.jsx, SearchBar.jsx, RecipeList.jsx and Footer.jsx.
5 login page: "/login" in the Login.jsx file with components Navbar.jsx and Footer.jsx.
6 signup page: "/signup" in the Signup.jsx file with components Navbar.jsx and Footer.jsx.
7 create recipe page: "/create" in the CreateRecipe.jsx file with components Navbar.jsx and Footer.jsx.
8 edit recipe page: "/edit/:id" in the EditRecipe.jsx file with components Navbar.jsx and Footer.jsx.
9 search results page: "/search" in the SearchResults.jsx file with components Navbar.jsx, SearchBar.jsx, RecipeList.jsx and Footer.jsx.
10 user profile management page: "/profile/edit" in the ProfileEdit.jsx file with components Navbar.jsx and Footer.jsx. Where users can add or edit their profile information, including their profile picture, bio, contact information and password change functionality.