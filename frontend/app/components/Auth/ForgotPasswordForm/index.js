/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"

import {ErrorBox, Loader} from "../..";

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



function ForgotPasswordForm(props){
  const [formData,setFormData] = React.useState({
    username: "",
    recaptcha: ""
  });

  const setRecaptcha = (token) => {
    setFormData({ ...formData, recaptcha: token })
  }

  const updateFormData = (e) =>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })

  }
  const submitForm = (e) =>{
    props.googleReCaptchaProps.executeRecaptcha('forgot').then(token => {
      props.requestToken({ ...formData, recaptcha: token })
    }).catch(error => {
      console.error("error", error);
    });
    e.preventDefault();
  }

  return(
    <div>
      <Loader show={props.auth.loading} >
        PASSWORD DIMENTICATA
        {/*
      <Typography variant="caption" align="center">
        Per resettare la password è necessario richiedere un token di verifica via SMS. Inserisci il tuo numero di telefono e procedi con la richiesta
      </Typography>
      <form noValidate>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="username"
          value={formData.username}
          onChange={(e) => updateFormData(e, 'username')}
          label="Numero di telefono"
          InputProps={{
            startAdornment: <InputAdornment position="start" style={{width: "40px"}}>+39</InputAdornment>,
          }}
          id="username"
        />
        {props.auth.error && (
            <ErrorBox error={props.auth.error} />
          )}
        <Box my={2}>
        <Button
          type="submit"
          fullWidth
          onClick={(e) => submitForm(e)}
          disabled={props.auth.loading || formData.username.length < 3}
          variant="contained"
          color="secondary"
        >
          Richiedi token
        </Button>
        </Box>
        <Grid container>
          <Grid item xs>
            <Link to="/" color="inherit" component={RouterLink}>
              Accedi
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register" color="inherit" component={RouterLink}>
              Registra un nuovo account
            </Link>
          </Grid>
        </Grid>
      </form>
      */}
      </Loader>
    </div>
  );
}

ForgotPasswordForm.propTypes = {};

export default withGoogleReCaptcha((ForgotPasswordForm));
