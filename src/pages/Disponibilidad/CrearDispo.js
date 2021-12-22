import React,{useState,useEffect} from "react";
import {urlNuevaDisponibilidad,urlAllDisponiblidad} from "../../servicio/apirest";
import swal from 'sweetalert'; 
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Form } from 'react-bootstrap';
import axios from 'axios' ;
import Menu from "../Navbar/Menu";


function CrearDispo(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [form, setForm]=useState({     
        ID_USUARIO:props.match.params.id,
        DIA:"",
        HoraDesde:"",
        HoraHasta:"",
    });
    const [cod,setCod] = useState({
        Codigo:props.match.params.id,
     }); 
    const [id_usuario,setId_Usuario] = useState({
        usuario: '' ,
    });

    const handleChange=e=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });
        console.log(value)                    
    };
    const handleSubmit = event => {
        event.preventDefault();    

        let url = urlNuevaDisponibilidad;
        console.log(form)
        axios.post(url, form)
        .then(response => {  
            console.log(response)
            if(response.data.Codigo >= 0){
                console.log(response)
                //setNewComu(response.data)
                swal("¡Buen trabajo!", response.data.Mensaje, "success");
                history.push("/Disponibilidad/AllDisponible/"+props.match.params.id)
            }else{
                swal("¡Error al crear Comunidad!",  response.data.Mensaje, "error");
                history.push("/Disponibilidad/AllDisponible/"+props.match.params.id)
            }                            
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Disponibilidad/AllDisponible/"+props.match.params.id);
        })   
    }
    useEffect(() => { 
        setCod(props.match.params.id) 
        let url = urlAllDisponiblidad;
        axios.post(url, cod)
        .then((response) => ( 
            console.log(response) ,  
            setId_Usuario(response.data.ID_USUARIO),
            console.log(id_usuario)   
        ))
        .catch(error => {
            console.log(error)
        })  
    },[]);
    
    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });

    return(
        <>
        <Menu/>
        <form className='container'  onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Crear Disponibilidad</b></h1>
            <div className="form-group mt-3">
                <label>Día</label>
                <select type="select" className="form-control" name="DIA"   
                    placeholder="Selecciones el semana" onChange={handleChange}>
                    <option>Seleccionar día ...</option>
                    <option value="L">Lunes </option>
                    <option value="K">Martes</option>
                    <option value="M"> Miércoles</option>
                    <option value="J"> Jueves</option>
                    <option value="V"> Viernes</option>
                    <option value="S"> Sábado</option>
                    <option value="D"> Domingo</option>                        
                </select> 
            </div>
            <div className="form-group d-none">
                <label>id Usuario:</label>
                <Form.Control type="text" 
                name="ID_USUARIO" value={props.match.params.id}
                onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label>Hora desde:</label>
                <Form.Control type="time"
                name="HoraDesde" 
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Hora hasta:</label>
                <Form.Control type="time" 
                name="HoraHasta" 
                onChange={handleChange}/>
            </div>            
                                         
            <br />
            <button type="submit" style={{background:"#357a6b"}} className="btn btn-primary" >  
                Crear
            </button>
        
        </form>
        </>
    )
    
}

export default CrearDispo