import React, { Component } from "react";
import { Card, Badge, Button, Row, Col, Container } from "react-bootstrap";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import logo_defaut from '../assets/default_dog.jpg'
import { Link } from "react-router-dom";

export default class Pets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      animal_id: ''
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
        <Link to={"/create_animal"}>
            <Button>
            Cadastrar Pet
            </Button>
              
            </Link>
        <Row className="g-4">
          
          {
          this.state.content.map(t => (
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={logo_defaut} />
                <Card.Body>
                  <Card.Title>{t.attributes.name}</Card.Title>
                  <Card.Text>{t.attributes.extra_information.substring(0, 50)}...</Card.Text>
                  {t.attributes.status === 'lost' && 
                    <h5><Badge pill bg="danger">Perdido</Badge></h5>
                  }
                  {t.attributes.status === 'communicated' && 
                    <h5><Badge pill bg="warning">Comunicado</Badge></h5>
                  }
                  {t.attributes.status === 'found' && 
                    <h5><Badge pill bg="primary">Encontrado</Badge></h5>
                  }
                  <Link to={{ pathname: "/communicators", state: { animal_id: t.attributes.id }}}>
                  Mostrar comunicadores
                  </Link>
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
