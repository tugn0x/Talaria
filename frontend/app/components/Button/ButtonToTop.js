import React from 'react'
import {Button} from 'reactstrap'
import scrollTo from 'utils/scrollTo';
import './style.scss'

const ButtonToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false)
   // const window = document.querySelector('.modal') === null ? window : document.querySelector('.modal')
    
    function setButtonVisible() {
        if(Math.floor(window.scrollY) > 900){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        } 
      //  console.log(window)
    }
    
    React.useEffect(() => {
        window.addEventListener('scroll', setButtonVisible)
        
        return () => {
            window.removeEventListener('scroll', setButtonVisible())
        }
        
    }, [])

    return (
        isVisible &&
        <Button className="btn-to-top" onClick={() => scrollTo(window)}>
            <i className="fa fa-arrow-up"></i>
        </Button>
        || null
    )
}

export default ButtonToTop