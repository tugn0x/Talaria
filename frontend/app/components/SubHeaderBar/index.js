import React, { useEffect,useRef } from 'react'
import './style.scss'
import { FormattedMessage } from 'react-intl';
import {useIntl} from 'react-intl'
import messages from 'routes/messages';
import {Row, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import ResourceHeaderBar from '../ResourceHeaderBar';

const SubHeaderBar = (props) => {
    const routes = props.routes.filter((route)=>route.header);
    const intl = useIntl()

    useEffect(() => {
        // set total width of the component for scrollY on Mobile
        /* const linkElements = document.querySelectorAll('.subheader-menu li')
        const subheaderMenu = document.querySelector('.subheader-menu');
        let totalWidth = 0

        if(linkElements.length > 0 && subheaderMenu){
            linkElements.forEach(el => {
                console.log(el)
                totalWidth += ( el.clientWidth + 30)
            })
            subheaderMenu.style.width = `${totalWidth}px`
        } */
    },[])

    return (
        <div className="app-subheader bg-dark-bk">
            {props.auth && props.auth.permissions && props.auth.permissions.resources && <ResourceHeaderBar auth={props.auth} match={props.match}/>}
            <div className="container">                
                <Row className="subheader-menu pl-0">
                    { props.auth.permissions.resources && routes.map((route,i)=> (
                        <Col xs='auto' key={`${route.url}-${i}`} className={`${route.current ? 'current-page' : ''}`}>
                            <NavLink to={route.url} key={route.url}><FormattedMessage {...messages[route.name]}/></NavLink>
                        </Col>)
                    )}
                </Row>
            </div>
        </div>
    )
}


export default SubHeaderBar
