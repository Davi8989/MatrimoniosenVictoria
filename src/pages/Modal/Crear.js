import React,{useState} from "react";
import { Button,Modal } from 'react-bootstrap';
import CrearComunidad from "../Comunidades/CrearComunidad";


function Crear() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
        <>
            <i className="col-sm-3 mt-5 mb-4 text-gred" onClick={() => handleShow()} >Agregar Comunidad</i>
            
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Crear nueva comunidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                
                </Modal.Footer>
            </Modal>
        </>
    )

    
}

export default Crear