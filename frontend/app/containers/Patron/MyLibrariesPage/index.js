/*
 * My Libraries Page
 *
 * 
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Row, Col, Card, CardBody,Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import {fields} from './fields';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import CustomForm from 'components/Form/CustomForm';
import {requestGetLibraryList, requestAccessToLibrary, requestMyLibraries} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import MyLibrariesList from 'components/Patron/MyLibrariesList';


function MyLibrariesPage(props) {
  const intl = useIntl();
  const {isLoading, dispatch, patron} = props
  
  useEffect(() => {
    if(!isLoading) {
      dispatch(requestGetLibraryList())
      dispatch(requestMyLibraries())
    }
   }, [])

   
  // const my_libraries = patron.my_libraries
  
  return (
    <div className="my-libraries">
      <MyLibrariesList my_libraries={patron.my_libraries} />
      <CustomForm 
        submitCallBack={ (formData) => dispatch(requestAccessToLibrary(formData.library_selected)) } 
        librariesList={patron.librariesList} 
        fields={fields}
        messages={messages} 
        title={intl.formatMessage(messages.title)}
        searchCustomSelect={(input) => {
          dispatch(requestGetLibraryList(input))
        }}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: isPatronLoading(),
  patron: makeSelectPatron()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)((MyLibrariesPage));
