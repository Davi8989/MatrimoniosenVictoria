import React ,{useState,useEffect} from "react"; 
import {urlEliminarDisponibilidad,urlUnaDisponibilidad} from "../../servicio/apirest";
import swal from 'sweetalert'; 
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Form } from 'react-bootstrap';
import axios from 'axios' ;
import Menu from "../Navbar/Menu";
import { Button } from 'react-bootstrap';
    
function Delete(props) {
    
    const history = useHistory();
    const [Dia,setDia] = useState([""]);
    const [horaD,setHoraD] = useState([""]);
    const [horaH,setHoraH] = useState([""]);
    const [idingreso, setIdIngreso] = useState([""]);
    const [idusuario, setIdUsuario] = useState([""]);
    const [Valor_dia, setValor_dia] = useState([]);

    const cookies = new Cookies();
    const [form, setForm]=useState({  
        ID_Ingreso:'',   
        ID_USUARIO:'',
        DIA:"",
        HoraDesde:"",
        HoraHasta:"",
    });
    const [cod,setCod] = useState({
        codigo:props.match.params.id,
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
        var data ={
            Codigo: props.match.params.id
           }
        let url = urlEliminarDisponibilidad;
        console.log(data)
        axios.post(url, data )
        .then((response) => {  
            console.log(response)
            if(response.data.Codigo >= 0){
                swal("¡Buen trabajo!", response.data.Mensaje, "success");
                history.push("/Disponibilidad/AllDisponible/"+idusuario)
            }else {
                swal("¡Error!", response.data.Mensaje, "error");
                history.push("/Disponibilidad/AllDisponible/"+idusuario)
            }                 
        })
        .catch(error => {
            swal("Error!", error, "error");
            history.push("/Disponibilidad/AllDisponible/"+idingreso);
        })   
    }
    useEffect(() => {
        setCod(props.match.params.id)
        let url = urlUnaDisponibilidad;
        axios.post(url,cod )
        .then((response) => ( 
            console.log(response.data),
            setDia(response.data.DIA) ,
            setHoraD(response.data.HoraDesde),
            setHoraH(response.data.HoraHasta),
            setIdIngreso(response.data.ID_Ingreso),
            setIdUsuario(response.data.ID_USUARIO),

            callDia(response.data.DIA),

            console.log()   
        ))
        .catch(error => {
            console.log(error)
        })  
    },[]);

    const callDia= (D) => {
        console.log(D)
        var diaSemana = D;
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
    
    
    return(
        <>
        <Menu/>
        <form className='container'  onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Eliminar Disponibilidad</b></h1>
        
        <div className="form-group mt-3">
            <label>Día</label>
                <select type="select" className="form-control" name="DIA"   
                    onChange={handleChange} >
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
            <div className="form-group d-none">
                <label>id Usuario:</label>
                <Form.Control type="text" 
                name="ID_USUARIO"
                onChange={handleChange}
                value={idusuario} />
            </div>
            <div className="form-group">
                <label>Hora desde:</label>
                <Form.Control type="time"
                name="HoraDesde" 
                onChange={handleChange}
                value={form.HoraDesde ? form.HoraDesde : horaD}/>
            </div>
            <div className="form-group">
                <label>Hora hasta:</label>
                <Form.Control type="time" 
                name="HoraHasta" 
                onChange={handleChange}
                value={form.HoraHasta ? form.HoraHasta : horaH}/>
            </div>            
                                            
            <br />
            <Button type="submit" style={{background:"#357a6b"}} >Eliminar</Button>
        
        </form>
        </>
    )
        
    }


export default Delete