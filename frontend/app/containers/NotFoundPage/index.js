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
import {Container} from 'reactstrap'

export default function NotFound(props) {
  console.log("NotFound", props)
  
  return (
    <BasePage {...props}>
      <Container>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <ButtonBack />
      </Container>
    </BasePage> 
  );
}
