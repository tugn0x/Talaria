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
      Qui il form con l'email e il pulsante, ti passi l'action dalla pagina col dispatch ecc..
      */}
      </Loader>
    </div>
  );
}

ForgotPasswordForm.propTypes = {};

export default withGoogleReCaptcha((ForgotPasswordForm));
