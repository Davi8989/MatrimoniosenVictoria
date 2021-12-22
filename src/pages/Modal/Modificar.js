import React,{useState} from "react";
import { Button,Modal } from 'react-bootstrap';
import ModificarComunidad from "../Comunidades/ModificarComunidad";


function Modificar(props) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    return(
        <>            
            <i className="material-icons ml-2" onClick={() => handleShow()}>&#xE417;</i>
            
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Modificar comunidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ModificarComunidad />
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

export default Modificar