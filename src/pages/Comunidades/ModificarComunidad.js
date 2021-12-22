import React,{useEffect,useState} from "react";
import {urlUnaComunidad,urlProvincias,urlZONAS} from "../../servicio/apirest";
import { useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios' ;
import { Form } from 'react-bootstrap';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function ModificarComunidad(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [zona,setZonas] = useState([""]);
    const [data, setData] = useState([" "]);
    const [prov, setProv] = useState([" "]);
    const [distri, setDistri] = useState([" "]);
    const [form, setForm]=useState({    
        Id_Comunidad:0, 
        Nombre:"",
        Telefono:0,
        Correo:"",
        Pais:506,           
        Provincia: 0 ,
        Canton: 0,  
        Distrito:0,     
        Senas: "",
        Estado:"ACT",
        ID_Zona:0
    });
    //almacena id 
    const [una, setUna]=useState({  
        codigo : props.match.params.id,
    });
    //trae seleccionado
    useEffect( ()=> {
        let url = urlUnaComunidad; 
        axios.post(url , una)
        .then((response) => ( 
            console.log(response.data),
            setNombre(response.data.Nombre),
            setTelefono(response.data.Telefono),
            setCorreo(response.data.Correo),
            setProvincia(response.data.Provincia),
            setCanton(response.data.Canton),
            setDistrito(response.data.Distrito),
            setSenas(response.data.Senas),
            setID_Zona(response.data.ID_Zona),
            setId_Comunidad(response.data.Id_Comunidad),
            setPais(response.data.Pais),
            setEstado(response.data.Estado),

            console.log(response.data.Nombre,response.data.Telefono,response.data.Correo,
                response.data.Provincia,response.data.Canton,response.data.Distrito,response.data.ID_Zona,response.data.Estado
            )   ,
            
            callProvincia(response.data.Provincia),
            callCanton(response.data.Provincia) ,
            callDistrito(response.data.Provincia,response.data.Canton)
            //callZonas(response.data.ID_Zona)
        ))  
    },[])
    const handleChange=e=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });
        console.log(value)                    
    }; 
    const callProvincia = () => {
        console.log(Provincia)
        let url = urlProvincias
        axios.get(url  )
        .then((response) => {
            let dataToArray = [];
        for (        let index = 1;        index <= Object.keys(response.data).length;      index++)        {
        dataToArray.push(response.data[ index]);
        }
        console.log(dataToArray);
        setProv(dataToArray)                 
        })
        .catch(error => {
            console.log(error)
        })  
    }
    const callCanton = (a) => {   
        let traeProvincia = Provincia;
        console.log(Provincia)
        console.log("Provincia "+a)
        console.log("callCanton : traeProvincia "+traeProvincia)
        console.log("callCanton : from.Provincia "+form.Provincia)
        let url = `https://ubicaciones.paginasweb.cr/provincia/${form.Provincia ? form.Provincia : Provincia||a}/cantones.json`
        axios.get(url )
        .then((response) => {
            console.log(response)
            let dataToArray = [];
        for (let index = 1; index <= Object.keys(response.data).length; index++ )
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
    const callDistrito = (a,c) => {
        console.log(Provincia) 
        console.log("Canton " + c )
        console.log("Provincia " + a)
        let url = `https://ubicaciones.paginasweb.cr/provincia/${form.Provincia ? form.Provincia : Provincia||a}/canton/${form.Canton ? form.Canton : Canton||c}/distritos.json`
        axios.get(url )
        .then((response) => {
            let dataToArray = [];
        for (let index = 1; index <= Object.keys(response.data).length; index++ )
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
    

    //evento submit
    const handleSubmit = event => {
        event.preventDefault();
            var data ={
                Id_Comunidad:(form.Id_Comunidad ? form.Id_Comunidad : Id_Comunidad) ,
                Nombre:(form.Nombre ? form.Nombre : Nombre),
                Telefono:(form.Telefono  ? form.Telefono    : Telefono),                        
                Correo:  (form.Correo   ?  form.Correo     : Correo),    
                Pais:  (form.Pais       ?  form.Pais   : Pais) ,
                Provincia:(form.Provincia   ? form.Provincia : Provincia) ,
                Canton:(form.Canton   ? form.Canton : Canton) , 
                Distrito:(form.Distrito   ? form.Distrito : Distrito) ,
                Senas:(form.Senas   ? form.Senas : Senas) , 
                Estado: (form.Estado   ? form.Estado : Estado) ,
                ID_Zona:(form.ID_Zona   ? form.ID_Zona : ID_Zona) 
            }
            
        console.log(una.data)
        
        axios.put(`http://smartfecr.com:2011/api/COMUNIDADES/${una.codigo}`, data)
            .then(response => 
                setForm(response),
                swal("¡Buen trabajo!", "Se edito correctamente", "success"),
                history.push("/Comunidades/AllComunidades" )   
        );        
    }

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

    const [Canton,setCanton]=    useState(0)
    const [Correo, setCorreo] = useState('');
    const [Estado, setEstado] =    useState("");
    const [Distrito, setDistrito] = useState(0);
    const [ID_Zona , setID_Zona]=    useState(0);
    const [Id_Comunidad , setId_Comunidad] = useState("");
    const [Nombre, setNombre] =  useState("");
    const [Pais, setPais] =        useState(0);
    const [Provincia , setProvincia] = useState(0);
    const [Senas , setSenas] = useState("");
    const [Telefono , setTelefono] = useState(0);
     
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
        <form className="container" onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Editar Comunidad</b></h1>
            <div className="form-group">
                <label>Nombre Comunidad:</label>
                <Form.Control type="text" 
                placeholder="Nombre Comunidad" 
                name="Nombre"
                onChange={handleChange}
                value={form.Nombre ? form.Nombre : Nombre}/>
            </div>
            <div className="form-group">
                <label>Teléfono:</label>
                <Form.Control type="text" 
                placeholder="0000-0000"
                name="Telefono" 
                onChange={handleChange}
                value={form.Telefono ? form.Telefono : Telefono}/>
            </div>
            <div className="form-group">
                <label>Correo:</label>
                <Form.Control type="text" 
                placeholder="name@example.com"
                name="Correo" 
                onChange={handleChange}
                value={form.Correo ? form.Correo : Correo}/>
            </div>            
            <div className="form-group">
                <label>Provincia: </label>
                <select type="select" name="Provincia"  className="form-control"   
                    placeholder="Provincia" 
                    onChange={handleChange} onClick={()=>callProvincia()} >   
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
                    placeholder="Canton" onChange={handleChange}  onClick={()=>callCanton()}>  
                    <option>{data[Canton-1]}</option>                    
                        {data.map((elemento,index) => {
                            
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
                <label>Señas</label>
                <Form.Control
                 placeholder="ejemplo: Frente al parque de Coronado"
                 name="Senas"
                 onChange={handleChange}
                 value={form.Senas ? form.Senas : Senas}/>
            </div>
            <div className="form-group">
                <label>Zona: </label>
                <select type="select" name="ID_Zona"  className="form-control"   
                    placeholder="ID_Zona" onChange={handleChange} onClick={() => callZonas()}
                    value ={form.ID_Zona ? form.ID_Zona : ID_Zona}>
                    <option>{ID_Zona}</option>
                    {zona.map((elemento) => {
                        return (
                            <option key={elemento.Codigo } value={elemento.Codigo ? elemento.Codigo  : ID_Zona}>
                                {elemento.Mensaje}
                            </option>
                        ) 
                    })}                               
                </select> 
            </div>  
            {/*<div className="form-group">
                <label>ESTADO: </label>
                <select type="select" name="Estado"  className="form-control"   
                    placeholder="Estado" onChange={handleChange}   >                        
                    <option>{Estado}</option>
                    <option value="ACT">Activado </option>
                    <option value="SUS">Suspendida</option>
                    
                </select> 
                </div>  */}
            <button type="submit" style={{background:"#357a6b"}} className="btn btn-success"  >
                Editar
            </button>         
        </form>
        </>
    )
}

export default ModificarComunidad;