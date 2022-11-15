import HeaderBar from './HeaderBar';
// import SubHeaderBar from './SubHeaderBar';
import Footer from './Footer';
import SideBar from './SideBar';
import Pagination from './Pagination'

import SimpleList from './SimpleList'
import CustomModal from './Modal'
import ButtonPlus from './Button/ButtonPlus'
import ButtonBack from './Button/ButtonBack'
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
// import MyLibrariesList from './Patron/MyLibrariesList/Loadable';
import ReferenceForm from './Patron/ReferenceForm';
import ReferencesList from './Patron/ReferencesList';
import ReferenceItem from './Patron/ReferenceItem';

import Toaster from "./Toaster/Loadable"


// Library
// import UsersList from './Library/UsersList';
import MyLibraryForm from './Library/MyLibraryForm';


// Admin
// import LibrariesList from './Admin/LibrariesList'
import LibraryForm from './Admin/LibraryForm'
// import InstitutionsList from './Admin/InstitutionsList'
import InstitutionForm from './Admin/InstitutionForm'
import InstitutionTypeForm from './Admin/InstitutionTypeForm'
import ProjectsList from './Admin/ProjectsList'
import ProjectForm from './Admin/ProjectForm'
import LibrariesList from './Admin/LibrariesList'
import InstitutionsList from './Admin/InstitutionsList'
import InstitutionTypesList from './Admin/InstitutionTypesList'

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
 // MyLibrariesList,
  MyLibraryForm,
  ReferenceForm,
  ReferencesList,
  ReferenceItem,
  LibraryForm,
  ProjectsList,
  ProjectForm,
  InstitutionForm,
  InstitutionTypeForm,
  LibrariesList,
  InstitutionsList,
  InstitutionTypesList,
//  UsersList,
  CustomForm,
  ButtonPlus,
  ButtonBack,
  CustomModal,
  InputSearch,
  ErrorBox,
  Loader,
  SideBar,
  SimpleList,
}
