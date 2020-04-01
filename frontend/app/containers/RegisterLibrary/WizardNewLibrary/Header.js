import React, { useState, useEffect } from 'react'
import {Button} from 'reactstrap'
const Header = (props) => {
    // const [disabled, setDisabled] = useState(false)

    /* useEffect(() => {
        setDisabled(() => {
            props.
        })
    },[props.step]) */

    return (
        <div className="header-wizard">
            <div>
                <Button 
                    className={props.step === 1 ? 'active' : ''}
                    onClick={() => props.changeStep(1)}
                >
                    Step 1
                </Button>
                <Button 
                    className={props.step === 2 ? 'active' : ''}
                    onClick={() => props.changeStep(2)}
                >
                    Step 2
                </Button>
                <Button 
                    className={props.step === 3 ? 'active' : ''}
                    onClick={() => props.changeStep(3)}
                >
                    Step 3
                </Button>
            </div>
        </div>
    )
}

export default Header