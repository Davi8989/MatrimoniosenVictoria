import React,{useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {urlAsambleaEditar,urlTablaAsamblea,urlMovimientos,urlComunidades,urlUnaAsamblea} from "../../servicio/apirest";
import axios from 'axios';
import swal from 'sweetalert'; 
import Menu from "../Navbar/Menu";


function FormEditar(props) {
    const history = useHistory();
    const cookies = new Cookies();
    const [idministro, setIdMinistro] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [comunidad, setComunidad] = useState([]);
    const [Valor_dia, setValor_dia] = useState([]);

    const [una, setUna]=useState({  
        codigo : props.match.params.id
    });
       
    //Agarra los campo modificados y los que no para hacer el PUT
    const handleChange=e=>{
      const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value                  
        });       
        console.log(value)
    }
    
    useEffect(() => { 
        console.log(cookies.get('CodigoPersona'))
        let url = urlTablaAsamblea;                
        axios.post(url )
        .then((response) => ( 
            //console.log(response.data)                   
            setIdMinistro(response.data) 
        ))
        .catch((error) => {
            console.log(error)
        })
    },[]); 
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
       // console.log(form)
        let url = urlComunidades;
        axios.get(url)
        .then((response) => (  
            //console.log(response.data)                  
            setComunidad(response.data) 
        ))
        .catch((error) => {
            console.log(error)
        })
    },[]);

    
    useEffect(()=>{
        console.log(props.match.params.id);
        console.log(una)
        let url = urlUnaAsamblea; 
        axios.post(url ,una)
        .then((response) => (
            console.log(response),
            setID_ASAMBLEA(response.data.ID_ASAMBLEA),
            setID_MOvimiento(response.data.ID_Movimiento),
            setID_Comunidad(response.data.Id_Comunidad),
            setCOmunidad(response.data.Comunidad),
            setMOvimiento(response.data.Movimiento),
            setDia(response.data.Dia),
            setHoraInicio(response.data.HoraInicio),
            setHoraFin(response.data.HoraFin),
            setUsuarioCrea(response.data.UsuarioCrea),
            setEstado(response.data.Estado),

            console.log(response.data.ID_ASAMBLEA, response.data.ID_Movimiento,
                response.data.Id_Comunidad, response.data.Dia,response.data.HoraInicio,
                response.data.HoraFin,response.data.UsuarioCrea,response.data.Estado) ,

                callDia(response.data.Dia),
                console.log(response.data.Dia)
        ))           
    },[props.match.params.id])


    const handleSubmit = event => {
        event.preventDefault();
            var data ={
            ID_ASAMBLEA: ID_ASAMBLEA,
            ID_Movimiento:(form.ID_Movimiento ? form.ID_Movimiento : ID_MOvimiento),
            Id_Comunidad:(form.Id_Comunidad ? form.Id_Comunidad : Id_Comunidad) ,            
            Dia:          (form.Dia         ? form.Dia          : Dia),    
            HoraInicio:  (form.HoraInicio  ?  form.HoraInicio   : HoraInicio) ,
            HoraFin:     (form.HoraFin     ? form.HoraFin       : HoraFin) ,
            Estado:      (form.Estado     ? form.Estado       : estado),  
            UsuarioCrea:usuariocrea  
            }
            
        let url = urlAsambleaEditar;
        
        axios.put(url, data)        
        .then((response) => {  
            console.log(data)
            if(response.data.Codigo ===  0){
                console.log(response)
                setForm(response.data)
                swal("¡Buen trabajo!", response.data.Mensaje, "success");
                history.push("/Asambleas/AllAsambleas")
            }else{
                console.log(data)
                swal("¡Error al editar asamblea!", "Intente de nuevo!", "error");
                history.push("/Asambleas/AllAsambleas")
            }                        
        })
        .catch((error) => {
            swal("Error!", error, "error");
            history.push("/Asambleas/AllAsambleas")
        })

    }

    const [ID_ASAMBLEA,setID_ASAMBLEA]=    useState(0)
    const [ID_MOvimiento, setID_MOvimiento] = useState(0);
    const [Movimiento, setMOvimiento] =    useState('');
    const [Id_Comunidad, setID_Comunidad] = useState(0);
    const [Comunidad , setCOmunidad]=    useState('');
    const [Dia       , setDia]      =    useState("");
    const [HoraInicio, setHoraInicio] =  useState("");
    const [HoraFin, setHoraFin] =        useState("");
    const [usuariocrea , setUsuarioCrea] = useState("");
    const [estado,setEstado]= useState('');
    

    const [form, setForm]=useState({                
        ID_ASAMBLEA: ID_ASAMBLEA,
        ID_Movimiento:ID_MOvimiento,
        Id_Comunidad:Id_Comunidad,
        Dia: Dia,    
        HoraInicio:HoraInicio,
        HoraFin:HoraFin,
        Estado:estado,
        UsuarioCrea:usuariocrea       
    });
    
        
    const callDia= (Dia) => {
    var diaSemana = Dia;
    if (diaSemana === 'D') {
        setValor_dia( "Domingo")
        } else if (diaSemana === 'L') {
            setValor_dia("Lunes")
        } else if (diaSemana === 'K') {
            setValor_dia("Martes")
        } else if (diaSemana === 'M') {
            setValor_dia("Miércoles")
        } else if (diaSemana === 'J') {
            setValor_dia("Jueves")
        } else if (diaSemana === 'V') {
            setValor_dia("Viernes")
        } else if (diaSemana === 'S'){
            setValor_dia("Sábado")
        }
    }
    //Manejo Cookies
    useEffect(()=>{
        console.log(!cookies.get('CodigoPersona'))
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });
    
    return (
        <>
        <Menu/>
        <form className="container" onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Editar Asamblea</b></h1>
            <div className="form-group mt-3">
                <label>Movimiento: </label>
                <select type="select" name="ID_Movimiento"  className="form-control"
                    placeholder="Selecciones el movimiento" onChange={handleChange}>
                        <option>{Movimiento === null ? 'Seleccionar movimiento ...' : Movimiento} </option>
                        
                        {movimientos.map(elemento => {
                            return (
                                <option key={elemento.Codigo} 
                                value={elemento.Codigo  ?  elemento.Codigo : ID_MOvimiento } >
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
                        <option>{Comunidad === null ? 'Seleccionar comunidad ...' : Comunidad}</option>
                        
                        {comunidad.map(elemento => {
                            return (
                            <option key={elemento.Codigo}
                            value={elemento.Codigo ? elemento.Codigo : Id_Comunidad } >
                                {elemento.Descripcion}
                            </option>
                            ) 
                        })}
                    </select> 
            </div>                
            <div className="form-group mt-3">
                <label>Día</label>
                    <select type="select" className="form-control" name="Dia"   
                        placeholder="Selecciones el semana" onChange={handleChange} >
                        <option >{Valor_dia}</option>
                        <option value={"L" ? "L" : Dia }>Lunes </option>
                        <option value={"K" ? "K" : Dia }>Martes</option>
                        <option value={"M" ? "M" : Dia }> Miércoles</option>
                        <option value={"J" ? "J" : Dia }> Jueves</option>
                        <option value={"V" ? "V" : Dia }> Viernes</option>
                        <option value={"S" ? "S" : Dia }> Sábado</option>
                        <option value={"D" ? "D" : Dia }> Domingo</option>     
                    </select> 
            </div>               
            <div className="form-group mt-3">
                <label>Hora de inicio</label>
                <input type="time" className="form-control" name="HoraInicio"
                placeholder="Hora Inicio" value={ form.HoraInicio ?   form.HoraInicio : HoraInicio  } onChange={handleChange}/>
            </div>
            <div className="form-group mt-3">
                <label>Hora Final</label>
                <input type="time" className="form-control" name="HoraFin"
                placeholder="Hora fin"    value={form.HoraFin   ?  form.HoraFin : HoraFin  } onChange={handleChange}/>
            </div>  
            <div className="form-group">
                <label>Estado: </label>
                <select type="select" name="Estado"  className="form-control"   
                    placeholder="Estado" onChange={handleChange}   >                        
                    <option>{estado}</option>
                    <option value="ACT">Activado </option>
                    <option value="SUS">Suspendida</option>
                    
                </select> 
            </div>                       
            <div className="form-group mt-3 d-none">
                <label>Quien crea la Asamblea</label>
                <input type="text" className="form-control " name="UsuarioCrea"
                    placeholder={cookies.get('UserName')} value={cookies.get('UserName')} />                   
            </div>
                            
            <button type="submit" style={{background:"#357a6b"}} className="btn btn-success mt-4"
            > 
                Editar Asamblea
            </button>
        </form>
        </>
    )
}

export default FormEditar;