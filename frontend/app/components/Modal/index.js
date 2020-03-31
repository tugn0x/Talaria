import React from 'react'
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import ButtonToTop from 'components/Button/ButtonToTop'

const CustomModal = (props) => {
    const {modal, toggle} = props
    
    return (
        <Modal isOpen={modal} className="modal-lg">
            <ModalHeader toggle={toggle}>Titolo della modale</ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
            <ButtonToTop />
        </Modal>
    )
}


export default CustomModal

