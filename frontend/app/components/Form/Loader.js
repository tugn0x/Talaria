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
    <div className="app flex-row align-items-center">
      <Container>
        <Spinner color="brown"></Spinner>
      </Container>
    </div>
   )}
   {!props.show && props.children}
  </>
  );
}
