import React, { Component } from "react";
import { Button, Card, Image, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import logo_defaut from '../assets/default_dog.jpg'

export default class Communicators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getCommunicators(this.props.location.state.animal_id).then(
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
        <h3 className="pt-5 text-center">Communicadores</h3>
        <Row className="g-4">
          {
          this.state.content.map(t => (
            <Col>
              <Card style={{ width: '18rem' }}>
                <Image src={logo_defaut} roundedCircle></Image>
                <Card.Body>
                  <Card.Title>{t.attributes.name}</Card.Title>
                  <Card.Text>{t.attributes.phone}</Card.Text>
                  <Card.Text>{t.attributes.occurrence}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
          }
        </Row>
        <Button href="/pets">Voltar</Button>
      </Container>
    );
  }
}
