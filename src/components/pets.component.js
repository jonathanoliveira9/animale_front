import React, { Component } from "react";
import { Card, Badge, Row, Col, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import logo_defaut from '../assets/default_dog.jpg'

export default class Pets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };

  }

  componentDidMount() {
    UserService.getOwerPets().then(
      response => {
        this.setState({
          content: response.data.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <Container fluid>
        <h3 className="pt-5 text-center">Pets Cadastrados</h3>
        <Row className="g-4">
          {
          this.state.content.map(t => (
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={logo_defaut} />
                <Card.Body>
                  <Card.Title>{t.attributes.name}</Card.Title>
                  <Card.Text>{t.attributes.extra_information.substring(0, 50)}...</Card.Text>
                  {t.attributes.status == 'lost' && 
                    <h4><Badge pill bg="danger">Perdido</Badge></h4>
                  }
                  {t.attributes.status == 'communicated' && 
                    <h4><Badge pill bg="warning">Comunicado</Badge></h4>
                  }
                  {t.attributes.status == 'found' && 
                    <h4><Badge pill bg="primary">Encontrado</Badge></h4>
                  }
                  
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
