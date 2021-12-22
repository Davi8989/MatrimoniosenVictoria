import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {urlEditarZona,urlUnaZona} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";

function EditarZona(props) {
    const history = useHistory();
    const [cod, setCod]=useState({                
        Codigo:props.match.params.id,
    });
    const [zona, setZona] =  useState("");
    const [Nombre, setNombre] =  useState("");
    const [form, setForm]=useState({                
         ID_Zona:0,
         NombreZona: ""   
    });
    const handleChange=e=>{
      const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });
        console.log(value)             
    }
    //trae seleccionado
    useEffect(() => {
        setCod(props.match.params.id)
        let url = urlUnaZona; 
        axios.post(url , cod)
        .then((response) => ( 
            // eslint-disable-next-line no-sequences
            setZona(response.data.Codigo),
            setNombre(response.data.Mensaje)            
        ))  
    },[cod,props.match.params.id]);


    const handleSubmit = event => {
        event.preventDefault();
            var data ={
             NombreZona    : (form.NombreZona ? form.NombreZona : Nombre),
             ID_Zona: props.match.params.id
            }
            let url =urlEditarZona;
            axios.post(url,data )
                .then((response) => {  
                    console.log(data)
                    console.log(response.data.Codigo)
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
        <h1 style={{color:"#10ab80"}}><b>Editar Zona</b></h1>
            <div className="form-group mt-3 d-none"> 
                <label>Id Comunidad: </label>
                <input type="text" className="form-control "
                 disabled={true} name=" ID_Zona"
                 onChange={handleChange}
                value= {form.ID_Zona ? form.ID_Zona : zona} />                         
            </div>  
            <div className="form-group mt-3"> 
                <label>Modificar Zona de: </label>
                <input type="text" className="form-control"
                  name="NombreZona"
                 onChange={handleChange}
                 value= {form.NombreZona ? form.NombreZona : Nombre} />                         
            </div>
            <Button type="submit" style={{background:"#357a6b"}} >Editar</Button>
        </form>
        </>
    )
    
}


export default EditarZona