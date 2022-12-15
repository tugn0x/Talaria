/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import {ButtonBack, BasePage} from 'components'
import messages from './messages';

export default function NotFoundPage(props) {
  console.log("NotFoundPage", props)
  
  return (
    <BasePage {...props}>
      <div className="d-flex justify-content-center">               
            <div className="p-2 text-center">
              <i className="fas fa-frown fa-4x"></i>
              <h1>
                <FormattedMessage {...messages.header} />
              </h1>
              <p><FormattedMessage {...messages.intro} /></p>
              <ButtonBack />
            </div>              
      </div>
    </BasePage> 
  );
}
