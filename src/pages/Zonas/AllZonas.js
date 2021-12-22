import React, {useEffect,useState} from 'react';
import '../../css.css';
import {urlAllZonas} from "../../servicio/apirest";
import {useHistory,Link} from 'react-router-dom';
import { Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios' 
import Menu from "../Navbar/Menu";


function AllZonas() {      
    
    const history = useHistory();
    const cookies = new Cookies();
    const [zonas, setZonas] = useState([]);

    useEffect(() => {           
        
        let url = urlAllZonas;
        axios.get(url )
        .then((response) => ( 
            //console.log(response.data) ,    
            setZonas(response.data)            
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
        <>
        <div >
            <Menu/>
                <div className="container ">
                    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
                        <div className="row ">   
                            <div className="col-sm-3 mt-5 mb-4 text-gred">
                                <div className="search">
                                    <Button style={{background:"#357a6b"}} 
                                    onClick={()=>history.push('/Zonas/CrearZonas')}>
                                    Agregar Zona
                                    </Button>             
                                </div>    
                            </div>                        
                            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"  style={{color:"#357a6b"}}>
                                <h2><b>Zonas</b></h2>
                            </div> 
                                                   
                        </div> 
                         <div className="row">
                        <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className='d-none' >Id</th>
                                    <th>Zona </th>
                                    <th>Opción</th>                               
                                </tr>
                            </thead>
                            <tbody> 
                                {  zonas.map(item => (
                                    <tr>
                                    <td className='d-none'  id={item.Codigo}>{item.Codigo}</td>
                                    <td>{item.Mensaje}</td>                                    
                                    <td>
                                    <Link  title="Modificar" data-toggle="tooltip"
                                    className="material-icons" to={"/Zonas/EditarZona/"+item.Codigo} style={{color:"#357a6b"}}> &#xE254;</Link>
                                    <Link title="Eliminar" data-toggle="tooltip"
                                     className="material-icons" to={"/Zonas/EliminarZonas/"+item.Codigo} style={{color:"#357a6b"}}> &#xE872;</Link>
                                      
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


export default AllZonas