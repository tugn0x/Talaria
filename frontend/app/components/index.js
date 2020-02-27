import HeaderBar from './HeaderBar';
// import SubHeaderBar from './SubHeaderBar';
import Footer from './Footer';
import SideBar from './SideBar';

/*
USER AUTHENTICATION
 */
import SignupForm from './Auth/SignupForm';
import LoginForm from './Auth/LoginForm';
import SocialAuth from './Auth/SocialAuth';
import ForgotPasswordForm from './Auth/ForgotPasswordForm';
import ResetPasswordForm from './Auth/ResetPasswordForm';
import ChangePasswordForm from './Auth/ChangePasswordForm';

// Patron
import MyLibrariesList from './Patron/MyLibrariesList';
import ReferencesForm from './Patron/ReferencesForm';

import Toaster from "./Toaster/Loadable"
/*
FORM STUFFS
 */
import ErrorBox from './Form/ErrorBox'
import Loader from './Form/Loader'
import CustomForm from './Form/CustomForm'
import BasePage from './BasePage'

export {
  HeaderBar,
  Footer,
  BasePage,
  Toaster,
  SignupForm,
  LoginForm,
  SocialAuth,
  ForgotPasswordForm,
  ResetPasswordForm,
  ChangePasswordForm,
  MyLibrariesList,
  ReferencesForm,
  CustomForm,
  ErrorBox,
  Loader,
  SideBar,
}
