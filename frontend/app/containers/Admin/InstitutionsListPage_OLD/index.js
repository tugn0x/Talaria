import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {requestGetInstitutionsList} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import messages from './messages'
import {columns} from './columns'
import {SimpleList} from 'components'
import InstitutionPage from '../InstitutionPage'

const InstitutionsListPageOLD = (props) => {
    console.log('InstitutionsListPage', props)
    const {dispatch, isLoading, admin, match} = props
    const intl = useIntl();
    const institutionsList = admin.institutionsOptionList.data
    const pagination = admin.institutionsOptionList.pagination
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetInstitutionsList())
        }
    }, [])

    return (
        
            <SimpleList 
                data={institutionsList}
                columns={columns}
                loading={isLoading}
                pagination={pagination}
                history={history}
                messages={messages}
                match={match}
                title={intl.formatMessage(messages.header)}
                searchOptions={{
                    getSearchList: (query) => dispatch(requestGetInstitutionsList(null, query)),
                    searchOnChange: true
                }}
                editPath={'/admin/institutions/institution/:id?'}
                modalComponent={ <InstitutionPage match={match} />}
            />
            
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isAdminLoading(),
    admin: makeSelectAdmin()
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

export default compose(withConnect)(InstitutionsListPageOLD);


