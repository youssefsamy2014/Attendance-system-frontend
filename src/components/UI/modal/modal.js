import React from 'react'
import Modal from 'react-bootstrap/Modal'
// import {Button}from 'react-bootstrap'
const Modals=(props)=> {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Tips
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
         {props.bodyy}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
  
  export default Modals;