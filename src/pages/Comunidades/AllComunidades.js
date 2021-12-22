import React, {useEffect,useState} from 'react'
import {urlComunidades} from "../../servicio/apirest";
import {useHistory,Link} from 'react-router-dom';
import { Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios' 
import Menu from "../Navbar/Menu";

function AllComunidades(props) {      
    
    const history = useHistory();
    const cookies = new Cookies();
    const [comu, setComu] = useState([])

    useEffect(() => {            
        let url = urlComunidades;
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
                        <div className="col-sm-3 offset-sm-2 mt-5 mb-4 "  style={{color:"#357a6b"}} >
                            <h2>Todas las Comunidades</h2>
                        </div>                        
                    </div> 
                    <br/><br/>
                    <div className="row">
                        <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className='d-none' >Id</th>
                                    <th>Comunidad </th>
                                    <th>Opción</th>                               
                                </tr>
                            </thead>
                            <tbody> 
                                {  comu.map(item => (
                                    <tr>
                                    <td className='d-none'  id={item.Codigo}>{item.Codigo}</td>
                                    <td>{item.Descripcion}</td>                                    
                                    <td>
                                    <Link title="Editar" data-toggle="tooltip"
                                     className="material-icons" to={"/Comunidades/ModificarComunidad/"+item.Codigo} style={{color:"#357a6b"}}> &#xE254;</Link>
                                    
                                    <Link title="Eliminar" data-toggle="tooltip"
                                     className="material-icons" to={"/Comunidades/DeleteComunidades/"+item.Codigo} style={{color:"#357a6b"}}> &#xE872;</Link>
                                    
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

export default AllComunidades