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

/*
<Route path={"/library"} component={Library}/>
<Route path={"/institute"} component={Institute}/>
<Route path={"/p"} component={Patron}/>
*/

export default function HomePage(props) {
  return (
    <div className="app sidebar-minimized sidebar-show">
      <HeaderBar auth={props.auth}/>

      <Switch>

        <div className="app-body">

            {/*<Route component={NotFoundPage} />*/}
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
      </Switch>

      <Footer/>
    </div>
  );
}
