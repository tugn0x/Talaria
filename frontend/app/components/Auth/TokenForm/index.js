/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
    page: {
      width:"100%",
    },
    formGroup:{
      width:"100%",
    },
  }
};



function TokenForm(props){
  const [formData,setFormData] = React.useState({
    username: "",
    reset_code: "",
    new_password: "",
    confirm_password: "",
  });

  const updateFormData = (e) =>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })

  }
  const submitForm = (e) =>{
    props.googleReCaptchaProps.executeRecaptcha('forgot').then(token => {
      props.resetPassword({ ...formData, recaptcha: token })
    }).catch(error => {
      console.error("error", error);
    });
    e.preventDefault();
}

  return(
    <div>
      <Loader show={props.auth.loading} >
      <form noValidate>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="username"
          value={formData.password}
          onChange={(e) => updateFormData(e, 'username')}
          label="Numero di telefono"
          type="text"
          id="username"
          autoComplete="phone"
          InputProps={{
            startAdornment: <InputAdornment position="start" style={{width: "40px"}}>+39</InputAdornment>,
          }}
        />
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="reset_code"
          value={formData.reset_code}
          onChange={(e) => updateFormData(e, 'reset_code')}
          label="Token SMS"
          type="text"
          id="reset_code"
          autoComplete="reset_code"
        />
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="new_password"
          value={formData.new_password}
          onChange={(e) => updateFormData(e, 'new_password')}
          label="Nuova password"
          type="password"
          id="new_password"

        />
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="confirm_password"
          value={formData.confirm_password}
          onChange={(e) => updateFormData(e, 'confirm_password')}
          label="Conferma la password"
          type="password"
          id="confirm_password"

        />
        {props.auth.error && (
            <ErrorBox error={props.auth.error} />
          )}
        <Box my={2}>
        <Button
          type="submit"
          fullWidth
          onClick={(e) => submitForm(e)}
          disabled={props.auth.loading}
          variant="contained"
          color="secondary"
        >
          Reimposta la password
        </Button>
        </Box>
      </form>
      </Loader>
    </div>
  );
}

TokenForm.propTypes = {};

export default withGoogleReCaptcha((TokenForm));
