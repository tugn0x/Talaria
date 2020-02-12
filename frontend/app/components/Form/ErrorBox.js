import React from "react";
// import useStyles from 'useStyles';
// import Typography from '@material-ui/core/Typography';

function renderError(classes, error) {
  if(typeof error == "string") {
    return (
      <p className={classes.errorBox}>
        {error}
      </p>
    )
  } else {
    return (
      error.map( errorString =>
        <p className={classes.errorBox}>
          {errorString}
        </p>
      )
    )
  }
}

function ErrorBox(props) {
  // const classes = useStyles();
  if(props.error && typeof props.error == 'string') {
    return [
      renderError(classes, props.error)
    ]
  }
  return props.error && Object.keys(props.error).map(key => renderError(classes, props.error[key]))
}

export default ErrorBox;
