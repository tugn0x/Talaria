import React from 'react';
import {Spinner, Container} from 'reactstrap';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Box from '@material-ui/core/Box';
// import useStyles from 'useStyles';
import './style.scss'

export default function Loader(props) {
  // const classes = useStyles();

  return (
  <>
   {props.show && (
    <div className="app loader flex-row align-items-center">
      <Spinner color="brown"></Spinner>
    </div>
   )}
   {!props.show && props.children}
  </>
  );
}
