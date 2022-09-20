//NOT USED ANYMORE

import React from 'react'
import {BasePage} from "components";

import MyLibraryPage from '../MyLibraryPage/Loadable';
import {useIntl} from 'react-intl'

export default function AssociateLibraryPage (props)  {
    console.log('AssociateLibraryPage', props)
    const intl=useIntl();
    
    return (        
        <BasePage {...props} routes={[]} headermenu={false}>               
            <MyLibraryPage match={props.match} auth={props.auth}/>
        </BasePage>
    )
};