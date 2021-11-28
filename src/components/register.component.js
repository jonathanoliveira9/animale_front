import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import InputMask from 'react-input-mask';
import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vphone = (value) => {
  if (value.length < 7) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone must be more 7 characters.
      </div>
    )
  }
}

const vcity = (value) => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be more 3 characters.
      </div>
    )
  }
}

const vdistrict = (value) => {
  if (value.length < 2) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be more 2 characters.
      </div>
    )
  }
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);

    this.state = {
      name: "",
      email: "",
      phone: "",
      city: "",
      district: "",
      password: "",
      password_confirmation: "",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onChangeDistrict(e) {
    this.setState({
      district: e.target.value,
    });
  }
  
  onChangePasswordConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value,
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();
    console.log(this)
    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.name, this.state.email, this.state.phone, this.state.city, this.state.district, this.state.password, this.state.password_confirmation)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Nome</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.name}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Telefone</label>
                  <InputMask
                    type="text"
                    className="form-control"
                    mask="(99) 99999-9999"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, vphone]}
                    placeholder="(99) 99999-9999"/>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Cidade</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChangeCity}
                    validations={[required, vcity]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Estado</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="district"
                    value={this.state.district}
                    onChange={this.onChangeDistrict}
                    validations={[required, vdistrict]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Confirma a Senha</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    value={this.state.password_confirmation}
                    onChange={this.onChangePasswordConfirmation}
                    validations={[required, vpassword]}
                  />
                </div>
                
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
