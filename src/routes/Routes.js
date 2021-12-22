import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import Menu from '../pages/Menu';
import Login from '../pages/Login2';
import Usuarios from       "../pages/Usuarios";
import AllAsambleas from "../pages/Asambleas/AllAsambleas";
import Form from         "../pages/Asambleas/Form";
import FormEditar from "../pages/Asambleas/FormEditar";
import FormEliminar from "../pages/Asambleas/FormEliminar";
import AsignarSiervoMinistro from "../pages/Asambleas/AsignarSiervoMinistro";
import RecordarContrase from "../pages/Button/RecordarContrase";
import Menu from "../pages/Navbar/Menu";
import AllComunidades from "../pages/Comunidades/AllComunidades";
import AllComunidades2 from "../pages/Comunidades/AllComunidades2";
import Crear from "../pages/Modal/Crear";
import ModificarComunidad from "../pages/Comunidades/ModificarComunidad";
import AllAsignar from "../pages/Asambleas/AllAsignar";
import DeleteComunidades from '../pages/Comunidades/DeleteComunidades';
import EliminarAsignar from "../pages/Asambleas/EliminarAsignar";
import AsignarEliminar from '../pages/Modal/AsignarEliminar';
import AsignarModificar from "../pages/Asambleas/AsignarModificar";
import CrearComunidad from "../pages/Comunidades/CrearComunidad";
import AllPersonas from "../pages/Personas/AllPersonas";
import Personas from "../pages/Personas/Personas";
import CrearPersonas from "../pages/Personas/CrearPersonas";
import DeletePersona from "../pages/Personas/DeletePersona";
import EditarPersona from "../pages/Personas/EditarPersona";
import AllZonas from "../pages/Zonas/AllZonas";
import EliminarZonas from "../pages/Zonas/EliminarZonas";
import CrearZonas from "../pages/Zonas/CrearZonas";
import EditarZona from "../pages/Zonas/EditarZona";
import Dashboard from "../pages/Dashboard";
import Siervo_Alabanza from "../pages/Siervo_Alabanza/Siervo_Alabanza";
import AllDisponible from "../pages/Disponibilidad/AllDisponible";
import CrearDispo from "../pages/Disponibilidad/CrearDispo";
import Delete from "../pages/Disponibilidad/Delete";
import Modificar from "../pages/Disponibilidad/Modificar";
import Footer from "../pages/Footer/Footer";


function App() {
  return (
    <Router>
      <Switch>     
        <Route exact path="/"     component={Login}/>      
        <Route exact path="/Navbar/Menu"     component={Menu}/>
        <Route exact path="/Dashboard/Dashboard"     component={Dashboard}/>
        <Route exact path="/Footer/Footer"     component={Footer}/>
        <Route exact path="/Modal/Crear"     component={Crear}/>
        <Route exact path="/Comunidades/ModificarComunidad/:id"     component={ModificarComunidad}/>
        <Route exact path="/Asambleas/AllAsignar"     component={AllAsignar}/>
        <Route exact path="/Asambleas/AsignarSiervoMinistro"     component={AsignarSiervoMinistro}/>
        <Route exact path="/Asambleas/EliminarAsignar/:id"     component={EliminarAsignar}/>
        <Route exact path="/Asambleas/AsignarModificar/:id"     component={AsignarModificar}/>        
        <Route exact path="/Modal/AsignarEliminar/:id"     component={AsignarEliminar}/>    
        <Route exact path="/Comunidades/CrearComunidad/"     component={CrearComunidad}/>       
        <Route exact path="/Comunidades/DeleteComunidades/:id"     component={DeleteComunidades}/>       
        <Route exact path="/Comunidades/AllComunidades"     component={AllComunidades}/>     
        <Route exact path="/Comunidades/AllComunidades2"     component={AllComunidades2}/> 
        <Route exact path="/Asambleas/AllAsambleas" component={AllAsambleas}/>        
        <Route exact path="/Asambleas/Form"            component={Form}/>
        <Route exact path="/Asambleas/FormEditar/:id"  component={FormEditar}/>
        <Route exact path="/Asambleas/FormEliminar/:id"  component={FormEliminar}/>
        <Route exact path="/Usuarios"                 component={Usuarios}/>
        <Route exact path="/Button/RecordarContrase"    component={RecordarContrase}/>
        <Route exact path="/Personas/AllPersonas"    component={AllPersonas}/>
        <Route exact path="/Personas/CrearPersonas"    component={CrearPersonas}/>
        <Route exact path="/Personas/Personas"    component={Personas}/>
        <Route exact path="/Personas/EditarPersona/:id"    component={EditarPersona}/>
        <Route exact path="/Personas/CrearPersonas/:id"    component={CrearPersonas}/>
        <Route exact path="/Personas/DeletePersona/:id"    component={DeletePersona}/>
        <Route exact path="/Disponibilidad/AllDisponible/:id"    component={AllDisponible}/>        
        <Route exact path="/Zonas/AllZonas/"    component={AllZonas}/>
        <Route exact path="/Zonas/EliminarZonas/:id"    component={EliminarZonas}/>
        <Route exact path="/Zonas/CrearZonas/"    component={CrearZonas}/>
        <Route exact path="/Zonas/EditarZona/:id"    component={EditarZona}/>
        <Route exact path="/Siervo_Alabanza/Siervo_Alabanza"    component={Siervo_Alabanza}/>
        <Route exact path="/Disponibilidad/Delete/:id"       component={Delete}/>
        <Route exact path="/Disponibilidad/Modificar/:id"    component={Modificar}/>
        <Route exact path="/Disponibilidad/CrearDispo/:id"   component={CrearDispo}/>
      </Switch>
    </Router>
  );
}

export default App;



// eslint-disable-next-line no-lone-blocks
{/**<Route  path="/ADM/RegistrarUsuario"     component={RegistrarUsuario}/>*/}