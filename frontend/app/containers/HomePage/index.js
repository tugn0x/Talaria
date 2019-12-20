/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { HeaderBar, Footer } from '../../components'
import { Switch, Route } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="app sidebar-minimized sidebar-show">
      <HeaderBar/>
      <div className="app-body">
        <Switch>
          {/*<Route component={NotFoundPage} />*/}
        </Switch>
        <div className="sidebar">
          Menu contestuale
        </div>
        <main className="main">
          <h1>
            <FormattedMessage {...messages.header} /> HOOOOME PAGE
          </h1>
          Main content here
        </main>
      </div>
      <Footer/>
    </div>
  );
}
