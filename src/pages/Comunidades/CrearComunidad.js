import React,{useEffect,useState} from "react";
import {urlNewComunidad,urlZONAS} from "../../servicio/apirest";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios' ;
import { Form } from 'react-bootstrap';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function CrearComunidad() {
    const history = useHistory();
    const cookies = new Cookies();
    const [data, setData] = useState([" "]);
    const [distri, setDistri] = useState([" "]);
    const [zona, setZonas] = useState([]);
    const [form, setForm]=useState({     
        Nombre:"",
        Telefono:"",
        Correo:"",
        Pais:506,           
        Provincia: 0 ,
        Canton: 0,  
        Distrito:0,     
        Senas: "",
        Estado:"ACT",
        ID_Zona:0
    });

    const handleChange=e=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });
        console.log(value)                    
    }; 
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
    const handleSubmit = event => {
        event.preventDefault();    

        let url = urlNewComunidad;
        console.log(form)
        axios.post(url, form)
        .then(response => {  
            console.log(response)
            if(response.status === 201){
                console.log(response)
                //setNewComu(response.data)
                swal("¡Buen trabajo!", "Registró de la comunidad correctamente!", "success");
                history.push("/Comunidades/AllComunidades")
            }else{
                swal("¡Error al crear Comunidad!", "Intente de nuevo!", "error");
                history.push("/Comunidades/AllComunidades")
            }                            
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Comunidades/AllComunidades");
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
        <form className='container'  onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Crear Comunidad</b></h1>
            {/*<h1>{props.objeto.name}</h1>*/}
            <div className="form-group">
                <label>Nombre:</label>
                <Form.Control type="text" 
                placeholder="Nombre comunidad" 
                name="Nombre"
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Teléfono:</label>
                <Form.Control type="number" 
                placeholder="0000-0000"
                max="9"
                name="Telefono" 
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Correo:</label>
                <Form.Control type="email" 
                placeholder="name@example.com"
                name="Correo" 
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
                    onClick={()=>callCanton()} onfucus={()=>callDistrito()}   >
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
                <label>ZONA: </label>
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
                <label>ESTADO: </label>
                <select type="select" name="Estado"  className="form-control"   
                    placeholder="Estado" onChange={handleChange}   >                        
                    <option>Estado comunidad provincia:</option>
                    <option value="ACT">Activado </option>
                    <option value="SUS">Suspendida</option>
                    
                </select> 
            </div>                
            <br />
            <button type="submit" style={{background:"#357a6b"}} className="btn btn-primary" >  
                Crear
            </button>
        
        </form>
        </>
    )
    
}

export default CrearComunidad