import React, { useState, useEffect } from 'react'
import {Button} from 'reactstrap'
const Header = (props) => {
    console.log("Header Wizard", props)
    // const [disabled, setDisabled] = useState(false)
   /*  const [visited, setVisited] = useState(() => {
            let vis = []
            for(let i = 1; i <= props.totalSteps; i++){
                vis.push(i === 1 ? true : false)
            }
            return vis
        }
    ) */
    
   /*  useEffect(() => {
        if(props.validation){
            visited[props.step - 1] = true
        }else {
            visited[props.step] = false
        }
    }, [props.step, props.validation])  */

    useEffect(() => {
       // console.log(visited)
     
    }) 

    return (
        <div className="header-wizard">
            <div>
                {Object.keys(props.steps).map((key) => 
                    <Button 
                        key={key}
                        className={props.step === Number(key) ? 'active' : ''}
                        onClick={() => props.changeStep(key)}
                        disabled={key === 1 ? false : !props.steps[key].active}
                    >
                        Step {key}
                        {/* console.log(key) */}
                    </Button> 
                )}
            </div>
        </div>
    )
}

export default Header