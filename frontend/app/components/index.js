import HeaderBar from './HeaderBar';
// import SubHeaderBar from './SubHeaderBar';
import Footer from './Footer';
import SideBar from './SideBar';
import Pagination from './Pagination'

import SimpleList from './SimpleList'
import CustomModal from './Modal'
import ButtonPlus from './Button/ButtonPlus'
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


// Library
import UsersList from './Library/UsersList';


// Admin
import LibrariesList from './Admin/LibrariesList'
import LibraryForm from './Admin/LibraryForm'
import InstitutionsList from './Admin/InstitutionsList'
import InstitutionForm from './Admin/InstitutionForm'
import ProjectsList from './Admin/ProjectsList'

/*
FORM STUFFS
 */
import ErrorBox from './Form/ErrorBox'
import Loader from './Form/Loader'
import CustomForm from './Form/CustomForm'
import BasePage from './BasePage'
import InputSearch from './Form/InputSearch'

export {
  HeaderBar,
  Footer,
  BasePage,
  Toaster,
  SignupForm,
  LoginForm,
  Pagination,
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
  InstitutionsList,
  ProjectsList,
  InstitutionForm,
  UsersList,
  CustomForm,
  ButtonPlus,
  CustomModal,
  InputSearch,
  ErrorBox,
  Loader,
  SideBar,
  SimpleList,
}
