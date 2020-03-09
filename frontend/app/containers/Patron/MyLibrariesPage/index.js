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
import {useIntl} from 'react-intl';
import {fields} from './fields';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import {requestGetLibraryList, requestAccessToLibrary, requestMyLibraries} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {MyLibrariesList} from 'components';


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
      <MyLibrariesList 
        my_libraries={patron.my_libraries} match={props.match} 
        requestAccessToLibrary={ (formData) => dispatch(requestAccessToLibrary(formData.library_selected)) } 
        librariesList={patron.librariesList} 
        fields={fields}
        messages={messages} 
        title={intl.formatMessage(messages.title)}
        searchCustomSelect={(input) => dispatch(requestGetLibraryList(input)) }
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
