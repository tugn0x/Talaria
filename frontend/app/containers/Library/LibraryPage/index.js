/*
 * LibraryPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import {BasePage} from "components";
import libraryRoutes from "routes/libraryRoutes";


function LibraryPage(props) {
  /*
   TODO: DA QUESTA PAGINA, QUALUNQUE SIA LA SOTTO ROTTA, TU CI PASSI, QUI RIEMPI IL REDUCER library.library con l'action get library
   */
  console.log('LibraryPage', props)
  return (
    <>
      <BasePage {...props} routes={libraryRoutes} messages={messages} headermenu={true}/>
    </>
  );
}
const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default compose(withConnect)(LibraryPage);
