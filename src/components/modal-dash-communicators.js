import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
export class ModalDashCommunicators extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeOccurrence = this.onChangeOccurrence.bind(this);

    this.state = {
      name: "",
      phone: "",
      occurrence: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeOccurrence(e) {
    this.setState({
      occurrence: e.target.value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    UserService.postCommunicators(this.state.name, this.state.phone, this.state.occurrence, this.props.id_animal).then(
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

  render(){

    return(
      <Container>
        <Modal {...this.props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Comunique nós </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Seu Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      required
                      placeholder="Seu Nome">
                    </Form.Control>
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onChangePhone}
                      required
                      placeholder="telefone">
                    </Form.Control>

                    <Form.Label>Observação</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="occurrence"
                      value={this.state.occurrence}
                      onChange={this.onChangeOccurrence}
                      required/>
                    <Form.Text className="text-muted">
                      Nós conte em detalhes aonde você viu o pet perdido!
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Button variant="danger" type="submit">
                      Comunicar
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}