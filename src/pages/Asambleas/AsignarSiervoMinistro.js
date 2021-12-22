import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlBuscaMinistro,urlBuscaSiervo,urlAsignarSM,urlComunidades,urlListaAsambleas} from '../../servicio/apirest'
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from '../Navbar/Menu';


function AsignarSiervoMinistro() {
    const history = useHistory();
    const cookies = new Cookies();
    const [siervo, setSiervo] = useState([]);
    const [ministro, setMinistro] = useState([]);
    const [comunidad, setComunidad] = useState([]);
    const [lista, setLista] = useState([]);
    const [allform, setAllForm]=useState({
        ID_ASAMBLEA:0,
        FECHA:'',
        SIERVO:0,    
        MINISTRO:0,
        ESTADO:"ACT",
    });
    //Busca Siervos y Ministros
    const [form, setForm]=useState({                
        Id_Asamblea: 0,
        Dist:"",    
    });     
    //Capturar IdComunidad 
    const [comu,setComu]=useState({
        Codigo: 0,
    }); 
    //Guardar lo que se escribe en el formulario
    const handleChange=e=>{
      const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                            
        });
        setAllForm({
            ...allform,
            [name]: value                  
        });  
        console.log(allform)        
    } 
    //Campo Comunidad
    const handleChange1=e=>{
        const {name, value} = e.target;
        setComu({
            ...comu,
            [name]: value            
        });
    }   
    //Asignaciones
    const handleSubmit = event => {
        event.preventDefault(); 
        let url = urlAsignarSM;
        axios.post(url, allform)
        .then((response) => {    
            console.log(response.data)        
            if(response.data.Codigo > 0){   
                console.log(response.data); 
                swal("¡Buen trabajo!", response.data.Mensaje, "success");
                history.push("/Asambleas/AllAsignar")
            }else if(response.data.Codigo <= -1){
                swal("¡Error al crear asamblea!", response.data.Mensaje, "error");
                history.push("/Asambleas/AllAsignar")
            }  
                                    
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Asambleas/AllAsignar")
        }) 

    }
    //Id Asambleas   
    useEffect(() => { 
        console.log(cookies.get('CodigoPersona'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 
    //funcion llama a SIERVO
    const callSiervo=()=>{
        console.log(allform)
        let url = urlBuscaSiervo;
        axios.post(url, form )
        .then((response) => (    
            //console.log(response)
            setSiervo(response.data)             
        ))
        .catch(error => {
            console.log(error)
        })    
    }
    //funcion llama a Ministros
    const callMinistro=()=>{
        console.log(allform)
        let url = urlBuscaMinistro;
        axios.post(url, form)
        .then((response) => (                  
            setMinistro(response.data)             
        ))
        .catch(error => {
            console.log(error)
        })    
    } 
    //Lista de Asambleas para asignar
    const callListaAsambleas=()=>{
        let url = urlListaAsambleas;
        axios.post(url,comu)
        .then((response) => (   
            
            setLista(response.data)             
        ))
        .catch(error => {
            console.log(error)
        })    
    } 
    //Funcion: Asignar Ministro y Siervo
    const Asignar=()=>{
        let url = urlAsignarSM;
        axios.post(url, allform)
        .then((response) => {    
            console.log(response.data)        
            if(response.Codigo > 0){   
                console.log(response.data); 
                swal("¡Buen trabajo!", response.data.Mensaje, "success");
                history.push("/Asambleas/AllAsignar")
            }else if(response.Codigo <= -1){
                swal("¡Error al crear asamblea!", response.data.Mensaje, "error");
                history.push("/Asambleas/AllAsignar")
            }  
                                    
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Asambleas/AllAsignar")
        }) 
    } 
    //Llama al api de Comunidades
    useEffect(() => {
        let url = urlComunidades;
        axios.get(url)
        .then((response) => ( 
            //console.log(response)                   
            setComunidad(response.data) 
        ))
        .catch((error) => {
            console.log(error)
        })
    },[]); 
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
        <div className="container">
            <form onSubmit={handleSubmit}>
            <h1 style={{color:"#10ab80"}}><b>Crear Asignación</b></h1>
                <div className="form-group mt-3">
                    <label>Comunidad: </label>
                    <select type="select" name="Codigo"  className="form-control"   
                    placeholder="Selecciones el comunidad" onChange={handleChange1} >
                        <option>Seleccionar comunidad...</option>
                        {comunidad.map(elemento => {
                            return (
                                <option key={elemento.Codigo} value={elemento.Codigo}>
                                    {elemento.Descripcion}
                                </option>
                            ) 
                        })}
                    </select> 
                </div>
                <div className="form-group mt-3">
                    <label>Asamblea: </label>
                    <select type="select" name="ID_ASAMBLEA"  className="form-control"
                    placeholder="Selecciones el movimiento" onClick={()=>callListaAsambleas()} onChange={handleChange}>
                        <option>Seleccionar Asamblea...</option>
                        {lista.map(item => {
                            return (
                                <option key={item.Codigo} value={item.Codigo}>
                                    {item.Descripcion}
                                </option>
                            ) 
                        })}
                    </select>    
                </div>  
                <div className="form-group mt-3">                        
                        <label>Fecha: </label>
                        <input type="date" name="FECHA"
                        format='yyyy-MM-dd' onChange={handleChange}  className="form-control"/>
                    
                    </div>     
                <div className="form-group mt-3">
                    <label>Búsqueda</label>
                    <select type="select" name="Dist"  className="form-control"   
                        placeholder="Estado de la asamblea" onChange={handleChange}>
                        {/**mandar ACT quemado */}
                        <option>Como quiere buscar el ministro:</option>
                        <option value="DIS ">Distrito </option>
                        <option value="CAN ">Canton</option>
                        <option value="PRO "> Provincia</option>
                        <option value="PAI "> Pais</option>
                        <option value="TOD "> Todos</option> 
                        <option value="ZON ">  Zona</option> 
                    </select>  
                </div>                    
                <div className="form-group mt-3">
                    <label>Siervo:</label>
                    <select type="select" name="SIERVO"  className="form-control"
                    placeholder="Selecciones el siervo" onChange={handleChange} onClick={()=>callSiervo()} >
                        <option>Selecciona siervo...</option>
                        {siervo.map(elemento => {
                            return (
                                <option key={elemento.Codigo} value={elemento.Codigo}>
                                    {elemento.Descripcion}
                                </option>
                            ) 
                        })}
                    </select>    
                </div>
                <div className="form-group mt-3">
                <label>Alabanza: (Es opcional*)</label>
                    <select type="select" name="MINISTRO"  className="form-control" 
                    placeholder="Seleccione ministro" onChange={handleChange} onClick={()=>callMinistro()}>
                        <option>Alabanza...</option>
                            {ministro.map(elemento => {
                                return (
                                    <option key={elemento.Codigo} value={elemento.Codigo}>
                                        {elemento.Descripcion}
                                    </option>
                                ) 
                        })}  
                    </select>
                </div>
                <button type="submit" style={{background:"#357a6b"}}
                className="btn btn-success mt-4"> 
                    Asignar
                </button>
            </form>
        </div>
        </>
        
    
    )
}

export default AsignarSiervoMinistro;