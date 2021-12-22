import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlCrearPersona,urlZONAS,} from '../../servicio/apirest';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";

function CrearPersonas() {
    const history = useHistory();
    const cookies = new Cookies();  
    const [data, setData] = useState([" "]);
    const [distri, setDistri] = useState([" "]); 
    const [zona, setZonas] = useState([]); 
    const [form, setForm]=useState({                
        NOMBRE:"",
        USERNAME:"",
        PASSWORD:"DAV",
        CORREO:"",
        TELEFONO:"",
        PROVINCIA:0,
        CANTON:0,
        DISTRITO:0,
        SENAS:"",
        ROL:"",
        ESTADO:"ACT",
        Id_Zona:1,
        PAIS:506
        
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
        let url = urlCrearPersona;
        console.log(form)

        axios.post(url, form)
        .then(response => {  
            console.log(response)
            if(response.data.Codigo >= 0){
                console.log(response)
                setForm(response.data)
                swal(response.data.Mensaje, "Al usuario le llegara un correo con un enlace para que cree la contraseña.!", "success");
                history.push("/Personas/Personas")
            }else{
                swal("¡Error al crear asamblea!",response.data.Mensaje, "error");
                history.push("/Personas/Personas")
            }                            
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Personas/Personas")
        })          

    }
    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
    //Canton
    const callCanton = () => {   
        let url = `https://ubicaciones.paginasweb.cr/provincia/${form.Provincia}/cantones.json`
        axios.get(url )
        .then((response) => {
            let dataToArray = [];
        for (
          let index = 1;
          index <= Object.keys(response.data).length;
          index++
        )
        {
          dataToArray.push(response.data[ index]);
        }
        console.log(dataToArray);
        setData(dataToArray)                 
        })
        .catch(error => {
            console.log(error)
        })  
        
    }
    //Distrito
    const callDistrito = () => {
        console.log(form.Canton)
        let url = `https://ubicaciones.paginasweb.cr/provincia/${form.Provincia}/canton/${form.Canton}/distritos.json`
        axios.get(url )
        .then((response) => {
            let dataToArray = [];
        for (
        let index = 1;
        index <= Object.keys(response.data).length;
        index++
        )
        {
        dataToArray.push(response.data[ index]);
        }
        console.log(dataToArray);
        setDistri(dataToArray)                 
        })
        .catch(error => {
            console.log(error)
        })  
    }
    //Zonas
    useEffect(() => {            
        let url = urlZONAS;
        axios.get(url )
        .then((response) => ( 
            //console.log(response.data)     
            setZonas(response.data)            
        ))
        .catch(error => {
            console.log(error)
        })  
    },[]);


    return(
        <>
        <Menu/>
        <form className='container' onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Crear Persona</b></h1>
            <div className="form-group">
                <label>Nombre:</label>
                <Form.Control type="text" 
                placeholder="Nombre completo" 
                name="NOMBRE"
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Usuario:</label>
                <Form.Control type="text" 
                placeholder="Usuario"
                name="USERNAME" 
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Correo:</label>
                <Form.Control type="email" 
                placeholder="name@example.com"
                name="CORREO" 
                onChange={handleChange}/>
            </div> 
            <div className="form-group">
                <label>Teléfono:</label>
                <Form.Control type="number" 
                placeholder="0000-0000"
                name="TELEFONO" 
                onChange={handleChange}/>
            </div>           
            <div className="form-group">
                <label>Provincia: </label>
                <select type="select" name="Provincia"  className="form-control"   
                        placeholder="Provincia" onChange={handleChange}
                >                        
                        <option>Selecciones provincia:</option>
                        <option value="1">San José </option>
                        <option value="2">Alajuela</option>
                        <option value="3"> Cartago</option>
                        <option value="4"> Heredia</option>
                        <option value="5"> Guanacaste</option> 
                        <option value="6">  Puntarenas</option>
                        <option value="7">  Limón</option> 
                    </select> 
            </div>  
            <div className="form-group">
                <label>Cantón: </label>
                <select type="select" name="Canton"  className="form-control"   
                    placeholder="Canton" 
                    onChange={handleChange}
                    onClick={()=>callCanton()}                    >
                    <option>Seleccionar canton:</option>
                        {data.map((elemento,index) => {
                            return (
                                <option key={index+1} value={index+1}>
                                    {elemento}
                                </option>
                            ) 
                        })} 
                </select> 
            </div> 
            <div className="form-group">
                <label>Distrito: </label>
                <select type="select" name="Distrito"  className="form-control"   
                    placeholder="Distrito" onChange={handleChange}
                    onClick={()=>callDistrito()}>
                    <option>Seleccionar canton:</option>
                    {distri.map((elemento,index) => {
                        return (
                            <option key={index+1} value={index+1}>
                                {elemento}
                            </option>
                        ) 
                    })}                               
                </select> 
            </div> 
            <div className="form-group">
                <label>Rol: </label>
                <select type="select" name="ROL"  className="form-control"   
                    placeholder="ROL" onChange={handleChange}   >                        
                    <option>Rol del Usuario:</option>
                    <option value="ADM">Administrador Sistema </option>
                    <option value="COM">Administrador Comunidad</option>
                    <option value="SIE">Siervo</option>
                    <option value="MIN">Alabanza</option>
                    <option value="SYM">Siervo y Alabanza</option>
                </select> 
            </div> 
            <div className="form-group">
                <label>Zona: </label>
                <select type="select" name="ID_Zona"  className="form-control"   
                    placeholder="ID_Zona" onChange={handleChange} >
                    <option>Seleccionar Zona Geográfica:</option>
                    {zona.map((elemento) => {
                        return (
                            <option key={elemento.Codigo} value={elemento.Codigo}>
                                {elemento.Mensaje}
                            </option>
                        ) 
                    })}                               
                </select> 
            </div>
            <div className="form-group">
                <label>Señas</label>
                <Form.Control
                 placeholder="ejemplo: Frente al parque de Coronado"
                 name="Senas" onChange={handleChange}/>
            </div>  
            <div className="form-group">
                <label>Estado: </label>
                <select type="select" name="Estado"  className="form-control"   
                    placeholder="Estado" onChange={handleChange}   >                        
                    <option>Estado del Usuario:</option>
                    <option value="ACT">Activado </option>
                    <option value="SUS">Suspendida</option>
                    <option value="INC">Incapacitado</option>
                </select> 
            </div>  
            <br />
            <button type="submit"  style={{background:"#357a6b"}} className="btn btn-primary" >  
                Crear
            </button>
        
        </form>
        </>
    )
    
}

export default CrearPersonas