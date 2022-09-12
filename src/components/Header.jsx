import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
