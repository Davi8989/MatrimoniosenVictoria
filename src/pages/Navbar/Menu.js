import React,{useEffect} from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import CerrarButton from "../Button/CerrarSesion";
import '../../css.css';
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';


function Menu(){
    const history = useHistory();
    const cookies = new Cookies();

    //Manejo Cookies
    useEffect(()=>{
        if(!cookies.get('CodigoPersona')){
            history.push('/');
        }
    });

    return(
        <div className="container">
            <div>
                <Navbar bg="light"  expand="lg" > 
                <Navbar.Brand href="/Dashboard/Dashboard" style={{color:"#357a6b"}} >
                Matrimonios en Victoria</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/Asambleas/AllAsambleas" style={{color:"#357a6b"}}>Asambleas</Nav.Link>
                        <Nav.Link href="/Asambleas/AllAsignar" style={{color:"#357a6b"}}>Asignaciones</Nav.Link>
                        <Nav.Link href="/Comunidades/AllComunidades" style={{color:"#357a6b"}}>Comunidades</Nav.Link>
                        <Nav.Link href="/Personas/Personas" style={{color:"#357a6b"}}>Personas</Nav.Link> 
                        <Nav.Link href="/Zonas/Allzonas" style={{color:"#357a6b"}}>Zonas</Nav.Link>
                    </Nav>
                    <Nav >
                        <CerrarButton/>  
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
                     
        </div>
        
        

    )
}


export default Menu;
//style={{"background-color":" #357A6B;"}}