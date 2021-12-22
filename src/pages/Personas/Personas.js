import React, {useEffect,useState} from 'react';
import '../../css.css';
import {urlAllPersonas} from "../../servicio/apirest";
import {useHistory,Link} from 'react-router-dom';
import { Button,Form} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios' 
import Menu from "../Navbar/Menu";


function Personas() {      
    
    const history = useHistory();
    const cookies = new Cookies();
    const [persona, setPersona] = useState([]);
    const [pers , setPers] = useState({
        criterio : "",
    })


    useEffect(() => {           
        console.log(pers)
        let url = urlAllPersonas;
        axios.post(url,pers )
        .then((response) => ( 
            //console.log(response.data)     
            setPersona(response.data)            
        ))
        .catch(error => {
            console.log(error)
        })  
    },[pers]);
    
    //Manejo Cookies
    useEffect(()=>{
        //console.log(!cookies.get('CodigoPersona'))
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
    //Llama solo a una persona
    const Buscar=()=>{
        console.log(pers)
        let url = urlAllPersonas;
        axios.post(url, pers )
        .then((response) => ( 
            //console.log(response.data) 
            setPersona(response.data)            
        ))
        .catch(error => {
            console.log(error)
        }) 
    }
    //Captura Name o UserName
    const handleChange=e=>{
        const {name, value} = e.target;
        setPers({
            ...pers,
            [name]: value                  
        });
        //Buscar();
    };


    return(
        <>
        <div >
            <Menu/>
                <div className="container ">
                    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
                        <div className="row ">   
                            <div className="col-sm-3 mt-5 mb-4 text-gred">
                                <div className="search">
                                    <Button style={{background:"#357a6b"}} 
                                    onClick={()=>history.push('/Personas/CrearPersonas')}>
                                    Agregar Persona
                                    </Button>             
                                </div>    
                            </div>                        
                            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"#357a6b"}}>
                                <h2><b>Todas las Personas</b></h2>
                            </div> 
                            <div className="col-sm-3 mt-1 mb-4 text-gred" style={{color:"green"}}>
                            <div className="search">
                                <Form.Control type="text" name="criterio" placeholder="Nombre o Apellido"
                                onChange={handleChange} />       
                                <Button style={{background:"#357a6b"}} className="mt-1" onClick={()=>Buscar()} >
                                    Buscar
                                </Button>
                            </div>                      
                            </div>                       
                        </div> 
                        <div className="row">
                            <div className="table-responsive " >
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th /*className='d-none'*/ >Id</th>
                                        <th>Nombre </th>
                                        <th>Usuario</th>     
                                        <th>Teléfono</th> 
                                        <th>Correo</th> 
                                        <th>Provincia</th>  
                                        <th>Editar</th>                          
                                    </tr>
                                </thead>
                                <tbody> 
                                    {  persona.map(item => (
                                        <tr>
                                        <td /*className='d-none'*/  id={item.ID_USUARIO}>{item.ID_USUARIO}</td>
                                        <td>{item.NOMBRE}</td>    
                                        <td>{item.USERNAME}</td> 
                                        <td>{item.TELEFONO}</td> 
                                        <td>{item.CORREO}</td> 
                                        <td>{item.Provincia}</td>                                 
                                        <td>
                                        
                                            <Link  data-toggle="tooltip" data-placement="bottom" title="Editar" 
                                            className="material-icons" to={"/Personas/EditarPersona/"+item.ID_USUARIO} style={{color:"#357a6b"}}> &#xE254;</Link>
                                            <Link data-toggle="tooltip" data-placement="bottom" title="Eliminar" 
                                             className="material-icons" to={"/Personas/DeletePersona/"+item.ID_USUARIO} style={{color:"#357a6b"}}> &#xE872;</Link>                                        
                                            <Link  data-toggle="tooltip" data-placement="bottom" title="Disponibilidad" 
                                            className="material-icons" to={"/Disponibilidad/AllDisponible/"+item.ID_USUARIO} style={{color:"#357a6b"}}>calendar_today</Link>
                                        
                                        </td>
                                        </tr>
                                    ))}                         
                                </tbody>
                            </table>
                        </div>   
                    </div> 
                </div>    
                </div>
            
        </div>
        </>


    )   

    
}

export default Personas