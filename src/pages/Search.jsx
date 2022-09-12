import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      name: value,
    });
    const USER_MIN_CHAR = 1;
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

  render() {
    const { name, isDisabled } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">Search</div>
        <input 
          data-testid="search-artist-input"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          // onClick={  }
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
