import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {urlEliminarZonas,urlUnaZona} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";

function EliminarZonas(props) {
    const history = useHistory();
    const [cod, setCod]=useState({                
        Codigo:props.match.params.id,
              
    });
    const [zona, setZona] =  useState("");
    const [form, setForm]=useState({                
        Codigo:0,
              
    });


    //trae seleccionado
    useEffect( ()=> {
        setCod(props.match.params.id)
        let url = urlUnaZona; 
        axios.post(url , cod)
        .then((response) => ( 
            //console.log(response.data),
            setZona(response.data.Mensaje)            
        ))  
    },[])


    const handleSubmit = event => {
        event.preventDefault();
            var data ={
             codigo: props.match.params.id
            }
            let url =urlEliminarZonas;
            axios.post(url,data )
                .then((response) => {  
                    //console.log(data)
                    //console.log(response.data.Codigo)
                    if(response.data.Codigo >=  0){
                        console.log(response)
                        swal("¡Buen trabajo!", response.data.Mensaje , "success");
                        history.push("/Zonas/AllZonas")
                        
                    }else if(response.data.Codigo <=  -1){
                        swal("¡Error!", response.data.Mensaje, "error");
                        history.push("/Zonas/AllZonas")
                    }
                    else{
                        console.log(data)
                        swal("¡Error al eliminar asamblea!", "Intente de nuevo!", "error");
                        history.push("/Zonas/AllZonas")
                    }                        
            })
    }
    return(
        <>
        <Menu/>
        <form className='container' onSubmit={handleSubmit} >
        <h1 style={{color:"#10ab80"}}><b>Eliminar Zona</b></h1>
            <div className="form-group mt-3 d-none"> 
                <label>Id Comunidad: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ form  } />                         
            </div>  
            <div className="form-group mt-3"> 
                <label>Eliminar Zona de: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ zona  } />                         
            </div>
            <Button type="submit" style={{background:"#357a6b"}} >Eliminar</Button>
        </form>
        </>
    )
    
}


export default EliminarZonas