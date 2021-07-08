import React from "react";
import {Modal, Button} from "react-bootstrap";
import TabContent from "../TabContent/TabContent";

const PreviewModal = ({modelInfo, show, handleClose}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title> Block Index:  {modelInfo.block_index}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <TabContent modelInfo={modelInfo}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default PreviewModal;