import React from 'react'
import './style.scss'

const SubHeaderBar = (props) => {
    const routes = props.routes.filter((route)=>route.header);

    return (
        <>
            {props.headermenu && (
                <div className="app-subheader bg-grey-lighter">
                    <ul className="subheader-menu container list-inline">
                        { routes.map((route,i)=> <li key={`${route.url}-${i}`} className={`${route.current ? 'current-page' : ''}`}><a href={route.url}>{route.name}</a></li>) }
                    </ul>
                </div>
            )}
        </>
    )
}


export default SubHeaderBar
