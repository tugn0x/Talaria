import React, {useEffect, useState} from 'react'
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
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
            <h1>Migrate to FULL profile</h1>
              Upgrading to full profile you'll be able to receive ILL requests from other libraries.<br/><br/>
              If you want to upgrade click on button below and check your library's catalogs and identifiers settings (these informations must be filled in order to fullfill DD requests)
              <br/><br/>
              <Button type="button" onClick={()=>upgradeProfileCallback()} className="mt-0" color="success">Upgrade to full</Button>
            </div>            
       
    )
}

export default UpgradeLibraryProfile
