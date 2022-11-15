import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {InstitutionTypesList} from 'components'
import {requestGetInstitutionTypesList,requestDeleteInstitutionType} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import messages from './messages'
import confirm from "reactstrap-confirm";
// import queryString from 'query-string'

const InstitutionTypesListPage = (props) => {
    console.log('InstitutionTypesListPage', props)
    const {dispatch, isLoading, admin, history,match} = props
    const intl = useIntl();
    const institutionTypes = admin.institutionTypes.data
    const pagination = admin.institutionTypes.pagination

    const editPath="/admin/institutions/institution-types/:id/:op?"    
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetInstitutionTypesList())
        }
    }, [])

     async function deleteInstitutionType (inst,multifilter) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askDeleteMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
            dispatch(requestDeleteInstitutionType(inst,intl.formatMessage(messages.deletedMessage)))
    }

    
    return (        
        <InstitutionTypesList 
                sectionTitle={messages.header}
                data={institutionTypes}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                
                match={match}   
                editPath={editPath}             
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.url)
                        searchFilter={...searchFilter}
                        dispatch(requestGetInstitutionTypesList(page,pageSize,searchFilter))
                    },
                    searchOnChange: true
                }}
                deleteInstitutionType={deleteInstitutionType}                    
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

export default compose(withConnect)(InstitutionTypesListPage);
