/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect,useState} from 'react'
import { Button} from 'react-bootstrap';
import {useHistory,Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios' 
import {urlAllPersonas} from "../../servicio/apirest";
import Menu from "../Navbar/Menu";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form } from 'react-bootstrap';


function AllPersonas(props) {

const history = useHistory();
const cookies = new Cookies();
const [all , setAll] = useState([])
const [pers , setPers] = useState({
  criterio : "",
})


//Llama a todas las personas
useEffect(() => {            
    let url = urlAllPersonas;
    axios.post(url, pers )
    .then((response) => ( 
        //console.log(response.data) ,    
        setPers(response.data)            
    ))
    .catch(error => {
        console.log(error)
    })  
},[pers]);
//Llama solo a una persona
const Buscar=()=>{
    console.log(pers)
    let url = urlAllPersonas;
    axios.post(url, pers )
    .then((response) => ( 
        //console.log(response.data) 
        setPers(response.data)            
    ))
    .catch(error => {
        console.log(error)
    }) 
}
//Captura Name o UserName
const handleChange=e=>{
    const {name, value} = e.target;
    setPers({
        ...pers,
        [name]: value                  
    });
     Buscar();

};

//Manejo Cookies
useEffect(()=>{
    //console.log(!cookies.get('CodigoPersona'))
    if(!cookies.get('CodigoPersona')){
        history.push('/');
    }
});

const columns = [
    { dataField: 'ID_USUARIO', text: 'id', sort: true },
    { dataField: 'NOMBRE', text: 'Nombre', sort: true },
    { dataField: 'USERNAME', text: 'Usuario', sort: true },
    { dataField: 'TELEFONO', text: 'Telefono', sort: true },
    { dataField: 'CORREO', text: 'Correo', sort: true },
    { dataField: 'Provincia', text: 'Provincia', sort: true }    
    ,
  {
      dataField: "actions",
      text: "Editar",
      editable: false,
      isDummyField: true,
      formatter: (cellContent, row) => {
        if (row.state)
          return (
            <div>
              <Link  className="material-icons"
               to={"/Asambleas/FormEditar/"} >&#xE254;</Link>
            </div>
          );
        else
          return (
            <div>
                <Link  className="material-icons" to={"/Personas/CrearPersonas/"+row} >&#xE254;</Link>
                <Link  className="material-icons" 
                to={"/Personas/DeletePersona/"} style={{color:"red"}}> &#xE872;</Link>
            </div>
          );
      }
    }
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });


    return ( 
    <>
    <Menu/>
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-2 bg-body rounded"> 
                <div className="row ">
                    <div className="col-sm-3 mt-1 mb-4 text-gred">
                        <div className="search">                      
                            <Button variant="primary" 
                            onClick={()=>history.push('/Personas/CrearPersonas')}>
                            Agregar Persona
                            </Button>
                        </div>    
                    </div>  
                    <div className="col-sm-3 offset-sm-2 mt-1 mb-4 text-gred" style={{color:"green"}}>
                      <h2><b>Personas</b></h2>
                    </div>
                    <div className="col-sm-3 mt-1 mb-4 text-gred" style={{color:"green"}}>
                      <div className="search">
                        <Form.Control type="text" name="criterio" placeholder="Nombre o Apellido"
                          onChange={handleChange} onFocus={Buscar()}/>       
                          <Button variant="outline-success" onClick={()=>Buscar()} >
                              Buscar
                          </Button>
                      </div>                      
                    </div>
                </div> 
                <BootstrapTable bootstrap4 keyField='ID_USUARIO' data={pers} columns={columns} 
                defaultSorted={defaultSorted} pagination={pagination}  />
                
            </div>
        </div> 
     
    </>  
    );
}   


export default AllPersonas