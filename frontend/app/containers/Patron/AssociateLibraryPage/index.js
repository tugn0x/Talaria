import React from 'react'
import {BasePage} from "components";

import messages from './messages'
import MyLibraryPage from '../MyLibraryPage/Loadable';
import {useIntl} from 'react-intl'

export default function AssociateLibraryPage (props)  {
    console.log('AssociateLibraryPage', props)
    const intl=useIntl();
    
    return (        
        <BasePage {...props} routes={[]} messages={messages} headermenu={false}>   
            <h2>{intl.formatMessage(messages.header)}</h2>
            <MyLibraryPage match={props.match} auth={props.auth}/>
        </BasePage>
    )
};