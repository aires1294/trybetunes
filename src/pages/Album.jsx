import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      letra: [],
      albumList: {},
      // loading: false,
    };
  }

  componentDidMount() {
    this.album();
  }

  album = async () => {
    const { match: { params: { id } } } = this.props;
    const pesquisaMusic = await getMusics(id);
    this.setState({ albumList: pesquisaMusic[0], letra: pesquisaMusic.slice(1) });
  };

  render() {
    const { albumList, letra } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album"> </div>
        <div data-testid="artist-name">{albumList.artistName}</div>
        <div data-testid="album-name">{albumList.collectionName}</div>
        {
          letra.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
export default Album;
