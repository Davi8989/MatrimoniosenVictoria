import React,{useState} from 'react'
import '../../css/Login.css';
import axios from 'axios'
import swal from 'sweetalert';
import { urlRecordarContrase } from "../../servicio/apirest";
import {useHistory} from 'react-router-dom';


function RecordarContrase(params) {
    const history = useHistory();
    const [form, setForm]=useState({
        Usuario:'',
        
    });
    const [error, setError]=useState(false);
  const [mensaje, setMensaje]=useState('');
    const handleChange=e=>{
    const {name, value} = e.target;
      setForm({
          ...form,
          [name]: value                  
      });
      console.log(value)             
  }

    const RecordarPassword=()=>{
        let url = urlRecordarContrase; 
        axios.post(url, form)
        .then(response => {       
            console.log(response.data.Codigo) 
            if(response.data.Codigo === 0){            
                swal("Excelente!" , "Se ha enviado un link a su correo electrónico!", "success");
                //cookies.set('CodigoPersona',response.data.Codigo, {path:'/'})
                history.push("/")     
                console.log(response.data.Codigo)        
                
            }else{    
                swal("Lo sentimos!" , "Usuario no tiene correo electrónico registrado, por favor comunicarse con un administrador para que le ayude con el registro del correo electrónico!", "error");     
                //setError(true)  
                //setMensaje(response.data.Mensaje)        
            }        
        })
        .catch(error =>{
        console.log(error)
        })
    } 
    return(
        <div className="containerPrincipal">
        <div className="containerLogin">
            <div className="form-group">
            <label>Digitar el usuario que tiene registrado,
            se le enviara un link al correo para que pueda cambiar la contraseña: </label>
            <br />
            <input
                type="email"
                className="form-control"
                name="Usuario"
                onChange={handleChange}
            />
            <br />            
            <br />
            <button className="btn btn-primary" onClick={()=>RecordarPassword()}>
                Enviar al Correo
            </button>
            <br/><br/>
            {error === true && 
                <div className="alert alert-danger" role="alert">
                    {mensaje}
                </div>
            }
            
            
            </div>
        
        </div>
        </div>
    )
    
}

export default RecordarContrase