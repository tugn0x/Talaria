import React, {useEffect, useState} from 'react'
import Loader from 'components/Form/Loader';
import {FormattedHTMLMessage, useIntl} from 'react-intl';
import './style.scss';
import { Button } from 'reactstrap';


const UpgradeLibraryProfile = (props) => {
    console.log('LibraryStatus', props)
    const { data,upgradeProfileCallback} = props
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    

    useEffect(() => {
        setMounted(true)
     }, [])
             
    return (
        mounted && 
          <div className="libraryStatusEditPanel">                                
            <h1>{intl.formatMessage({id:'app.components.UpgradeLibraryProfile.upgradeProfileTitle'})}</h1>
              <FormattedHTMLMessage id="app.components.UpgradeLibraryProfile.upgradeProfileDescription" defaultMessage="app.components.UpgradeLibraryProfile.upgradeProfileDescription" />              
              <br/><br/>
              <Button type="button" onClick={()=>upgradeProfileCallback()} className="mt-0" color="success">{intl.formatMessage({id:'app.components.UpgradeLibraryProfile.upgradeProfileButton'})}</Button>
            </div>            
       
    )
}

export default UpgradeLibraryProfile
