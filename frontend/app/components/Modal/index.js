import React, {useState} from 'react'
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import './style.scss' 

const CustomModal = (props) => {
    const {modal, toggle} = props
    
    return (
        <Modal isOpen={modal} className="modal-lg">
            <ModalHeader toggle={toggle}>Titolo della modale</ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
        </Modal>
    )
}


export default CustomModal

