import React from 'react'
import {Button} from 'reactstrap'
import scrollTo from 'utils/scrollTo';
import './style.scss'

const ButtonToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false)
    const element = document.querySelector('.modal') === null ? window : document.querySelector('.modal')
    
    function setButtonVisible() {
        if(Math.floor(element.scrollY) > 900){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        } 
        console.log(element)
    }
    
    React.useEffect(() => {
        element.addEventListener('scroll', setButtonVisible)
        return () => {
            element.removeEventListener('scroll', setButtonVisible())
        }
    }, [])

    return (
        isVisible &&
        <Button className="btn-to-top" onClick={() => scrollTo(element)}>
            <i className="fa fa-arrow-up"></i>
        </Button>
        || null
    )
}

export default ButtonToTop