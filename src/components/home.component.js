import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container, ButtonToolbar } from "react-bootstrap";
import logo_defaut from '../assets/default_dog.jpg'
import UserService from "../services/user.service";
import {ModalDashCommunicators} from './modal-dash-communicators';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      pagination: [],
      addModalShow: false
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data.data,
          pagination: response.data.links
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false})
    return (
      <Container fluid>
        <h3 className="pt-5 text-center">Nós ajude a encontrar o pet desaparecido</h3>
        <Row className="g-4">
        {
          this.state.content.map(t => (
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={logo_defaut} />
                <Card.Body>
                  <Card.Title>{t.attributes.name}</Card.Title>
                  <Card.Text>{t.attributes.extra_information.substring(0, 50)}...</Card.Text>
                  
                  <ButtonToolbar>
                  <Button variant="danger"
                    onClick={()=> this.setState({addModalShow: true})}
                  >Notifique aqui</Button>
                  <ModalDashCommunicators show={this.state.addModalShow} onHide={this.state.addModalClose} id_animal={t.attributes.id}/>
                  </ButtonToolbar>

              </Card.Body>
            </Card>
          </Col>
          ))
        }
        </Row>
        </Container>
    );
  }
}

