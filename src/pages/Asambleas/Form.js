import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlMovimientos,urlComunidades,urlBuildAsamblea} from '../../servicio/apirest'
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function Form() {
    const history = useHistory();
    const cookies = new Cookies();
    const [movimientos, setMovimientos] = useState([]);
    const [comunidad, setComunidad] = useState([]);
    //const [show, setShow] = useState(false);
    const [allform, setAllForm]=useState({ 
        ID_Movimiento:0,    
        Id_Comunidad: 0,
        Dia:'',        
        HoraInicio:'',
        HoraFin:'',
        Estado:"ACT",
        UsuarioCrea:cookies.get('CodigoPersona'),
    });
    const [form, setForm]=useState({                
        Id_Comunidad: 0,
        Dia:'',
        Inicio:'',
        Fin: '',        
        HoraInicio:'',
        HoraFinal:'',
        Dist:''        
    });
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
        console.log(value)             
    }    
    //Crear Asambleas
    const buildAsamblea=()=>{
        let url = urlBuildAsamblea;
        console.log(allform)

        axios.post(url, allform)
        .then(response => {  
            if(response.status === 200){
                console.log(response)
                setAllForm(response.data)
                swal("¡Buen trabajo!", "Registró de asamblea correcto!", "success");
                history.push("/Asambleas/AllAsambleas")
                
            }else{
                swal("¡Error al crear asamblea!", "Intente de nuevo!", "error");
                history.push("/Asambleas/AllAsambleas")
            }                            
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Asambleas/AllAsambleas")
        })          
    }
    //Llama la api de Movimientos
    useEffect(() => { 
        console.log(cookies.get('CodigoPersona'));
        console.log(cookies.get('UserName'));
        let url = urlMovimientos;                
        axios.get(url)
        .then((response) => (                    
            setMovimientos(response.data) 
        ))
        .catch((error) => {
            console.log(error)
        })
    },[]); 
    //Llama al api de Comunidades
    useEffect(() => {
        let url = urlComunidades;
        axios.get(url)
        .then((response) => (                    
            setComunidad(response.data) 
        ))
        .catch((error) => {
            console.log(error)
        })
    },[]);

    const handleSubmit = event => {
        event.preventDefault();    

        let url = urlBuildAsamblea;
        console.log(allform)

        axios.post(url, allform)
        .then(response => {  
            if(response.status === 200){
                console.log(response)
                setAllForm(response.data)
                swal("¡Buen trabajo!", "Registró de asamblea correcto!", "success");
                history.push("/Asambleas/AllAsambleas")
                
            }else{
                swal("¡Error al crear asamblea!", "Intente de nuevo!", "error");
                history.push("/Asambleas/AllAsambleas")
            }                            
        })
        .catch(error => {
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
        <form className='container' onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Crear Asamblea</b></h1>
                <div className="form-group mt-3">
                    <label>Movimiento: </label>
                    <select type="select" name="ID_Movimiento"  className="form-control"
                    placeholder="Selecciones el movimiento" onChange={handleChange}>
                        <option>Seleccionar movimiento ...</option>
                        {movimientos.map(elemento => {
                            return (
                                <option key={elemento.Codigo} value={elemento.Codigo}>
                                    {elemento.Descripcion}
                                </option>
                            ) 
                        })}
                    </select>    
                </div>
                <div className="form-group mt-3">
                    <label>Comunidad: </label>
                    <select type="select" name="Id_Comunidad"  className="form-control"   
                    placeholder="Selecciones el comunidad" onChange={handleChange} >
                        <option>Seleccionar comunidad ...</option>
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
                    <label>Día</label>
                    <select type="select" className="form-control" name="Dia"   
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
                <div className="form-group mt-3">
                    <label>Hora de inicio</label>
                    <input type="time" className="form-control" name="HoraInicio"
                    placeholder="Hora de inicio" onChange={handleChange}/>
                </div>
                <div className="form-group mt-3">
                    <label>Hora de final</label>
                    <input type="time" className="form-control" name="HoraFin" 
                    placeholder="Hora de final" onChange={handleChange}/>
                </div>                                    
                <div className="form-group mt-3 d-none">
                    <label>Quien crea la Asamblea</label>
                    <input type="text" className="form-control enable" name="UsuarioCrea"
                     value={cookies.get('username')} />                   
                </div>
                               
                <button type="submit" style={{background:"#357a6b"}}
                 className="btn btn-success mt-4"
                 >
                     Crear Asamblea
                </button>
            </form>
            </>
    )
}

export default Form;