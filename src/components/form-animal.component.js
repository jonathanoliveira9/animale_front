import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

class FormAnimal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeExtraInformation = this.onChangeExtraInformation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      age: "",
      extra_information: "",
      loading: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeExtraInformation(e) {
    this.setState({
      extra_information: e.target.value,
    });
  }


  handleSubmit(event){
    event.preventDefault();
    UserService.postAnimal(this.state.name, this.state.age, this.state.extra_information).then(
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
      <Form onSubmit={this.handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formName">
        <Form.Label column sm="2">
          Nome
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Password"
          value={this.state.name}
          onChange={this.onChangeName}
          required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formAge">
        <Form.Label column sm="2">
          Idade
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Idade"
           value={this.state.age}
           onChange={this.onChangeAge} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formExtraInformation">
        <Form.Label column sm="2">
          Informações extras
        </Form.Label>
        <Col sm="10">
          <Form.Control as="textarea"
           value={this.state.extra_information}
           onChange={this.onChangeExtraInformation} />
        </Col>
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form.Group>
    </Form>
    );
  }
}

export default FormAnimal;