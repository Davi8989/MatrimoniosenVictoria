/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect,useState} from 'react'
import { Button,Modal} from 'react-bootstrap';
import {useHistory,Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios' 
import {urlTablaAsamblea} from "../../servicio/apirest";
import Form from "../Asambleas/Form"
import FormEditar from "../Asambleas/FormEditar"
import Menu from "../Navbar/Menu";
import FormEliminar from './FormEliminar';


function AllAsambleas() {

  const history = useHistory();
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [all , setAll] = useState({
    
    Comunidad:0,
    Siervo:0,
    Ministro:0,
    RangoFechas:"N",
    FechaInicio:"0000-00-00",
    FechaFin:"0000-00-00"
  })
  const [date , setDate] = useState({
    comunidad: 0,
    siervo: 0,
    ministro:0,
    rangoFechas:'S',
    date1:'',
    date2:'',
  })
  const [asamblea , setAsamblea] = useState([]) 


  //captura el valor de fechas a filtrar
  const handleChange=e=>{
    const {name, value} = e.target;
      setDate({
          ...date,
          [name]: value                  
      });    
      setAll({
        ...all,
        [name]: value                  
    });    
      console.log(value) 
  }
  //funcion de filtrar por fechas
  const filtrar=() => {
    console.log(date)
    //console.log(setAsamblea())
      let url = urlTablaAsamblea;
      axios.post(url , date )
      .then((response) => ( 
          //console.log(response.data)     
          setAsamblea(response.data) 
      ))
      .catch(error => {
          console.log(error)
      })  
  }
  //Trae todas callAllAsambleas
    useEffect(() => {    
      //console.log(all)
        let url = urlTablaAsamblea;
        axios.post(url , all)
        .then((response) => ( 
            //console.log(response.data)     
            setAsamblea(response.data)                 
        ))
        .catch(error => {
            console.log(error)
        })  
    },[]) 
  //Manejo Cookies
  useEffect(()=>{
    //console.log(!cookies.get('CodigoPersona'))
    if(!cookies.get('CodigoPersona')){
      history.push('./');
    }
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2  = () => setShow2(true);

  
 

  
  return ( 
    <>
    <Menu/>
      <div className="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
            <div className="row ">
            
                <div className="col-sm-3 mt-5 mb-4 text-gred">
                    <div className="search">                      
                      <Button style={{background:"#357a6b"}} 
                        onClick={()=>history.push('/Asambleas/Form')}>
                        Agregar Asamblea
                      </Button>
                    </div>    
                </div>  
                <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"#357a6b"}}>
                  <h2><b>Todas las Asambleas</b></h2>
                </div>
                
            </div> 

           
            <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className='d-none'>Id</th>
                            <th>Movimiento </th>
                            <th>Comunidad</th>
                            <th>Hora Inicio</th>
                            <th>Hora fin</th>
                            <th>Días</th>
                            <th>Estado</th>
                            <th>Opción</th>
                            
                        </tr>
                    </thead>
                    <tbody> 
                        {  asamblea.map(item => (
                            <tr>
                            <td className='d-none' id={item.ID_ASAMBLEA}>{item.ID_ASAMBLEA}</td>
                            <td>{item.Movimiento}</td>
                            <td>{item.Comunidad}</td>
                            <td>{item.HoraInicio}</td>
                            <td>{item.HoraFin}</td>
                            <td>{item.Dias}</td>
                            <td>{item.Estado}</td>
                                                        
                                                    

                            <td>
                                <Link title="Editar" data-toggle="tooltip"
                                 className="material-icons" to={"/Asambleas/FormEditar/"+item.ID_ASAMBLEA} style={{color:"#357a6b"}}> &#xE254;</Link>
                                
                                <Link title="Eliminar" data-toggle="tooltip"
                                 className="material-icons" to={"/Asambleas/FormEliminar/"+item.ID_ASAMBLEA} style={{color:"#357a6b"}} >&#xE872;</Link>
                                
                                 
                            </td>
                        </tr>
                        ))}                         
                    </tbody>
                </table>
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
              <Modal.Title>Agregar Asamblea</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form/>            
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
      
          {/* Model Box Finsihs */}
        </div>     
          {/* <!--- Model Box ---> */}
        <div className="model_Editar">
          <Modal
            show={show1}
            onHide={handleClose1}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Editar Asamblea</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <FormEditar />            
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
        {/* Model Box Finsihs */}
        </div>                    

        {/* <!--- Model Box ---> */}
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
                    <FormEliminar/>            
                </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
      
          {/* Model Box Finsihs */}
        </div>     
      
          
      </div>    
      </div>  
    </>  
  );
}   


export default AllAsambleas