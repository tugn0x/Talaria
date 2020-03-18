import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {fields} from './fields';
import messages from './messages'; 
import {requestGetLibraryList, requestMyLibraries} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {MyLibrariesList} from 'components';


const MyLibrariesListPage = (props) => {
    console.log('MyLibrariesListPage', props)
    const {dispatch, isLoading, patron, match} = props
    const intl = useIntl();
   
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetLibraryList())
            dispatch(requestMyLibraries())
        }
    }, [])

    return (
        <div className="my-libraries">
            {patron.my_libraries && 
                <MyLibrariesList 
                    my_libraries={patron.my_libraries.data}
                    pagination={patron.my_libraries.pagination} 
                    match={match} 
                    librariesList={patron.librariesList} 
                    fields={fields}
                    messages={messages} 
                    editPath={'/patron/my-libraries/library/:id?'}
                    title={intl.formatMessage(messages.title)}
                />
            }
        </div>
    )
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

export default compose(withConnect)(MyLibrariesListPage);
