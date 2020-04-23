import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
// import {fields} from './fields';
import messages from './messages'; 
import {requestMyLibraries} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import MyLibraryPage from '../MyLibraryPage';
import {SimpleList} from 'components'
import {columns} from './columns'

const MyLibrariesListPage = (props) => {
    console.log('MyLibrariesListPage', props)
    const {dispatch, isLoading, patron, match} = props
    const intl = useIntl();
   
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestMyLibraries())
        }
    }, [])

    return (
        <SimpleList 
            data={patron.my_libraries.data}
            columns={columns}
            loading={isLoading}
            pagination={patron.my_libraries.pagination}
            history={history}
            messages={messages}
            match={match}
            title={intl.formatMessage(messages.header)}
            searchOptions={{
                getSearchList: (query) => dispatch(requestMyLibraries(null, query)),
                searchOnChange: true
            }}
            editPath={'/patron/my-libraries/library/:id?'}
            modalComponent={ <MyLibraryPage match={match}/>}
        />
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
