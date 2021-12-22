import React,{useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory,Link} from 'react-router-dom';
import { Button} from 'react-bootstrap';
//import { Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {urlAllDisponiblidad} from "../../servicio/apirest";
import axios from 'axios';
//import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";

function AllDisponible(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [dispo, setDispo] = useState([" "]);
    const [cod,setCod] = useState({
       Codigo:props.match.params.id,
    }); 
    const [id_usuario,setId_Usuario] = useState({
        usuario: '' ,
    });

    useEffect(() => {            
        setCod(props.match.params.id) 
        console.log(props.match.params.id)
        let url = urlAllDisponiblidad;
        axios.post(url, cod)
        .then((response) => ( 
            console.log(response.data[1]) ,    
            setDispo(response.data)         ,
            setId_Usuario(response.data.ID_USUARIO)
        ))
        .catch(error => {
            console.log(error)
        })  
    },[]);
    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });

    return(
        <div >
            <Menu/>
            <div className="container ">
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
                    <div className="row ">   
                    <div className="col-sm-3 mt-5 mb-4 text-gred">

                       <div className="search">
                        <Button style={{background:"#357a6b"}} id={props.match.params.id}
                        onClick={()=>history.push('/Disponibilidad/CrearDispo/'+props.match.params.id)}>                                                    
                        Agregar Disponibilidad {dispo.ID_USUARIO}
                        </Button>               
                      </div>    
                    </div>                        
                        <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred " style={{color:"#357a6b"}}  >
                            <h2><b>Disponibilidad</b></h2>
                        </div>                        
                    </div> 
                    <br/><br/>
                    <div className="row">
                        <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className='d-none' >ID_Ingreso</th>
                                    <th>DIA </th>
                                    <th>ID_USUARIO</th>
                                    <th>Hora Desde</th>
                                    <th>Hora Hasta</th>                                    
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {  dispo.map(item => (
                                    <tr>
                                    <td className='d-none'id={item.ID_Ingreso}>{item.ID_Ingreso}</td>
                                    <td>{item.DiaSemana}</td>    
                                    <td>{item.UserName}</td>
                                    <td>{item.HoraDesde}</td>
                                    <td>{item.HoraHasta}</td>                                      
                                    <td>
                                    
                                    <Link title="Editar" data-toggle="tooltip"
                                     className="material-icons" to={"/Disponibilidad/Modificar/"+item.ID_Ingreso} style={{color:"#357a6b"}}> &#xE254;</Link>
                                          
                                    <Link title="Eliminar" data-toggle="tooltip"
                                     className="material-icons" to={"/Disponibilidad/Delete/"+item.ID_Ingreso} style={{color:"#357a6b"}}> &#xE872;</Link>
                                    
                                        
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
    )
}

export default  AllDisponible