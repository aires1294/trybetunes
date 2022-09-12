import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      // enterButtonDisabled: true,
      loading: false,
      login: false,
      isDisabled: true,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      name: value,
    });
    const USER_MIN_CHAR = 2;
    const { name } = this.state;
    // console.log(name);
    if (name.length >= USER_MIN_CHAR) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleButton = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      login: true,
    });
  };

  render() {
    const { name, loading, login, isDisabled } = this.state;
    const loginPage = (
      <div data-testid="page-login">
        <label htmlFor="name-input">
          Insira seu nome:
          <input
            id="name-input"
            data-testid="login-name-input"
            type="text"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handleButton }
          disabled={ isDisabled }
          // disabled={ enterButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
    if (login) {
      return <Redirect to="/search" />;
    }
    return loading ? <Loading /> : loginPage;
  }
}

export default Login;
