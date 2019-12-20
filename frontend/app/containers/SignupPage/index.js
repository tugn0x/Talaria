/**
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import { requestSignup } from '../AuthProvider/actions';
import { SignupForm } from "../../components";

export function SignupPage(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <SignupForm {...props} handleOpen={handleOpen} signup={(request, redirect) => props.dispatch(requestSignup(request, redirect))} />
    </div>
  );
}

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //signupPage: makeSelectSignupPage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SignupPage);

/**
 *
 * SignupPage
 *
 */
//
// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { compose } from 'redux';
//
// import messages from './messages';
//
// export function SignupPage() {
//   return (
//     <div>
//       <FormattedMessage {...messages.header} />
//     </div>
//   );
// }
//
// // SignupPage.propTypes = {
// //   dispatch: PropTypes.func.isRequired,
// // };
//
// // function mapDispatchToProps(dispatch) {
// //   return {
// //     dispatch,
// //   };
// // }
// //
// // const withConnect = connect(
// //   null,
// //   mapDispatchToProps,
// // );
//
// // export default compose(withConnect)(SignupPage);
// export default SignupPage
