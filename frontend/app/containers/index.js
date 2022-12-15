import App from "./App"


import HomePage from "./HomePage/Loadable"
import LanguageProvider from "./LanguageProvider"

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
import RegisterLibraryPage from './RegisterLibrary'
import NotAuthorizedPage from './NotAuthorizedPage/Loadable';
import NotFoundPage from './NotFoundPage/Loadable';

/*
LIBRARY STUFFS
 */
import LibraryPage from "./Admin/LibraryPage/Loadable"
// import LibrarySettings from "./Library/LibrarySettings/Loadable"


export {
  App,
  HomePage,
  LanguageProvider,
  NotFoundPage,
  NotAuthorizedPage,
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
  LibraryPage,
  RegisterLibraryPage,
}

