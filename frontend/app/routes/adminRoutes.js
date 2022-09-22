import UsersListPage from 'containers/Admin/UsersListPage/Loadable';
import UserPage from 'containers/Admin/UserPage/Loadable';
import LibraryPage from 'containers/Admin/LibraryPage/Loadable';
import LibrariesListPage from 'containers/Admin/LibrariesListPage/Loadable';
import InstitutionsListPage from 'containers/Admin/InstitutionsListPage/Loadable';
import InstitutionTypeListPage from 'containers/Admin/InstitutionTypeListPage/Loadable';
import ProjectPage from 'containers/Admin/ProjectPage/Loadable';
import ProjectsListPage from 'containers/Admin/ProjectsListPage/Loadable';

import InstitutionPage from 'containers/Admin/InstitutionPage/Loadable';
import SubRouteSwitch from 'components/SubRouteSwitch';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/users',  name: `UsersList`, component: SubRouteSwitch, header: true, roles: ['super-admin'],
    children: [
      { path: '/', exact: true, icon: 'fas fa-users',name: `UsersList`, url: `/users/user`, component: UsersListPage, sidebar:true},
      { path: '/user/new', icon: 'plus',name: `UserNew`, component: UserPage,  url: `/users/user/new`, sidebar: true},
      { path: '/user/:id?', name: `UserUpdate`, component: UserPage, },
      { path: '/:page?', exact: true, name: `UsersList`, url: `/users/user`, component: UsersListPage, },
    ]
  },

  

  { path: '/libraries',  name: `Libraries`, component: SubRouteSwitch, header: true, roles: ['super-admin','manager'],sidebar: true,
    children: [      
      { path: '/', exact: true, icon: 'fas fa-landmark', name: `Libraries`, url: `/libraries`, component: LibrariesListPage,sidebar:true,order:1},
      { path: '/library/new', icon: 'plus', name: `LibraryCreateNew`, component: LibraryPage,  url: `/libraries/library/new`, sidebar: true,order:2},
      { path: '/library/:id?', name: `Libraries`, component: LibraryPage, },
      { path: '/:page?', exact: true, name: `Libraries`, url: `/libraries`, component: LibrariesListPage},
    ]
  },
  { path: '/institutions',  name: `Institutions`, component: SubRouteSwitch, header: true, roles: ['super-admin','manager'],
    children: [
      { path: '/', exact: true, icon: 'fas fa-building', name: `Institutions`, url: `/institutions`, component: InstitutionsListPage, sidebar:true},
      { path: '/institutions-types/type/new', icon: 'plus', name: `InstitutionTypeNew`, component: LibraryPage,  url: `/libraries/library/new`},
      { path: '/institutions-types/type/:id?', name: `InstitutionType`, component: LibraryPage, },
      { path: '/institutions-types/:page?', exact: true, name: `InstitutionTypes`, url: `/institutions/institutions-types`, component: InstitutionTypeListPage,  sidebar: true},
      { path: '/:page?', exact: true, name: `Institutions`, url: `/institutions`, component: InstitutionsListPage, },
      { path: '/institution/new', icon: 'plus', name: `InstitutionNew`, component: InstitutionPage,  url: `/institutions/institution/new`, sidebar: true},
      { path: '/institution/:id?', name: `Institutions`, component: InstitutionPage, },
    ]
  },
  { path: '/projects',  name: `Projects`, component: SubRouteSwitch, header: true, roles: ['super-admin','manager'],
    children: [
      { path: '/', exact: true, icon: 'fas fa-project-diagram',name: `Projects`, url: `/projects`, component: ProjectsListPage,sidebar:true},
      { path: '/project/new', icon: 'plus', name: `ProjectNew`, component: ProjectPage,  url: `/projects/project/new`, sidebar: true},
      { path: '/project/:id?', name: `Projects`, component: ProjectPage, },
      { path: '/:page?', exact: true, name: `Projects`, url: `/projects`, component: ProjectsListPage},
    ]
  },
];

export default routes;
