import {useEffect, useState} from 'react'

const useGetWindowSize = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    
    useEffect(() => {
        
        window.addEventListener('resize', () => setWindowSize(window.innerWidth) )

        return (() => {
            window.removeEventListener('resize', () => setWindowSize(window.innerWidth) )
        })
    }, [])
    
    return windowSize <= 992 ? 'mobile' : 'desktop'
}

export default useGetWindowSize