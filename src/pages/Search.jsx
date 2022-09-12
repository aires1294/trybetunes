import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      musicList: [],
      loading: false,
      saveName: '',
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

  handleButtonQuery = async () => {
    const { name } = this.state;
    const artista = name;
    this.setState(
      {
        loading: true,
        name: '',
      },
      async () => {
        const pesquisa = await searchAlbumsAPIs(name);
        this.setState({
          loading: false,
          musicList: pesquisa,
          saveName: artista,
        });
      });
  };

  render() {
    const { name, isDisabled, musicList, loading, saveName } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            data-testid="search-artist-input"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            onClick={ this.handleButtonQuery }
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </div>

        <div>
          {musicList.length > 0 ? (
            <div>
              <p>{`Resultado de álbuns de: ${saveName}`}</p>
              {musicList.map((element) => (
                <div key={ element.artistId }>
                  <img src={ element.artworkUrl100 } alt={ element.artistName } />
                  <p>{`Album ${element.trackCount} ${element.collectionName}`}</p>
                  <p>{`Artista ${element.artistName}`}</p>
                  <Link
                    data-testid={ `link-to-album-${element.collectionId}` }
                    to={ `/album/${element.collectionId}` }
                  >
                    Album
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
