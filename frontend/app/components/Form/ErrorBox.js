import React from "react";

function RenderError(error, className = "") {
  if(typeof error == "string") {
    return (
      <p key={error} className={`${className} error-box`}>
        {error}
      </p>
    )
  } else {
    return (
      error.map( errorString =>
        <p key={errorString} className={`${className} error-box`} >
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
