import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
import {urlTraerPersona,urlEliminarPersona} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function DeleteBorrar(props) {
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
        let url = urlTraerPersona; 
        axios.post(url , cod)
        .then((response) => ( 
            console.log(response.data),
            setNombre(response.data.NOMBRE)            
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

            let url =urlEliminarPersona;
            
            axios.post(url, data)
                .then((response) => {  
                    console.log(data)
                    console.log(response.data.Codigo)
                    if(response.data.Codigo ===  0){
                        console.log(response)
                        swal("¡Buen trabajo!", response.data.Mensaje , "success");
                        history.push("/Personas/Personas")
                        
                    }else if(response.data.Codigo <=  -1){
                        swal("¡Error!", response.data.Mensaje, "error");
                        history.push("/Personas/Personas")
                    }
                    else{
                        console.log(data)
                        swal("¡Error al eliminar asamblea!", "Intente de nuevo!", "error");
                        history.push("/Personas/Personas")
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
    console.log(props.match.params.id)
    return(
       <>
        <Menu/>
        <form className='container' onSubmit={handleSubmit} >
        <h1 style={{color:"#10ab80"}}><b>Eliminar Persona</b></h1>
            <div className="form-group mt-3 d-none"> 
                <label>Id Comunidad: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ form  } />                         
            </div>  
            <div className="form-group mt-3"> 
                <label>Eliminar a: </label>
                <input type="text" className="form-control "
                 disabled={true} name="Codigo"
                 value={ Nombre  } />                         
            </div>
            <Button type="submit" style={{background:"#357a6b"}} >Eliminar</Button>
            
        </form>
        </>
    )
}


export default  DeleteBorrar;