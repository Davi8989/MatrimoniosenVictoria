import React,{useState,useEffect} from 'react'
import { Button,Modal} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {urlAllAsignaciones} from "../../servicio/apirest";
import axios from 'axios'
import AsignarSiervoMinistro from "../Asambleas/AsignarSiervoMinistro";
import EliminarAsignar from "../Asambleas/EliminarAsignar";
import Cookies from 'universal-cookie';
import MenuUsuario from "../Navbar/MenuUsuario";


function Siervo_Alabanza(props) {
    
  const history = useHistory();
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  //const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [all , setAll] = useState({
    Comunidad:0,
    Mes:0,
    Ano:2021,
    Usuario: cookies.get('CodigoPersona'),
    Rango: "N",
    Desde:"2021-01-01",
    Hasta:"2021-01-01",
    Movimiento:0,
    Asamblea:0
  })

  const [comunidad , setComunidad] = useState([]) 
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  //const handleShow2 = () => setShow2(true);


  //const callAllAsignaciones=()=>{
  useEffect(() => {    
      console.log(all)
        let url = urlAllAsignaciones;
        axios.post(url , all)
        .then((response) => ( 
            //console.log(response.data)     
            setComunidad(response.data)                 
        ))
        .catch(error => {
            console.log(error)
        })  
  },[all]) 
    //Manejo Cookies
  useEffect(()=>{
    console.log(cookies.get('username'));
    console.log(cookies.get('CodigoPersona'));
    if(!cookies.get('CodigoPersona')){
      history.push('/');
    }
  });  
    return (
        <>
        <MenuUsuario/>
        <form className="container ">
            <div className="crud shadow-lg p-3 mb-2 mt-2 bg-body rounded"> 
              <div className="row ">
                <div className="col-sm-3 mt-5 mb-4 text-gred">
                  <div className="search">
                    <h2><b></b></h2>  
                  </div>    
                </div>  
                <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"#357a6b"}}>
                    <h2><b>Asignaciones</b></h2>
                </div>                        
            </div>  
            <div className="row">
                <div className="table-responsive " >
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className='d-none'>ID_ASIGNACION</th>                            
                            <th>Movimiento</th>
                            <th>Comunidad</th>
                            <th>Siervo</th>
                            <th>Alabanza </th> 
                            <th>Fecha </th>                            
                            <th>Horario</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {  comunidad.map(item => (
                            <tr>
                            <td className='d-none' id={item.ID_ASIGNACION}>{item.ID_ASIGNACION}</td>
                            <td>{item.Movimiento}</td>
                            <td>{item.Comunidad}</td>
                             <td>{item.Siervo}</td>
                            <td>{item.Ministro}</td>
                            <td>{item.Fecha}</td>
                            <td>{item.Horario}</td>                            
                        </tr>
                        ))}                         
                    </tbody>
                </table>
                </div>
            </div>
            </div>  

             {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Asignar siervo y alabanza a una asamblea</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <AsignarSiervoMinistro/>            
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
      
          {/* Model Box Finsihs */}
        </div> 
        {/* <!--- Eliminar Asignacion ---> */}
        <div className="model_Eliminar">
          <Modal
            show={show2}
            onHide={handleClose2}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Eliminar Asamblea</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <EliminarAsignar/>            
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
      
          {/* Model Box Finsihs */}
        </div>
        </form> 
     
    </>
        
    
    )
    
}

export default Siervo_Alabanza