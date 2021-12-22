import React,{useState} from "react";
import { Button,Modal } from 'react-bootstrap';


function AsignarEliminar() {

        //setForm(props.match.params.id) 
  

    const [show, setShow] = useState(false);

  const handleClose2 = () => setShow(false);
  const handleShow = () => setShow(true);



    return(
        <>            
        
            <i className="material-icons ml-2" onClick={() => handleShow()}>&#xE872;</i>
            
            <Modal
                show={show}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Eliminar Asignación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Cuidado</h2>
                        
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    cerrar
                </Button>
                
                </Modal.Footer>
            </Modal>
        </>
    )

    
}

export default AsignarEliminar