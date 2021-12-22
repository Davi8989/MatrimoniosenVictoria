import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom';
import { urlLogin } from "../servicio/apirest";
import  RecordarContrase from "../pages/Button/RecordarContrase";
import logo from '../../src/logotransmin.png';
import Footer from "../pages/Footer/Footer";


const useStyles = makeStyles((theme) => ({
  main:{
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bg:{
    backgroundColor: '#357A6B',
    "&:hover": {
      backgroundColor: '#3f9683',
    }
  },
  color:{
    color: '#357A6B',
  },
}));

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const cookies = new Cookies();

  if(cookies.get('CodigoPersona') && cookies.get('CodigoPersona') > 0 ){
    props.history.push("/Navbar/Menu")
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(urlLogin, { Usuario: data.get('email'), Contrasena: data.get('password') })
    .then(response => {
      console.log(response)
        if(response.data.Codigo >= 1){
          if(response.data.Rol === 'ADM' || response.data.Rol === 'COM' ){
            swal(`Bienvenido ${response.data.username}!` , "Sistema de Matrimonios en Victoria!", "success");
            cookies.set('CodigoPersona',response.data.Codigo, {path:'/'})
            cookies.set('username',response.data.username, {path:'/'})
            history.push("/Dashboard/Dashboard")            
          }else{
            swal(`Bienvenid@ ${response.data.username}!` , "Matrimonios en Victoria!", "success");
            cookies.set('CodigoPersona',response.data.Codigo, {path:'/'})      
            history.push("/Siervo_Alabanza/Siervo_Alabanza")              
          } 
        }else{
            swal("Error",response.data.Mensaje, "error");            
        }        
    })
    .catch(error =>{
      console.log(error)
    })
  };

  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
            <img alt="Logo" src={logo} />       
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuario"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Guardar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ `${classes.submit}  ${classes.bg}`}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/Button/RecordarContrase" variant="body2"  className={classes.color}>
                Recordar Contraseña
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Footer/>
    </div>
    
  );
}

export default Login;