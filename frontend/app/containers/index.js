import App from "./App"


import HomePage from "./HomePage/Loadable"
import LanguageProvider from "./LanguageProvider"
import NotFoundPage from "./NotFoundPage/Loadable"


/*
USER AUTHENTICATION
 */
import AuthProvider from "./Auth/AuthProvider/Loadable"
import ForgotPassword from "./Auth/ForgotPassword/Loadable"
import IdpPage from "./Auth/IdpPage/Loadable"
import LoginPage from "./Auth/LoginPage/Loadable"
import SignupPage from "./Auth/SignupPage/Loadable"
// import ChangePassword from "./User/ChangePassword/Loadable"
// import ProfilePage from "./User/ProfilePage/Loadable"
import UserPage from "./User/UserPage/Loadable"
import PatronPage from "./Patron/PatronPage/Loadable"
import AdminPage from "./Admin/AdminPage/Loadable"

/*
LIBRARY STUFFS
 */
import LibrarySettings from "./Library/LibrarySettings/Loadable"


export {
  App,
  HomePage,
  LanguageProvider,
  NotFoundPage,

  AuthProvider,
  ForgotPassword,
  IdpPage,
  LoginPage,
  SignupPage,
  // ProfilePage,
  // ChangePassword,
  UserPage,
  AdminPage,
  PatronPage,
  LibrarySettings,
}

