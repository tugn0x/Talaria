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
}

