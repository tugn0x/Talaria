import UsersListPage from 'containers/Admin/UsersListPage/Loadable';
import UserPage from 'containers/Admin/UserPage/Loadable';
import Fake from 'components/Fake';
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
      //{ path: '/new', icon: 'plus', name: `LibraryCreateNew`, component: LibraryPage,  url: '/library/new', sidebar: true,order:2},
      //{ path: '/:id/subscriptions', exact: true, name: `Subscription`, component: Fake, sidebar: false},      
      { path: '/:id?/:op?',  name: `Libraries`,component: LibraryPage, sidebar: false},      
      { path: '/:page?', exact: true, name: `Libraries`, url: `/libraries`, component: LibrariesListPage,sidebar: false },
      //{ path: '/:id/subscriptions/:subscriptionid?/:op?', name: `SubscriptionUpdate`, component: Fake, sidebar: false},      
    ]
  },
  { path: '/institutions',  name: `Institutions`, component: SubRouteSwitch, header: true, roles: ['super-admin','manager'],
    children: [
      { path: '/institutions-types', exact: true, icon: 'fas fa-list-ul',  name: `InstitutionTypes`, url: `/institutions/institutions-types`, component: Fake,  sidebar: true,order:3},      
      { path: '/institutions-types/:id?/:op?', name: `InstitutionType`, component: Fake, sidebar: false  },
      { path: '/institutions-types/:page?',   name: `InstitutionTypes`, url: `/institutions/institutions-types`, component: Fake,  sidebar: false},
      { path: '/institutions-types/new', icon: 'plus', name: `InstitutionTypeNew`, url: `/institutions/institutions-types/new`, component: Fake,  sidebar: true,order:4 },      

      { path: '/', exact: true, icon: 'fas fa-building', name: `Institutions`, url: `/institutions`, component: InstitutionsListPage, sidebar:true, order:1},
      { path: '/:id?/:op?', name: `Institutions`, component: InstitutionPage, sidebar: false },
      { path: '/:page?', exact: true, name: `Institutions`, url: `/institutions`, component: InstitutionsListPage, },            
      { path: '/new', icon: 'plus', name: `InstitutionNew`, component: InstitutionPage,  url: `/institutions/new`, sidebar: true,order:2},            
    ]
  },
   { path: '/consortiums',  name: `Consortiums`, component: SubRouteSwitch, header: true, roles: ['super-admin','manager'],
    children: [
      { path: '/', exact: true, icon: 'fas fa-building', name: `Consortiums`, url: `/consortiums`, component: Fake, sidebar:true},
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
  { path: '/subscriptions',  name: `Subscriptions`, component: SubRouteSwitch, header: true, roles: ['super-admin','manager'],sidebar: true,
    children: [      
      { path: '/settings', exact: true,icon: 'fas fa-cog',name: `SubscriptionsSettings`, url:'/subscriptions/settings', component: Fake, sidebar: true, order:1},                 
      { path: '/libraries', exact: true,icon: 'fas fa-file-contract',name: `LibrariesSubscriptionsList`, url:'/subscriptions/libraries', component: Fake, sidebar: true, order:2},                 
      { path: '/institutions', exact: true,icon: 'fas fa-file-contract',name: `InstitutionsSubscriptionsList` , url:'/subscriptions/institutions', component: Fake, sidebar: true, order:3},                 
    ]
  },
  { path: '/payments',  name: 'Payments', component: SubRouteSwitch, header: true, roles: ['accountant'],sidebar: true,
    children: [      
      { path: '/', exact: true, icon: 'fas fa-landmark', name: `Payments`, url: `/payments`, component: Fake,sidebar:true,order:1},      
    ]
  },
];

export default routes;
