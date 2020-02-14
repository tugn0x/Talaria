import React from "react";

function RenderError(error, className = "") {
  if(typeof error == "string") {
    return (
      <div key={error} className={`${className} error-box`}>
        {error}
      </div>
    )
  } else {
    return (
      error.map( errorString =>
        <div key={errorString} className={`${className} error-box`} >
          {errorString}
        </div>
      )
    )
  }
}

function ErrorBox(props) {
  if(props.error && typeof props.error == 'string') {
    return [
      RenderError(props.error, props.className)
    ]
  }
  return props.error && Object.keys(props.error).map(key => <RenderError key={props.error[key]} className={props.className} error={props.error[key]} /> )
}

export default ErrorBox;
