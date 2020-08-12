import React from 'react';


function ErrorMsg(props) {
  const {message}=props;

  return (
    <div className="alert alert-danger" role="alert">
    {message}
    </div>
  );
}

export default ErrorMsg;

