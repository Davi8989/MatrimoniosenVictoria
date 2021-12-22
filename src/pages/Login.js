import React, {Component} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup,  Row } from 'reactstrap';
import '../css/Login.css';

class Login extends Component {
  constructor() {
      super();
      this.state = {
          Usuario: '',
          Contrasena: '',
          
  
      }
      this.Contrasena = this.Contrasena.bind(this);
      this.Usuario = this.Usuario.bind(this);
      this.login = this.login.bind(this);
  }

  Usuario(event) {
      this.setState({ Usuario: event.target.value })
      console.log( event.target.value)
  }
  Contrasena(event) {
      this.setState({ Contrasena: event.target.value })
  }
  login(event) {   
    fetch('http://smartfecr.com:2011/api/Login/Autentica/', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Usuario: this.state.Usuario,
            Contrasena: md5(this.state.Contrasena)
        })
    }).then((Response) => Response.json())
        .then((result) => {
          console.log(result);
            if (result.Status === 'Invalid')
                alert('Invalid User');
            else
                this.props.history.push(console.log('devuelta a la pagina principal'));
        })
  }

  render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div class="row" className="mb-2 pageheading">
                                              <div className="col-sm-12 btn btn-primary">
                                                  Login111
                                              </div>
                                            </div>
                                            <InputGroup className="mb-3">
                                                <Input type="text" onChange={this.Usuario} placeholder="Enter Usuario" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <Input type="password" onChange={md5(this.Contrasena)} placeholder="Enter Password" />
                                            </InputGroup>
                                            <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }  
}

export default Login;