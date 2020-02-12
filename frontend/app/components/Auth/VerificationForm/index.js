/**
 *
 * VerificationForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';

import ErrorBox from "../Form/ErrorBox";
import Loader from "../Form/Loader";

const styles = (theme) => {
  return {
    errorBox: {
      textAlign: "center",
      padding: theme.spacing(.5),
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
    },
  }
};

class VerificationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        mobile_number: "",
        verification_code: ""
      },
      defaultFormData: {
        verification_code: "",
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
    this.newtoken = this.newtoken.bind(this);
  }

  handleChange(event, name) {
    this.setState({ formData: { ...this.state.formData, [name]: event.target.value }});
  };

  submitChange(event) {
    event.preventDefault();
    this.props.verify(this.state.formData);
  };

  backToLogin(event) {
    event.preventDefault();
    this.props.logout(this.state.formData);
  };

  newtoken(event) {
    event.preventDefault();
    this.props.newtoken(this.state.formData);
  };

  resetForm() {
    this.setState({formData: this.state.defaultFormData});
  }


  render () {
    return (
      <div>
        <Loader show={this.props.auth.loading} >
        <Typography variant="caption">
          Dopo la registrazione del tuo account ti abbiamo inviato un SMS con un Codice di verifica. Inseriscilo nel form qui sotto per confermare la registrazione del tuo account.
        </Typography>
        <form noValidate>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="mobile_number"
            label="Numero di Telefono"
            name="mobile_number"
            value={this.state.formData.mobile_number}
            onChange={(e) => this.handleChange(e, 'mobile_number')}
            autoComplete="mobile_number"
            autoFocus
            InputProps={{
              startAdornment: <InputAdornment position="start" style={{width: "40px"}}>+39</InputAdornment>,
            }}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="verification_code"
            value={this.state.formData.verification_code}
            onChange={(e) => this.handleChange(e, 'verification_code')}
            label="Codice SMS"
            type="text"
            id="verification_code"
            autoComplete="current-verification_code"
          />
          {this.props.auth.error && (
            <ErrorBox error={this.props.auth.error} />
          )}
          <Box my={2}>
          <Button
            type="submit"
            fullWidth
            onClick={(e) => this.submitChange(e)}
            disabled={this.props.auth.loading}
            variant="contained"
            color="secondary"
          >
            Verifica il codice SMS
          </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Button onClick={this.newtoken} disabled={this.state.formData.mobile_number.length == 0}>
                Richiedi di nuovo il codice SMS
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.backToLogin}>
                Torna ad accedi
              </Button>
            </Grid>
          </Grid>
        </form>
        </Loader>
      </div>
    )}
}

VerificationForm.propTypes = {};

export default VerificationForm;
