import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: true,
    user: '',
  };

  async componentDidMount() {
    const userComponent = await getUser();
    console.log(userComponent);
    this.setState({
      loading: false,
      user: userComponent.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <p data-testid="header-user-name">{user}</p>}
      </header>
    );
  }
}

export default Header;
