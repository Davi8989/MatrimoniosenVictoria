import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlCrearZona} from '../../servicio/apirest';
import { Button,Form } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";

function CrearZonas() {
    const history = useHistory();
    const cookies = new Cookies();  
    
    const [form, setForm]=useState({                
        NombreZona:""
    });
    const handleChange=e=>{
      const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });
        console.log(value)             
    }     

    const handleSubmit = event => {
        event.preventDefault();  
        let url = urlCrearZona;        

        axios.post(url, form)
        .then(response => {  
            if(response.status === 200){
                console.log(response)
                swal("¡Buen trabajo!",response.data.Mensaje, "success");
                history.push("/Zonas/AllZonas")
            }else{
                swal("¡Error al crear asamblea!",response.data.Mensaje, "error");
                history.push("/Zonas/AllZonas")
            }                            
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Zonas/AllZonas")
        })      
    }
    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
    return(
        <>
        <Menu/>
        <form className='container' onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Crear Zona</b></h1>
            <div className="form-group">
                <label>Nombre de la Zona Nueva:</label>
                <Form.Control type="text" 
                placeholder="Zona de los Santos" 
                name="NombreZona"
                onChange={handleChange}/>
            </div>
            
            <br />
            
            <Button type="submit"  style={{background:"#357a6b"}} >Crear</Button>
        
        </form>
        </>
    )
    
}

export default CrearZonas