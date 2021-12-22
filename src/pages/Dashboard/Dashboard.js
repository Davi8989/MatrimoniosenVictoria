import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import imgdashboard from '../../imagendashboard.jpg';
import logo from '../../logotransmin.png';
import Menu from "../Navbar/Menu";

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  text: {
    textAlign: 'justify',
    margin: '15px ​30px 15px 30px'
  }
});

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className="container">
    <Menu/>
    <Card className={classes.root}>
      <CardContent>        
      <img alt="Logo" src={logo} />  
        <Typography className={classes.title} color="textSecondary" gutterBottom>          
            Matrimonios en Victoria
        </Typography>
        <img className={classes.img}  alt="Dashboard" src={imgdashboard} />
        <Box component="div" className={classes.text}>
          Nuestro objetivo prioritario,<strong> "La reforma de vida del matrimonio, que como fuente y origen de la familia”</strong>, tiene que ser el fenómeno eficáz que cultive y comparta la gracia de Cristo a toda la familia. Esto a través de la santificación del matrimonio y la familia y de ayudar a los conyugues a descubrir la gracia y la misión propias que, como esposos cristianos, reciben en la iglesia.
        </Box>
        <Box component="div" className={classes.text}>
        <strong>Matrimonios en Victoria</strong> está integrada por todos sus miembros activos en las comunidades nacionales e internacionales y trabaja con la aprobación y apoyo jerárquico de la Iglesia. En cada país en donde esta MEV cuenta con un sacerdote asesor espiritual quien formaツ parte del consejo y representa a MEV ante la jerarquía de la iglesia.
          En Costa Rica nuestro asesor espiritual es el <strong>Padre Denis Felíz de la Cruz.</strong>
        </Box>
        <Box component="div" className={classes.text}>
        <strong>Matrimonios en Victoria en Costa Rica</strong> tuvo lugar en el año 2001 cuando una pareja de esposos costarricenses Juan Ignacio y Tatiana residentes en El Salvador retornaron a Costa Rica y movidos por el Espíritu Santo sintieron la necesidad de traer a nuestro país el movimiento, es así como esta pareja contacta al padre Emilio para proponerle el proyecto. El padre Emilio viajó a Guatemala donde vivió el retiro #1 y tuvo información detallada del movimiento y convencido de que era una excelente opción para las familias.
          Lo instalo formalmente en Costa Rica y a la fecha contamos con 13 comunidades en todo el país.
          </Box>
      </CardContent>
    </Card>
    </div>
  );
}