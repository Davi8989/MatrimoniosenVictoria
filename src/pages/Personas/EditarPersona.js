import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {urlTraerPersona,urlZONAS,urlProvincias} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function EditarPersona(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [zona, setZonas] = useState([]); 
    const [distri, setDistri] = useState([" "]);
    const [cant, setCant] = useState([" "]);
    const [prov, setProv] = useState([" "]);
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
    const [cod, setCod]=useState({                
        Codigo:props.match.params.id,
              
    });
    const [Canton,setCanton]=    useState(0)
    const [Correo, setCorreo] = useState('');
    const [Estado, setEstado] =    useState("");
    const [rol, setRol] =    useState("");
    const [Distrito, setDistrito] = useState(0);
    const [Id_Zona , setID_Zona]=    useState(0);
    const [username , setUserName] = useState("");
    const [Nombre, setNombre] =  useState("");
    const [Pais, setPais] =        useState(0);
    const [Provincia , setProvincia] = useState(0);
    const [Senas , setSenas] = useState("");
    const [telefono , setTelefono] = useState(0);
    //trae seleccionado
    useEffect(()=> {
        setCod(props.match.params.id) 
        let url = urlTraerPersona; 
        axios.post(url , cod)
        .then((response) => ( 
            console.log(response.data),
            setNombre(response.data.NOMBRE),
            setTelefono(response.data.TELEFONO),
            setCorreo(response.data.CORREO),
            setProvincia(response.data.PROVINCIA),
            setCanton(response.data.CANTON),
            setDistrito(response.data.DISTRITO),
            setRol(response.data.ROL),
            setSenas(response.data.SENAS),
            setID_Zona(response.data.Id_Zona),
            setUserName(response.data.USERNAME),
            setPais(response.data.Pais),
            setEstado(response.data.ESTADO) ,
            callProvincia(response.data.PROVINCIA),
            callCanton(response.data.PROVINCIA) ,
            callDistrito(response.data.PROVINCIA,response.data.CANTON) 
            //,setZonas(response.data.Id_Zona)       
        ))  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleSubmit = event => {
        event.preventDefault();
            var data ={
                ID_USUARIO:cod,
                NOMBRE:(form.NOMBRE ? form.NOMBRE : Nombre),
                USERNAME:(form.USERNAME ? form.USERNAME : username),
                CORREO:(form.CORREO ? form.CORREO : Correo),
                TELEFONO:(form.TELEFONO ? form.TELEFONO : telefono),
                PROVINCIA:(form.PROVINCIA ? form.PROVINCIA : Provincia),
                CANTON:(form.CANTON ? form.CANTON : Canton),
                DISTRITO:(form.DISTRITO ? form.DISTRITO : Distrito),
                SENAS:(form.SENAS ? form.SENAS : Senas),
                ROL:(form.ROL ? form.ROL : rol),
                ESTADO:(form.ESTADO ? form.ESTADO : Estado),
                Id_Zona:(form.Id_Zona ? form.Id_Zona : Id_Zona),
                PAIS:506                
            }
            
        console.log(data)
        
        axios.put(`http://smartfecr.com:2011/api/Datos/ActualizaPersona`, data)
            .then(response => 
                setForm(response),
                swal("¡Buen trabajo!", "Se edito correctamente", "success"),
                history.push("/Personas/Personas" )   
        ); 
    }

    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
    //PROVINCIA
    const callProvincia = () => {
        console.log(Provincia)
        let url = urlProvincias
        axios.get(url  )
        .then((response) => {
            let dataToArray = [];
        for (        let index = 1;        index <= Object.keys(response.data).length;   index++)        {
        dataToArray.push(response.data[ index]);
        }
        console.log(dataToArray);
        setProv(dataToArray)                 
        })
        .catch(error => {
            console.log(error)
        })  
    }
    //Canton
    const callCanton = (a) => {  
        let url = `https://ubicaciones.paginasweb.cr/provincia/${form.PROVINCIA ? form.PROVINCIA : Provincia||a}/cantones.json`
        axios.get(url )
        .then((response) => {
            console.log(response)
            let dataToArray = [];
        for (let index = 1; index <= Object.keys(response.data).length; index++ )
        {
          dataToArray.push(response.data[ index]);
        }
        console.log(dataToArray);
        setCant(dataToArray)                 
        })
        .catch(error => {
            console.log(error)
        })  
    }
    //Distrito
    const callDistrito = (a,c) => {
        console.log(form.CANTON)
        let url = `https://ubicaciones.paginasweb.cr/provincia/${form.PROVINCIA ? form.PROVINCIA : Provincia||a}/canton/${form.Canton ? form.Canton : Canton||c}/distritos.json`
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
    const callZonas= () => {            
        let url = urlZONAS;
        axios.get(url )
        .then((response) => ( 
            //console.log(response.data)     
            setZonas(response.data)            
        ))
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
    

    return(
       <>
            <Menu/>            
            <form className='container' onSubmit={handleSubmit} >
            <h1 style={{color:"#10ab80"}}><b>Editar Persona</b></h1>
                <div className="form-group mt-3">
                <label>Nombre:</label>
                <Form.Control type="text" 
                placeholder="Nombre completo" 
                name="NOMBRE"
                onChange={handleChange}
                value={form.NOMBRE ? form.NOMBRE : Nombre}/>
            </div>
            <div className="form-group">
                <label>Usuario:</label>
                <Form.Control type="text" 
                placeholder="Usuario"
                name="USERNAME" 
                onChange={handleChange}
                value={form.USERNAME ? form.USERNAME : username}/>
            </div>
            <div className="form-group">
                <label>Correo:</label>
                <Form.Control type="email" 
                placeholder="name@example.com"
                name="CORREO" 
                onChange={handleChange}
                value={form.CORREO ? form.CORREO : Correo}/>
            </div> 
            <div className="form-group">
                <label>Teléfono:</label>
                <Form.Control type="number" 
                placeholder="0000-0000"
                name="TELEFONO" 
                onChange={handleChange}
                value= {form.TELEFONO ? form.TELEFONO : telefono}/>
            </div>           
            <div className="form-group">
                <label>Provincia: </label>
                <select type="select" name="PROVINCIA"  className="form-control"   
                        placeholder="Provincia" onChange={handleChange} onClick={()=>callProvincia(),()=>callCanton()}
                        >                        
                        <option>{prov[Provincia-1]}</option>
                            {prov.map((elemento,index) => {
                            return (
                                <option key={index+1 } value={index+1 ? index+1 :  Provincia  }>
                                    {elemento}
                                </option>
                            ) 
                        })}
                </select> 
            </div>  
            <div className="form-group">
                <label>Cantón: </label>
                <select type="select" name="Canton"  className="form-control"   
                    placeholder="Canton" onChange={handleChange} 
                     onClick={()=>callCanton(),()=>callDistrito(),()=>callDistrito()}>  
                    <option>{cant[Canton-1]}</option>                    
                        {cant.map((elemento,index) => {
                            return (
                                <option key={index+1 } value={index+1 ? index+1 :  Canton-1  }>
                                    {elemento}
                                </option>
                            ) 
                        })} 
                    </select> 
            </div> 
            <div className="form-group">
                <label>Distrito: </label>
                <select type="select" name="Distrito"  className="form-control"   
                    placeholder="Distrito" onChange={handleChange} onClick={()=>callDistrito()}>
                    <option>{distri[Distrito-1]}</option>  
                    {distri.map((elemento,index) => {
                        return (
                            <option key={index+1} value={ index+1 ? index+1 : Distrito-1 }>
                                {elemento}
                            </option>
                        ) 
                    })}                               
                </select> 
            </div> 
            <div className="form-group">
                <label>Rol: </label>
                <select type="select" name="ROL"  className="form-control"   
                    placeholder="ROL" onChange={handleChange} 
                    value={form.ROL ? form.ROL : rol}  >                        
                    <option>Rol del Siervo</option>
                    <option value="ADM">Administrador Sistema </option>
                    <option value="COM">Administrador Comunidad</option>
                    <option value="SIE">Siervo</option>
                    <option value="MIN">Ministro Alabanza</option>
                    <option value="SYM">Siervo y Ministro Alabanza</option>
                </select> 
            </div> 
            <div className="form-group">
                <label>Zona: </label>
                <select type="select" name="Id_Zona"  className="form-control"   
                    placeholder="ID_Zona" onChange={handleChange} onClick={() => callZonas()}
                    value ={form.Id_Zona ? form.Id_Zona : Id_Zona}>
                    <option>o</option>
                    {zona.map((elemento) => {                        
                        return (
                            <option key={elemento.Codigo } value={elemento.Codigo ? elemento.Codigo  : Id_Zona}>
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
                 name="SENAS" onChange={handleChange}
                 value={form.SENAS ? form.SEMAS : Senas}/>
            </div>  
            <div className="form-group">
                <label>Estado: </label>
                <select type="select" name="ESTADO"  className="form-control"   
                    placeholder="Estado" onChange={handleChange} 
                    value ={form.ESTADO ? form.ESTADO : Estado}  >                        
                    <option>Estado del Usuario:</option>
                    <option value="ACT">Activado </option>
                    <option value="SUS">Suspendida</option>
                    <option value="INC">Incapacitado</option>
                </select> 
            </div>  
                <button type="submit" style={{background:"#357a6b"}} className="btn btn-success mt-4" 
                >
                    Editar 
                </button>
            </form>
        </>
    )
}

export default EditarPersona