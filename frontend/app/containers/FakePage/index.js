import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import messages from './messages';

import Fake from "../../components/Fake";

function FakePage(props) {
  console.log('FakePage', props)
  return (
    <>
      <h1>Fake Page</h1>
      <Fake/>
    </>
  );
}
export default withRouter(FakePage);

