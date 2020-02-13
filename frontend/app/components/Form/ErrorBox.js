import React from "react";
// import useStyles from 'useStyles';
// import Typography from '@material-ui/core/Typography';


function RenderError(error) {
  if(typeof error == "string") {
    return (
      <p key={error} className="error-box">
        {error}
      </p>
    )
  } else {
    return (
      error.map( errorString =>
        <p key={errorString} className="error-box" >
          {errorString}
        </p>
      )
    )
  }
}

function ErrorBox(props) {
  if(props.error && typeof props.error == 'string') {
    return [
      RenderError(props.error)
    ]
  }
  return props.error && Object.keys(props.error).map(key => <RenderError key={props.error[key]} error={props.error[key]} /> )
}

export default ErrorBox;
