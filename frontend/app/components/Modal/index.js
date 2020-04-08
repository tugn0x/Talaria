import React from 'react'
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import './style.scss'
const CustomModal = (props) => {
    const {modal, toggle} = props
    
    return (
        <Modal isOpen={modal} className="modal-lg">
            
            <ModalBody>
            <ModalHeader toggle={toggle}></ModalHeader>
                {props.children}
            </ModalBody>
        </Modal>
    )
}


export default CustomModal

