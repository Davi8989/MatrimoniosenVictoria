import React, {useEffect,useState} from 'react'
import {urlListaComunidades} from "../../servicio/apirest";
import {useHistory,Link} from 'react-router-dom';
import { Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios' 
import Menu from "../Navbar/Menu";

function AllComunidades2(props) {      
    
    const history = useHistory();
    const cookies = new Cookies();
    const [comu, setComu] = useState([])

    useEffect(() => {            
        let url = urlListaComunidades;
        axios.get(url )
        .then((response) => ( 
            //console.log(response.data)     
            setComu(response.data)            
        ))
        .catch(error => {
            console.log(error)
        })  
    },[]);
    
    //Manejo Cookies
    useEffect(()=>{
        //console.log(!cookies.get('CodigoPersona'))
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
                        <Button style={{background:"#357a6b"}}    
                    onClick={()=>history.push('/Comunidades/CrearComunidad/')}>                                                    
                        Agregar Comunidad
                        </Button>
                                                
                      </div>    
                    </div>                        
                        <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred " style={{color:"#357a6b"}}  >
                            <h2><b>Todas las Comunidades</b></h2>
                        </div>                        
                    </div> 
                    <br/><br/>
                    <div className="row">
                        <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className='d-none' >Id</th>
                                    <th>Nombre </th>
                                    <th>Teléfono</th>
                                    <th>Correo</th>
                                    <th>Pais</th>
                                    <th>Provincia</th>
                                    <th>Canton</th>
                                    <th>Distrito</th>
                                    <th>Señas</th>
                                    <th>Estado</th>
                                    <th>ID_Zona</th>
                                    <th>Editar</th>

                                </tr>
                            </thead>
                            <tbody> 
                                {  comu.map(item => (
                                    <tr>
                                    <td className='d-none'  id={item.Id_Comunidad}>{item.Id_Comunidad}</td>
                                    <td>{item.Nombre}</td>    
                                    <td>{item.Telefono}</td>
                                    <td>{item.Correo}</td>
                                    <td>{item.Pais}</td>
                                    <td>{item.Provincia}</td>
                                    <td>{item.Canton}</td>
                                    <td>{item.Distrito}</td>  
                                    <td>{item.Senas}</td>
                                    <td>{item.Estado}</td>
                                    <td>{item.ID_Zona}</td>                             
                                    <td>
                                    
                                    <Link  className="material-icons" to={"/Comunidades/ModificarComunidad/"+item.Id_Comunidad} style={{color:"#357a6b"}}> &#xE254;</Link>
                                                                            
                                    
                                    <Link  className="material-icons" to={"/Comunidades/DeleteComunidades/"+item.Id_Comunidad} style={{color:"#357a6b"}}> &#xE872;</Link>
                                      
                                    
                                        
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

export default AllComunidades2