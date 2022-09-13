import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumList: [],
      objetoMusic: {},
    };
  }

  componentDidMount() {
    this.objetoMusic();
  }

  // favoriteMusic = async (elemento) => {
  //   const { favorite } = this.state;
  //   const newMusic = favorite.find((e) => e.trackName === elemento.trackName);
  //   this.setState({
  //     loading: true,
  //   }, async () => {
  //     if (elemento.checked) {
  //       await addSong(newMusic);
  //     } else {
  //       await removeSong(newMusic);
  //     }
  //     const results = await getFavoriteSongs();
  //     console.log(results);
  //     this.setState({
  //       // results,
  //       loading: false,
  //     });
  //   });
  // };

  objetoMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const pesquisaMusic = await getMusics(id);
    this.setState({ objetoMusic: pesquisaMusic[0], albumList: pesquisaMusic.slice(1) });
  };

  render() {
    const { objetoMusic, albumList } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">
            Artista
            {objetoMusic.artistName}
          </p>
          <h2 data-testid="album-name">
            {`${objetoMusic.collectionName} ${objetoMusic.artistName}`}
          </h2>
          {albumList.map((musica) => (
            <MusicCard
              trackName={ musica.trackName }
              key={ musica.trackName }
              previewUrl={ musica.previewUrl }
              music={ musica }
              trackId={ musica.trackId }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
export default Album;
