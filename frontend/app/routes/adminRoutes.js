import UsersListPage from 'containers/Admin/UsersListPage/Loadable';
import UserPage from 'containers/Admin/UserPage/Loadable';
import LibraryPage from 'containers/Admin/LibraryPage/Loadable';
import LibrariesListPage from 'containers/Admin/LibrariesListPage/Loadable';
import InstitutionTypeListPage from 'containers/Admin/InstitutionTypeListPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/users',  name: `UsersList`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/user/new', name: `UserNew`, component: UserPage,  url: `/users/user/new`, sidebar: true},
      { path: '/user/:id?', name: `UserUpdate`, component: UserPage, },
      { path: '/:page?', exact: true, name: `UsersList`, url: `/users/user`, component: UsersListPage, },
    ]
  },
  { path: '/libraries',  name: `Libraries`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/library/new', icon: 'plus', name: `LibraryCreateNew`, component: LibraryPage,  url: `/libraries/library/new`, sidebar: true},
      { path: '/library/:id?', name: `Libraries`, component: LibraryPage, },
      { path: '/:page?', exact: true, name: `Libraries`, url: `/libraries`, component: LibrariesListPage, },
    ]
  },
  { path: '/institutions',  name: `Institutions`, component: SubRouteSwitch, header: true,
    children: [
      { path: '/institutions-types/type/new', icon: 'plus', name: `InstitutionTypeNew`, component: LibraryPage,  url: `/libraries/library/new`},
      { path: '/institutions-types/type/:id?', name: `InstitutionType`, component: LibraryPage, },
      { path: '/institutions-types/:page?', exact: true, name: `InstitutionTypes`, url: `/institutions/institutions-types`, component: InstitutionTypeListPage, sidebar: true},
    ]
  },
];

export default routes;
