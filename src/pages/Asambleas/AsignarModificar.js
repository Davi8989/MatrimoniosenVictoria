import React,{useEffect,useState} from "react";
import {urlUnaAsignacion,urlListaAsambleas,
  urlBuscaSiervo, urlBuscaMinistro,urlComunidades} from "../../servicio/apirest";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios' ;
import Menu from "../Navbar/Menu";
import swal from 'sweetalert'; 


function AsignarModificar(props) {
  const history = useHistory();
  const cookies = new Cookies();
  const [comunidad, setComunidad] = useState([]);  
  const [lista, setLista] = useState([]);
  const [siervo, setSiervo] = useState([]);
  const [ministro, setMinistro] = useState([]);
  //almacena id 
  const [form,setForm]= useState({
    ID_ASIGNACION :props.match.params.id,
    ID_ASAMBLEA : 0,
    NombreMovimiento : " ",
    NombreComunidad : "",
    FECHA : '',
    SIERVO : 0,
    NombreSiervo :  "",
    MINISTRO : 0,
    NombreMinistro : " ",
    ESTADO : '',
    Dist : ''
  })
  const [una, setUna]=useState({  
    codigo : props.match.params.id,
  });
  
    //campos
    //Campo Comunidad
    const handleChange=e=>{
      const {name, value} = e.target;
      setForm({
          ...form,
          [name]: value            
      });
      setBusqueda({
        ...busqueda,
        [name]:value
      })
      console.log(form)
  }   

    //const callAllAsignaciones=()=>{
  useEffect(() => {   
      console.log(props.match.params.id) 
      console.log(una)
        let url = urlUnaAsignacion;
        axios.post(url , una)
        .then((response) => ( 
            console.log(response.data) ,    
            setComuni(response.data.NombreComunidad)  ,
            setID_ASAMBLEA(response.data.ID_ASAMBLEA) ,
            setNombreAsamble(response.data.NombreMovimiento)  ,
            setFecha(response.data.FECHA)      ,
            setCodsiervo(response.data.SIERVO),
            setNameSiervo(response.data.NombreSiervo),
            setCodMinistro(response.data.MINISTRO),
            setNameMinistro(response.data.NombreMinistro),
            console.log(response.data.ID_ASAMBLEA)   
        ))
        .catch(error => {
            console.log(error)
        })  
  },[]) ;

    const [comuni,setComuni]=    useState(0);
    const [idAsamblea,setID_ASAMBLEA]=    useState(0);
    const [nombreAsamble,setNombreAsamble]=    useState('');
    const [fecha,setFecha]=    useState("");
    const [codsiervo,setCodsiervo]=    useState(0);
    const [namesiervo,setNameSiervo]=    useState('');
    const [codministro,setCodMinistro]=    useState(0);
    const [nameministro,setNameMinistro]=    useState('');
    //const [estado,setEstado]= useState('');
       
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
   //Lista de Asambleas para asignar
   const callListaAsambleas=()=>{
      let url = urlListaAsambleas;
      axios.post(url,idAsamblea)
      .then((response) => (   
          setLista(response.data)             
      ))
      .catch(error => {
          console.log(error)
      })    
    } 
    //Capturar IdComunidad 
    const [comu,setComu]=useState({
      Codigo: idAsamblea,
    });
    //Campo Comunidad
    const handleChange1=e=>{
      const {name, value} = e.target;
      setComu({
          ...comu,
          [name]: value            
      });
      console.log(comu)
    }  
    //busqueda disponibilidad 
    const [busqueda, setBusqueda]=useState({                
      ID_ASAMBLEA: 0,
      Dist:"",    
    }); 
    var busquedaSM = {ID_ASAMBLEA: (form.ID_ASAMBLEA ? form.ID_ASAMBLEA : idAsamblea),
                     Dist:(form.Dist)};  
  //funcion llama a SIERVO
  const callSiervo=()=>{
    console.log(busquedaSM)
    let url = urlBuscaSiervo;
    axios.post(url, busquedaSM )
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
      console.log(busqueda)
      let url = urlBuscaMinistro;
      axios.post(url, busqueda)
      .then((response) => (                  
          setMinistro(response.data)             
      ))
      .catch(error => {
          console.log(error)
      })    
  } 
  //LO ocupa el api de POST
  const [updatedAt, setUpdatedAt] = useState(null);
  //evento submit
  const handleSubmit = event => {
    event.preventDefault();
        var data ={
          ID_ASIGNACION:props.match.params.id ,
          ID_ASAMBLEA:(form.ID_ASAMBLEA ? form.ID_ASAMBLEA : idAsamblea),
          FECHA:(form.FECHA  ? form.FECHA    : fecha.slice(0,-9)),                        
          SIERVO:  (form.SIERVO   ?  form.SIERVO     : codsiervo),    
          MINISTRO:  (form.MINISTRO       ?  form.MINISTRO   : codministro) ,
          ESTADO:"ACT" 
        }
        
    console.log(data)
    
    axios.put('http://smartfecr.com:2011/api/Datos/ActualizaAsignacion', data)
        .then(response => 
            setUpdatedAt(response),
            swal("¡Buen trabajo!", "Se editó correctamente ", "success"),
            history.push("/Asambleas/AllAsignar")
        );
  }
  //Manejo Cookies
  useEffect(()=>{
    //console.log(!cookies.get('CodigoPersona'))
    if(!cookies.get('CodigoPersona')){
      history.push('/');
    }
  });

      return (
        <>
        <Menu/>
        <div className="container" onSubmit={handleSubmit}>
        <h1 style={{color:"#10ab80"}}><b>Editar Asignación</b></h1>
            <form>
                <div className="form-group mt-3">
                    <label>Comunidad: </label>
                    <select type="select" name="Codigo"  className="form-control " disabled={true}  
                    placeholder="Selecciones el comunidad" onChange={handleChange1} >
                        <option>{comuni}</option>
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
                  <select type="select" name="ID_ASAMBLEA"  className="form-control disabled"
                    onClick={()=>callListaAsambleas()} onChange={handleChange} disabled={true}>
                      <option>{nombreAsamble}</option>
                      {lista.map(item => {
                          return (
                              <option key={item.Codigo} value={item.Codigo }>
                                  {item.Descripcion}
                              </option>
                          ) 
                      })}
                  </select>                         
                </div>  
                <div className="form-group mt-3">
                        <label>Fecha:</label>
                        <input type="date" name="FECHA"  onChange={handleChange}                        
                        className="form-control"                        
                        format='yyyy-MM-dd'
                        value={ form.FECHA ? form.FECHA : fecha.slice(0,-9)} />
                </div>     
                <div className="form-group mt-3">
                  <label>Búsqueda</label>
                    <select type="select" name="Dist"  className="form-control"   
                        placeholder="Estado de la asamblea" onChange={handleChange}>
                        {/**mandar ACT quemado */}
                        <option>Escoga nuevamente el metodo de busqueda:</option>
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
                        <option>{namesiervo}</option>
                        {siervo.map(elemento => {
                            return (
                                <option key={elemento.Codigo} value={elemento.Codigo ?elemento.Codigo : codsiervo}>
                                    {elemento.Descripcion}
                                </option>
                            ) 
                        })}
                    </select>
                </div>
                <div className="form-group mt-3">
                  <label>Alabanza:</label>
                  <select type="select" name="MINISTRO"  className="form-control" 
                    placeholder="Seleccione ministro" onChange={handleChange} onClick={()=>callMinistro()}>
                        <option>{nameministro}</option>
                            {ministro.map(elemento => {
                                return (
                                    <option key={elemento.Codigo} 
                                      value={elemento.Codigo ? elemento.Codigo : codministro}>
                                      {elemento.Descripcion}
                                    </option>
                                ) 
                        })}  
                    </select>
                    
                </div>
                <button type="submit" style={{background:"#357a6b"}}
                className="btn btn-success mt-4"
                 >  
                    Asignar
                </button>
            </form>
        </div> 
        </> 
      
      )
      
  }

export default AsignarModificar;