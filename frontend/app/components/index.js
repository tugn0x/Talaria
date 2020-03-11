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
import MyLibrariesList from './Patron/MyLibrariesList/Loadable';
import MyLibraryForm from './Patron/MyLibraryForm';
import ReferencesForm from './Patron/ReferencesForm';
import ReferencesList from './Patron/ReferencesList';

import Toaster from "./Toaster/Loadable"

// Admin
import LibrariesList from './Admin/LibrariesList'
import LibraryForm from './Admin/LibraryForm'

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
  MyLibraryForm,
  ReferencesForm,
  ReferencesList,
  LibraryForm,
  LibrariesList,
  CustomForm,
  ErrorBox,
  Loader,
  SideBar,
}
