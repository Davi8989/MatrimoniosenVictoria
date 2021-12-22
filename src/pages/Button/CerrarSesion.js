import React,{useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom';

function CerrarButton() {
    
    const history = useHistory();
    const cookies = new Cookies();

    const cerrar=()=>{
        cookies.remove('CodigoPersona',{path:'/'});
        cookies.remove('UserName',{path:'/'});
        console.log(cookies.get('CodigoPersona'));
        history.push("/");
    } 
    //Manejo Cookies
    useEffect(()=>{
    console.log(!cookies.get('CodigoPersona'))
    if(!cookies.get('CodigoPersona')){
      history.push("/");
    }
    });

    return(
        
        <div className="card-body d-flex justify-content-between align-items-center">        
            <Button style={{background:"#357a6b"}} onClick={()=>cerrar()}>
                Cerrar Sesión
            </Button>
        </div>
    
        



    )
    
}

export default CerrarButton

//variant="danger "