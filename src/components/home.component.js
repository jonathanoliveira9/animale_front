import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Card, CardGroup, Row, Col, Container } from "react-bootstrap";
import logo_defaut from '../assets/default_dog.jpg'
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      pagination: []
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
                  <Button variant="danger">Notifique aqui</Button>
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
