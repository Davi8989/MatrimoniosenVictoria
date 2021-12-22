import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {urlEliminarComunidades,urlUnaComunidad} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";



function DeleteComunidades(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [comu,setComu] = useState('');
    const [Nombre, setNombre] =  useState("");
    const [form, setForm]=useState({                
        Codigo:0,
              
    });
    const [cod, setCod]=useState({                
        Codigo:props.match.params.id,
              
    });
    //trae seleccionado
    useEffect( ()=> {
        let url = urlUnaComunidad; 
        axios.post(url , cod)
        .then((response) => ( 
            console.log(response.data.Nombre),
            setCod(response.data.Nombre)            
        ))  
    },[])
    

    useEffect(()=>{
        console.log(props.match.params.id)
        setForm(props.match.params.id) 
    })

    const handleSubmit = event => {
        event.preventDefault();
            var data ={
             Codigo: props.match.params.id
            }
            console.log(form.Codigo)
            console.log(data)

            let url =urlEliminarComunidades;
            
            axios.delete(url, {  data : data })
                .then((response) => {  
                    console.log(data)
                    console.log(response.data.Codigo)
                    if(response.data.Codigo ===  0){
                        console.log(response)
                        swal("¡Buen trabajo!", response.data.Mensaje , "success");
                        history.push("/Comunidades/AllComunidades")
                        
                    }else if(response.data.Codigo ===  -1){
                        swal("¡Error!", response.data.Mensaje, "error");
                        history.push("/Comunidades/AllComunidades")
                    }
                    else{
                        console.log(data)
                        swal("¡Error al eliminar asamblea!", "Intente de nuevo!", "error");
                        history.push("/Comunidades/AllComunidades")
                    }                        
            })
    }

    //Manejo Cookies
    useEffect(()=>{
        //console.log(!cookies.get('CodigoPersona'))
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
    
        
    return(
        <>
        <Menu/>
        <form className='container' onSubmit={handleSubmit} >
        <h1 style={{color:"#10ab80"}}><b>Eliminar Comunidad</b></h1>
            <div className="form-group mt-3 d-none"> 
                <label>Id Comunidad: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ form  } />                         
            </div>  
            <div className="form-group mt-3"> 
                <label>Comunidad </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ cod  } />                         
            </div>
            <Button type="submit" style={{background:"#357a6b"}} >Eliminar</Button>
        </form>
        </>
    )
}

export default DeleteComunidades;