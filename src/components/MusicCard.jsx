import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorite: [],
  };

  componentDidMount() {
    this.takeFavorite();
  }

  takeFavorite = async () => {
    const response = await getFavoriteSongs();
    this.setState({ favorite: response });
  };

  handleChange = async ({ target }) => {
    const { music } = this.props;
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(music);
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId } = this.props;
    const {
      favorite,
      loading } = this.state;
    const preview = (
      <div>
        {trackName}
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor="check">
          Favorita
          <input
            name="favorites"
            id="check"
            type="checkbox"
            onChange={ this.handleChange }
            checked={ favorite.some((elem) => elem.trackName === trackName) }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
    return (
      (loading) ? <Loading /> : preview
    );
  }
}

MusicCard.defaultProps = {
  favorite: {},
};

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  music: PropTypes.shape({}),
  favorite: PropTypes.shape({}),
}.isRequired;
