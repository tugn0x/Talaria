/**
 *
 * IdpPage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import { requestIdpSignup, requestLogin, socialLoginPrepare, socialLoginRequest, requestVerification, requestLogout, requestNewToken, requestRefresh } from '../AuthProvider/actions';

const styles = (theme) => {
  return {

  }
};

function IdpPage(props) {
  console.log('IdpPage')
  console.log('IdpPage')
  console.log('IdpPage')
  // console.log(props.match.params.refresh_token)
  useEffect(() => {
    props.idpSignup(props.match.params.refresh_token);
    console.log("use effect")
  });

    // this.props.prepareGoogle()

  return (
    <div>
      {props.match.params.refresh_token}
      {props.auth}
    </div>

  );
}

IdpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //IdpPage: makeSelectIdpPage()
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
const mapDispatchToProps = (dispatch) => ({
  dispatch,
    idpSignup: (refresh_token) => dispatch(requestIdpSignup(refresh_token)),
})


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(IdpPage);
