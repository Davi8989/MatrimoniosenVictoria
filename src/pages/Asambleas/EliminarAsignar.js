import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlEliminarAsignacion,urlUnaAsignacion} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function EliminarAsignar(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [form, setForm]=useState({                
        Codigo:0,
              
    });
    
    useEffect(()=>{
        //console.log(props.match.params.id)
        //console.log(props.history.push);
        setForm(props.match.params.id) 
    },[props.match.params.id])
    

    const handleSubmit = event => {
        event.preventDefault();
            var data ={
             Codigo: props.match.params.id
            }
            console.log(form.Codigo)
            console.log(data)

            let url =urlEliminarAsignacion;
            
            axios.delete(url, {  data })
                .then((response) => {  
                    console.log(data)
                    console.log(response)
                    if(response.data.Codigo ===  0){
                        console.log(response)
                        swal("¡Buen trabajo!", "Asignación Eliminada correctamente", "success");
                        history.push("/Asambleas/AllAsignar")
                        
                    }else{
                        console.log(data)
                        swal("¡Error al eliminar asignación!", "Intente de nuevo!", "error");
                        history.push("/Asambleas/AllAsignar")
                    }                        
                })
                .catch((error) => {
                    
                    swal("Error!", error, "error");
                    history.push("/Asambleas/AllAsignar")
                })
    }
    const [comuni,setComuni]=    useState(0);
    const [nombreAsamble,setNombreAsamble]=    useState('');
    
    const [una, setUna]=useState({  
        codigo : props.match.params.id,
      });

    useEffect(() => {   
        console.log(props.match.params.id) 
        console.log(una)
          let url = urlUnaAsignacion;
          axios.post(url , una)
          .then((response) => ( 
              console.log(response.data) ,    
              setComuni(response.data.NombreComunidad)  ,
              setNombreAsamble(response.data.NombreMovimiento)  ,
             
              console.log(response.data.ID_ASAMBLEA)   
          ))
          .catch(error => {
              console.log(error)
          })  
    },[]) ;

    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
        
    return(
        <>
        <Menu/>
        <form className='container' onSubmit={handleSubmit} >
        <h1 style={{color:"#10ab80"}}><b>Eliminar Asignación</b></h1>
            <div className="form-group mt-3 d-none"> 
                <label>Id asignación: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ form  } />                         
            </div>  
            <div className="form-group mt-3"> 
                <label>Comunidad </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ comuni  } />                         
            </div>
            <div className="form-group mt-3"> 
                <label>Movimiento </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ nombreAsamble  } />                         
            </div>
                           
            <button type="submit" style={{background:"#357a6b"}} className="btn btn-success mt-4" 
            >
                Eliminar Asignación
            </button>
            
        </form>
        </>
    )
}

export default EliminarAsignar