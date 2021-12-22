import React,{useEffect} from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import CerrarButton from "../Button/CerrarSesion";
import '../../css.css'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom';

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
                <Navbar.Brand  >
                Matrimonios en Victoria {cookies.get('UserName')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
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