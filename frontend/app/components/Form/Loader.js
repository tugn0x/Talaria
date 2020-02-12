import React from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Box from '@material-ui/core/Box';
// import useStyles from 'useStyles';


export default function Loader(props) {
  // const classes = useStyles();

  return (
  <>
   {props.show && (
     <p>Loading..</p>
   )}
   {!props.show && props.children}
  </>
  );
}
