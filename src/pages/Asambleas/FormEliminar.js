import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlAsambleasEliminar,urlUnaAsamblea} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function FormEliminar(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [form, setForm]=useState({                
        Codigo: props.match.params.id,
              
    });
    const [Movimiento, setMOvimiento] =    useState('');
    const [Comunidad , setCOmunidad]=    useState('');
    //Agarra los campo modificados y los que no para hacer el PUT
    /*const handleChange=e=>{
      const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });                     
    }
    //Traer el id
    */    
    useEffect(()=>{
        console.log(props.match.params.id);
        //console.log(una)
        let url = urlUnaAsamblea; 
        axios.post(url ,form)
        .then((response) => (
            console.log(response),
            setCOmunidad(response.data.Comunidad),
            setMOvimiento(response.data.Movimiento)            
        ))
            
    },[])

    const handleSubmit = event => {
        event.preventDefault();
            var data ={
             Codigo: props.match.params.id
            }
            console.log(form.Codigo)
            console.log(data)

            let url =urlAsambleasEliminar;
            
            axios.delete(url, {  data })
                .then((response) => {  
                    console.log(data.Codigo)
                    console.log(response)
                    if(response.data.Codigo ===  0){
                        console.log(response)
                        swal("¡Buen trabajo!", response.data.Mensaje, "success");
                        history.push("/Asambleas/AllAsambleas")
                        
                    }else{
                        console.log(data)
                        swal("¡Error al eliminar asamblea!", response.data.Mensaje, "error");
                        history.push("/Asambleas/AllAsambleas")
                    }                        
                })
                .catch((error) => {
                    
                    swal("Error!", error, "error");
                    history.push("/Asambleas/AllAsambleas")
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
        <h1 style={{color:"#10ab80"}}><b>Eliminar Asamblea</b></h1>
            <div className="form-group mt-3 d-none"> 
                <label>Id Asamblea: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ form.Codigo  } />                         
            </div>  
            <div className="form-group mt-3"> 
                <label>Movimiento </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ Movimiento  } />                         
            </div> 
            <div className="form-group mt-3"> 
                <label>Comunidad </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ Comunidad  } />                         
            </div> 
                           
            <button type="submit" style={{background:"#357a6b"}} className="btn btn-success mt-4" 
            >
                Eliminar Asamblea
            </button>
            
        </form>
        </>
    )
}

export default FormEliminar;