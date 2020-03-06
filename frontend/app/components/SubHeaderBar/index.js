import React, { useEffect,useRef } from 'react'
import './style.scss'
import { FormattedMessage } from 'react-intl';
import {useIntl} from 'react-intl'
import messages from 'routes/messages'; 

const SubHeaderBar = (props) => {
    const routes = props.routes.filter((route)=>route.header);
    const intl = useIntl()
    
    useEffect(() => {
        // set total width of the component for scrollY on Mobile
        const linkElements = document.querySelectorAll('.subheader-menu li')
        const subheaderMenu = document.querySelector('.subheader-menu');
        let totalWidth = 0
        
        if(linkElements.length > 0 && subheaderMenu){
            linkElements.forEach(el => {
                totalWidth += ( el.clientWidth + 30) 
            })
            subheaderMenu.style.width = `${totalWidth}px`
        }
    },[])
    
    return (
        <div className="app-subheader bg-grey-lighter">
            <div className="container">
                <ul className="subheader-menu list-inline pl-0">
                    { routes.map((route,i)=> (
                        <li key={`${route.url}-${i}`} className={`${route.current ? 'current-page' : ''}`}>
                            <a href={route.url}><FormattedMessage {...messages[route.name]}/></a>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    )
}


export default SubHeaderBar
