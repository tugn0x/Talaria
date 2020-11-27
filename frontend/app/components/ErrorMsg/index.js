import React from 'react';


function ErrorMsg(props) {
  const {message,cssclass}=props;

  let bootstrapCl="alert"
  if(cssclass)
    bootstrapCl+=" "+cssclass


  return (
    <div className={bootstrapCl} role="alert">
    {message}
    </div>
  );
}

export default ErrorMsg;

